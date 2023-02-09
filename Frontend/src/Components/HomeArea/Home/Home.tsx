import { ChangeEvent, useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import adminService from "../../../Services/AdminService";
import vacationService from "../../../Services/VacationService";
import notify from "../../../Utils/Notify";
import Pagination from "../Pagination/Pagination";
import VacationCard from "../VacationCard/VacationCard";

function Home(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 8;
    const indexOfLastVacation = currentPage * postPerPage;
    const indexOfFirstVacation = indexOfLastVacation - postPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

    function paginate(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return () => {
            unsubscribe();
        };
    }, [user, vacations]);

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacationsDB => setVacations(vacationsDB))
            .catch(err => notify.error(err.message));
    }, []);

    async function checkFollow(vacationId: number, isFollowing: number) {
        try {
            if (isFollowing === 0) {
                await vacationService.follow(vacationId);

                const duplicateVacations = [...vacations];
                const index = duplicateVacations.findIndex(v => v.isFollowing === isFollowing && v.vacationId === vacationId);
                if (index !== -1) duplicateVacations[index].isFollowing = 1;
                setVacations(duplicateVacations);
            }
            else {
                await vacationService.unfollow(vacationId);

                const duplicateVacations = [...vacations];
                const index = duplicateVacations.findIndex(v => v.isFollowing === isFollowing && v.vacationId === vacationId);
                if (index !== -1) duplicateVacations[index].isFollowing = 0;
                setVacations(duplicateVacations);
            }
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    async function deleteVacation(vacationId: number) {
        try {
            await adminService.deleteVacation(vacationId);

            const duplicateVacations = [...vacations];
            const index = duplicateVacations.findIndex(v => v.vacationId == vacationId);
            duplicateVacations.splice(index, 1);
            setVacations(duplicateVacations);
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    async function filterVacations(args: ChangeEvent<HTMLSelectElement>) {

        const selectValue = args.target.value;

        let newVacations: VacationModel[];

        await vacationService.getAllVacations()
            .then(v => {
                newVacations = v;
            })
            .catch(err => notify.error(err.message));

        let filteredVacations;

        const date = new Date();

        switch (selectValue) {
            case "":
                filteredVacations = newVacations;
                break;

            case "filterByFollowing":
                filteredVacations = newVacations.filter(v => v.isFollowing === 1);
                break;

            case "filterNotStartedYet":
                filteredVacations = newVacations.filter(v => new Date(v.startDate).getTime() > date.getTime());
                break;

            case "filterCurrentlyActive":
                filteredVacations = newVacations.filter(v => new Date(v.startDate).getTime() < date.getTime() && new Date(v.endDate).getTime() > date.getTime());
                break;

            case "filterFollowingAndNotStarted":
                filteredVacations = newVacations.filter(v => v.isFollowing === 1 && new Date(v.startDate).getTime() > date.getTime());
                break;

            case "filterFollowingAndActive":
                filteredVacations = newVacations.filter(v => v.isFollowing === 1 && new Date(v.startDate).getTime() < date.getTime() && new Date(v.endDate).getTime() > date.getTime());
                break;
        }

        setVacations(filteredVacations);

    }

    return (
        <div className="Home">

            <div>

                <span>Filter by</span>

                <select defaultValue="" onChange={filterVacations}>
                    <option disabled>---------------------------------</option>
                    <option value="">None</option>
                    <option disabled>---------------------------------</option>
                    <option value="filterByFollowing">Following</option>
                    <option value="filterNotStartedYet">Not started yet</option>
                    <option value="filterCurrentlyActive">Currently active</option>
                    <option disabled>---------------------------------</option>
                    <option value="filterFollowingAndNotStarted">Following & Not Started yet</option>
                    <option value="filterFollowingAndActive">Following & Currently active</option>
                    <option disabled>---------------------------------</option>
                </select>

            </div>

            {currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} checkFollow={checkFollow} deleteVacation={deleteVacation} />)}

            <Pagination vacationsPerPage={postPerPage} totalVacations={vacations.length} paginatePages={paginate}></Pagination>

        </div>
    );
}

export default Home;