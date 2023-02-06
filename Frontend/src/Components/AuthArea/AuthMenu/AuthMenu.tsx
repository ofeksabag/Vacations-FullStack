import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    useEffect(() => {

        setUser(authStore.getState().user);

        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

    }, []);

    function logout(): void {
        authService.logout();
        navigate("/login");
        window.location.reload();
    }

    return (
        <>

            {user && <>

                <div className="AuthMenu">
                    <span>
                        <FontAwesomeIcon icon={faUser} />
                        <span>{user.firstName} {user.lastName}</span>
                        <div>
                            <NavLink to="/login" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></NavLink>
                        </div>
                    </span>
                </div>

            </>}

        </>
    );
}

export default AuthMenu;
