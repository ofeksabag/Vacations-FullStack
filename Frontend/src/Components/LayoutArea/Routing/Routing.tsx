import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import Report from "../../AdminArea/Report/Report";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    const [ user, setUser ] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
    }, []);

    return (
        <Routes>
            <Route path="/home" element={<Home />} />

            {!user && <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </>}

            {user && user.role === "Admin" && <>
                <Route path="/admin/vacations/:vacationId" element={<EditVacation />} />
                <Route path="/admin/add-vacation" element={<AddVacation />} />
                <Route path="/admin/report" element={<Report />} />
            </>}

            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
