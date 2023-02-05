import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/AppConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHeart, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./VacationCard.css";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import notify from "../../../Utils/Notify";
import { NavLink } from "react-router-dom";

interface VacationCardProps {
    vacation: VacationModel;
    checkFollow: (vacationId: number, isFollowing: number) => Promise<void>;
    deleteVacation: (vacationId: number) => Promise<void>;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {

        setUser(authStore.getState().user);

        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

    }, []);

    useEffect(() => {
        props.vacation.isFollowing === 1 && setIsActive(true);
    }, []);

    function formatTime(time: string): string {
        const d = new Date(time);
        return d.toLocaleDateString("he-IL");
    }

    function days(date1: Date, date2: Date) {
        let difference = date2.getTime() - date1.getTime();
        let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return totalDays;
    }

    const handleClick = () => {

        props.vacation.isFollowing === 0 ? setIsActive(true) : setIsActive(false);
        
        updateFollow();

    };

    async function updateFollow() {
        try {
            await props.checkFollow(props.vacation.vacationId, props.vacation.isFollowing);
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    async function deleteMe() {
        try {
            if (!window.confirm("Are you sure?")) return;
            await props.deleteVacation(props.vacation.vacationId);
            notify.success("Vacation has been deleted");
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    return (
        <div className="VacationCard">

            <div className="VacationBG" style={{ backgroundImage: `url("${appConfig.userVacationsImagesUrl + props.vacation.imageFile}")` }}>

                {user && user.role === "Admin" && <>

                    <NavLink to={`/admin/vacations/${props.vacation.vacationId}`}>
                        <button className="SmallButton">

                            <span>
                                <FontAwesomeIcon icon={faPen} />
                            </span>

                            Edit

                        </button>
                    </NavLink>

                    <button className="SmallButton" onClick={deleteMe}>

                        <span>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>

                        Delete

                    </button>

                </>}

                {user && user.role === "User" && <>

                    <button className="SmallButton" style={{
                        backgroundColor: isActive ? 'salmon' : '',
                        color: isActive ? 'white' : '',
                    }} onClick={handleClick}>

                        <span>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>

                        Like {props.vacation.followersCount}

                    </button>

                </>}

                <div>
                    {props.vacation.destination}
                </div>

            </div>

            <div className="Dates">

                <FontAwesomeIcon icon={faCalendarDays} /> {formatTime(props.vacation.startDate)} - {formatTime(props.vacation.endDate)}
                <span>{days(new Date(props.vacation.startDate), new Date(props.vacation.endDate))} days</span>
                <div>{props.vacation.description}</div>
                <button>{props.vacation.price}$</button>

            </div>
        </div>
    );
}

export default VacationCard;
