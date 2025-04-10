// src/components/common/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaBuilding, FaBriefcase, FaFileContract, FaFileSignature } from "react-icons/fa";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaHome /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/empleados" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUsers /> <span>Empleados</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/departamentos" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaBuilding /> <span>Departamentos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cargos" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaBriefcase /> <span>Cargos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tipos-contratacion" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaFileSignature /> <span>Tipos de Contratación</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contrataciones" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaFileContract /> <span>Contrataciones</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;