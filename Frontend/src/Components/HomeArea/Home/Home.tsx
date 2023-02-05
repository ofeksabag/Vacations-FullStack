import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import adminService from "../../../Services/AdminService";
import vacationService from "../../../Services/VacationService";
import notify from "../../../Utils/Notify";
import VacationCard from "../VacationCard/VacationCard";
import "./Home.css";

function Home(): JSX.Element {

    const [ vacations, setVacations ] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {

        setUser(authStore.getState().user);

        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

    }, []);

    if(!user) {
        navigate("/login");
    }

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacationsDB => setVacations(vacationsDB))
            .catch(err => notify.error(err.message));

            vacationsStore.subscribe(() => {
                setVacations(vacationsStore.getState().vacations);
            });
    }, []);

    async function checkFollow(vacationId: number, isFollowing: number) {
        try {
            if(isFollowing === 0) {
                await vacationService.follow(vacationId);

                const duplicateVacations = [...vacations];
                const index = duplicateVacations.findIndex(v => v.isFollowing === isFollowing && v.vacationId === vacationId);
                if(index !== -1) duplicateVacations[index].isFollowing = 1;
                setVacations(duplicateVacations);

                notify.success("Like!");
            }
            else {
                await vacationService.unfollow(vacationId);
                
                const duplicateVacations = [...vacations];
                const index = duplicateVacations.findIndex(v => v.isFollowing === isFollowing && v.vacationId === vacationId);
                if(index !== -1) duplicateVacations[index].isFollowing = 0;
                setVacations(duplicateVacations);

                notify.success("Dislike!");

            }
        }
        catch(err: any) {
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
        catch(err: any) {
            notify.error(err.message);
        }
    }

    return (
        <div className="Home">

            { vacations.map(v => <VacationCard key={v.vacationId} vacation={v} checkFollow={checkFollow} deleteVacation={deleteVacation} />) }

        </div>
    );
}

export default Home;