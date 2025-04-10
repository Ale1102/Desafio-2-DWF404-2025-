// src/components/common/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>RRHH UDB</h1>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="user-info">
              <span>Admin</span>
              <img src="/assets/avatar.png" alt="User Avatar" className="avatar" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;