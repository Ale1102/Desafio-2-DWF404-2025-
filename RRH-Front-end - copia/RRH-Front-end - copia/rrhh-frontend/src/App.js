// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";

// Componentes comunes
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

// Páginas
import Dashboard from "./pages/Dashboard";
import EmpleadosList from "./components/Empleados/EmpleadosList";
import EmpleadoForm from "./components/Empleados/EmpleadoForm";
import DepartamentosList from "./components/departamentos/DepartamentosList";
import DepartamentoForm from "./components/departamentos/DepartamentoForm";
import CargosList from "./components/cargos/CargosList";
import CargoForm from "./components/cargos/CargoForm";
import TipoContratacionList from "./components/tiposContratacion/TipoContratacionList";
import TipoContratacionForm from "./components/tiposContratacion/TipoContratacionForm";
import ContratacionesList from "./components/contrataciones/ContratacionesList";
import ContratacionForm from "./components/contrataciones/ContratacionForm";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              
              
              <Route path="/empleados" element={<EmpleadosList />} />
              <Route path="/empleados/new" element={<EmpleadoForm />} />
              <Route path="/empleados/edit/:id" element={<EmpleadoForm />} />

              <Route path="/departamentos" element={<DepartamentosList />} />
              <Route path="/departamentos/new" element={<DepartamentoForm />} />
              <Route path="/departamentos/edit/:id" element={<DepartamentoForm />} />

              <Route path="/cargos" element={<CargosList />} />
              <Route path="/cargos/new" element={<CargoForm />} />
              <Route path="/cargos/edit/:id" element={<CargoForm />} />

              <Route path="/tipos-contratacion" element={<TipoContratacionList />} />
              <Route path="/tipos-contratacion/new" element={<TipoContratacionForm />} />
              <Route path="/tipos-contratacion/edit/:id" element={<TipoContratacionForm />} />

              <Route path="/contrataciones" element={<ContratacionesList />} />
              <Route path="/contrataciones/new" element={<ContratacionForm />} />
              <Route path="/contrataciones/edit/:id" element={<ContratacionForm />} />
            </Routes>
          </main>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;