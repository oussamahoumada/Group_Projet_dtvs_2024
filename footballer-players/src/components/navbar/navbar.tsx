import "./style.css";
import { FaHome } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { GiSoccerKick } from "react-icons/gi";

function NavBar() {
    return <>
        <nav id="navbar">
            <ul className="navbar-items flexbox-col">
                <li className="navbar-logo flexbox-left">
                    <a className="navbar-item-inner flexbox" href="#/">
                        <GiSoccerKick />
                    </a>

                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" href="#/">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <CiSearch/>
                        </div>
                        <span className="link-text">Search</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" href="#/">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <FaHome/>
                        </div>
                        <span className="link-text">Home</span>
                    </a>
                </li>
            </ul>
        </nav>
    </>;
}

export default NavBar;
