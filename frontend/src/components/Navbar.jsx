import React from "react";
import "./Component.css";
import { Link } from "react-router-dom";
import logo from "../assests/images/logo1.jfif";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return (
    <div className="header">
      <div>
        <h1>Angel Pvt Ltd.</h1>
        <Link to="/home">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar">
        <ul>
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/task">
            <li>Tasks</li>
          </Link>
          <Link to="/manage">
            <li>Management</li>
          </Link>
        </ul>
        <ul>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/message">
            <li>Message</li>
          </Link>
          <Link to="/notification">
            <li>Notifications</li>
          </Link>

          {localStorage.getItem("auth-token") ? (
            <li onClick={handleLogout}>Logout</li>
          ) : (
            <Link to="/">
              <li>Login</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
