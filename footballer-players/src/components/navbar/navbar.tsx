import "./style.css";
import React from "react";
import { FaHome } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import { GiGoalKeeper } from "react-icons/gi";
import { IoMdFootball } from "react-icons/io";
import { FaUserInjured } from "react-icons/fa";

function NavBar() {
    return <>
        <nav id="navbar">
            <ul className="navbar-items flexbox-col">
                <li className="navbar-logo flexbox-left">
                    <a className="navbar-item-inner flexbox" href="/">
                        <IoMdFootball />
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" href="/">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <FaHome/>
                        </div>
                        <span className="link-text">Home</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" href="pass">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <GiGoalKeeper />
                        </div>
                        <span className="link-text">Goal</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" href="pass">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <GiSoccerKick />
                        </div>
                        <span className="link-text">Pass</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" href="pass">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <FaUserInjured />
                        </div>
                        <span className="link-text">Foul</span>
                    </a>
                </li>
            </ul>
        </nav>
    </>;
}

export default NavBar;
