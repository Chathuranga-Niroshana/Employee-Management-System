import React from "react";
import { Link } from "react-router-dom";
import './Component.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faComments,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assests/images/logo1.jfif";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return (
    <div className="header h-[300px] flex flex-col justify-between items-center bg-cover bg-center">
      <div className="flex items-center justify-between w-full mt-10">
        <h1 className="text-4xl font-bold text-blue-900 cursor-pointer ml-48">
          Angel Pvt Ltd.
        </h1>
        <Link to="/home">
          <img
            src={logo}
            alt="logo"
            className="cursor-pointer w-20 rounded-3xl mt-6 mr-10"
          />
        </Link>
      </div>
      <div className="navbar flex items-center justify-between w-full border-none shadow-md -ml-2 md:ml-0">
        <ul className="w-2/5 flex items-center justify-around">
          <Link to="/home">
            <li className="cursor-pointer font-medium hover:font-bold">Home</li>
          </Link>
          <Link to="/task">
            <li className="cursor-pointer font-medium hover:font-bold">
              Tasks
            </li>
          </Link>
        </ul>
        <ul className="w-2/5 flex items-center justify-around p-1">
          <Link to="/profile">
            <li className="navIcons">
              <FontAwesomeIcon
                className="text-blue-400 hover:text-xl"
                icon={faUserAlt}
              />
            </li>
          </Link>
          <Link to="/message">
            <li className="navIcons ">
              <FontAwesomeIcon
                className="text-red-600 hover:text-xl"
                icon={faComments}
              />
            </li>
          </Link>
          {localStorage.getItem("auth-token") ? (
            <li onClick={handleLogout} className="navIcons cursor-pointer">
              <FontAwesomeIcon
                className="text-red-900 hover:text-xl"
                icon={faWindowClose}
              />
            </li>
          ) : (
            <Link to="/">
              <li className="cursor-pointer font-medium hover:font-bold">
                Login
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
