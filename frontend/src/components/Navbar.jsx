import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo_transparent.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/mysessions" className="nav-link">
        My Sessions
      </NavLink>
      <NavLink to="/logout" className="nav-link">
        Logout
      </NavLink>
    </nav>
  );
}

export default Navbar;
