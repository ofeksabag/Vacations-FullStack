import "./Header.css";
import logo from "../../../Assets/Images/logo.png"

function Header(): JSX.Element {
    return (
        <div className="Header">
            <img src={logo} />
			<span>Vacation Website</span>
            <span>"Dream. Explore. Relax."</span>
        </div>
    );
}

export default Header;
