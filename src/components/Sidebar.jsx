import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoBook, IoNewspaper } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import Reactdatepicker from "./datepicker"



const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  const [selectDate, setSelectDate] = useState(null)



  //date picket state
  const HandleDate = (date) => {
    setSelectDate(date)
  }
  return (
    <div>
      <aside className="menu sidebar is-fixed-bottom pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>
              <IoPricetag /> Clients
            </NavLink>
          </li>
          <li>
            <NavLink to={"/notes"}>
              <IoNewspaper />Progress Notes
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
        <p className="menu-label">Calendar</p>
        <Reactdatepicker/>
       
      </aside>
    </div>
  );
};

export default Sidebar;
