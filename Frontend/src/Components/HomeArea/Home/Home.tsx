import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import adminService from "../../../Services/AdminService";
import vacationService from "../../../Services/VacationService";
import notify from "../../../Utils/Notify";
import VacationCard from "../VacationCard/VacationCard";

function Home(): JSX.Element {

    const [ vacations, setVacations ] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacationsDB => setVacations(vacationsDB))
            .catch(err => notify.error(err.message));
    }, []);

    async function checkFollow(vacationId: number, isFollowing: number) {
        try {
            if(isFollowing === 0) {
                await vacationService.follow(vacationId);

                const duplicateVacations = [...vacations];
                const index = duplicateVacations.findIndex(v => v.isFollowing === isFollowing && v.vacationId === vacationId);
                if(index !== -1) duplicateVacations[index].isFollowing = 1;
                setVacations(duplicateVacations);
            }
            else {
                await vacationService.unfollow(vacationId);
                
                const duplicateVacations = [...vacations];
                const index = duplicateVacations.findIndex(v => v.isFollowing === isFollowing && v.vacationId === vacationId);
                if(index !== -1) duplicateVacations[index].isFollowing = 0;
                setVacations(duplicateVacations);
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