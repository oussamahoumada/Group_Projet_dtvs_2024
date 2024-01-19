import "./style.css";
import React from "react";
import { FaHome } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import { GiGoalKeeper } from "react-icons/gi";
import { IoMdFootball } from "react-icons/io";
import { FaUserInjured } from "react-icons/fa";
import { LiaPenSolid } from "react-icons/lia";
import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav id="navbar">
        <ul className="navbar-items flexbox-col">
          <li className="navbar-logo flexbox-left">
            <a className="navbar-item-inner flexbox" href="/">
              <IoMdFootball />
            </a>
          </li>
          <li className="navbar-item flexbox-left">
            <div className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <FaHome />
              </div>
              <Link to="/">Home</Link>
            </div>
          </li>
          <li className="navbar-item flexbox-left">
            <div className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <GiGoalKeeper />
              </div>
              <Link to="/goal">Buts</Link>
            </div>
          </li>

          <li className="navbar-item flexbox-left">
            <div className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <GiSoccerKick />
              </div>
              <Link to="/pass">Passe</Link>
            </div>
          </li>
          <li className="navbar-item flexbox-left">
            <div className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <FaUserInjured />
              </div>
              <Link to="/foul">Fautes</Link>
            </div>
          </li>
          <li className="navbar-item flexbox-left">
            <div className="navbar-item-inner flexbox-left">
              <div className="navbar-item-inner-icon-wrapper flexbox">
                <LiaPenSolid />
              </div>
              <Link to="/exercice3">Exercice3</Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
