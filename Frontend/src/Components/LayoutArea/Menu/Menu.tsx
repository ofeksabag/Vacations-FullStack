import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faHouseChimney, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import "./Menu.css";

function Menu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
    }, []);

    return (
        <>
        
            {user && <>
                <div className="Menu">
                
                    <NavLink to="/home"><FontAwesomeIcon icon={faHouseChimney} /> home</NavLink>

                    { user.role === "Admin" && <>

                        <NavLink to="/admin/add-vacation"><FontAwesomeIcon icon={faPlusSquare} /> vacation</NavLink>
                        <NavLink to="/admin/report"><FontAwesomeIcon icon={faFileLines} /> report</NavLink>

                    </> }
                
                </div>
            </>}

        </>
    );
}

export default Menu;
