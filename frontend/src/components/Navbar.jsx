import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
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