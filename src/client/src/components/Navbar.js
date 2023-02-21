import { useState } from "react";
import "../assets/css/NavbarStyles.css";

function Navbar() {
    const [state, setState] = useState(false);
    const handleClick = () => {
        setState(!state);
    };
    const logout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
        window.location.reload();

    }

    return (
        <nav className="nav-items">
            <h1 className="logo">EasyPark</h1>
            <div className="menu-icons"
                onClick={handleClick}>
                <i className={state
                    ? "fa fa-times"
                    : "fa fa-bars"}></i>
            </div>
            <ul className={state
                ? "nav-menu active"
                : "nav-menu"}>
                <li >
                
                </li>
                <li>
                    <button onClick={()=>logout()} className="nav-buttons">Déconnexion</button>
                </li>
            </ul>
        </nav>
    );

}

export default Navbar;