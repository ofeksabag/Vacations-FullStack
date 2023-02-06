import image from "../../../Assets/Images/island.gif";
import { NavLink } from "react-router-dom";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={image} width="300" />
            <br />
            <p>
                You've found a desert island!
                <br />
                Unfortunately we can't take you here.
                <br />
                <br />
                <NavLink to="/home"><b>Vacations we can take you</b></NavLink>
            </p>
        </div>
    );
}

export default PageNotFound;
