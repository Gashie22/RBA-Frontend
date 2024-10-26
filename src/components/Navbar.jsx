import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoPricetag,
  IoHome,
  IoLogOut,
  IoBook,
  IoNewspaper,
} from "react-icons/io5";

import logo from "../logo.png";
import elmala from "../elmala.png";
import Reactdatepicker from "./datepicker";

import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <img src={elmala} width="72" height="98" alt="logo" />
          </NavLink>

          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className=" menu is-flex is-justify-content-space-between p-10">
          <ul className="is-flex menu-list  is-justify-content-space-between p-6 pl-9 is-align-content-space-evenly is-align-items-stretch is-flex-grow-3">
            <li className="px-6">
              <NavLink to={"/dashboard"}>
                <IoHome /> Dashboard
              </NavLink>
            </li>
            <li className="px-6">
              <NavLink to={"/clients"}>
                <IoPricetag /> Clients
              </NavLink>
            </li>
            <li className="px-6">
              <NavLink to={"/notes"}>
                <IoNewspaper />
                Progress Notes
              </NavLink>
            </li>
          </ul>
          {user && user.role === "admin" && (
            <div>
              <ul className="menu-list p-6 pl-9">
                <li className="menu">
                  <NavLink to={"/users"}>
                    <IoPerson /> Users
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <div className="p-6  menu-list pl-9">
            <Reactdatepicker className="p-6 pl-9" />
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
