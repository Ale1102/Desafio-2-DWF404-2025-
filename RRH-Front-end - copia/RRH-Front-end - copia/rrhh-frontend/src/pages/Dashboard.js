"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaUsers, FaBuilding, FaBriefcase, FaFileContract } from "react-icons/fa"
import { empleadoService, departamentoService, cargoService, contratacionService } from "../services/api"
import "./Dashboard.css"

const Dashboard = () => {
  const [stats, setStats] = useState({
    empleados: 0,
    departamentos: 0,
    cargos: 0,
    contrataciones: 0,
  })

  const [loading, setLoading] = useState(true)
  const [recentContrataciones, setRecentContrataciones] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [empleadosRes, departamentosRes, cargosRes, contratacionesRes] = await Promise.all([
          empleadoService.getAll(),
          departamentoService.getAll(),
          cargoService.getAll(),
          contratacionService.getAll(),
        ])

        setStats({
          empleados: empleadosRes.data.length,
          departamentos: departamentosRes.data.length,
          cargos: cargosRes.data.length,
          contrataciones: contratacionesRes.data.length,
        })

        // Ordenar contrataciones por fecha (más recientes primero)
        const sortedContrataciones = [...contratacionesRes.data]
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 5) // Tomar solo las 5 más recientes

        // Obtener información adicional para cada contratación
        const contratacionesWithDetails = await Promise.all(
          sortedContrataciones.map(async (contratacion) => {
            const [empleadoRes, departamentoRes, cargoRes] = await Promise.all([
              empleadoService.getById(contratacion.idEmpleado),
              departamentoService.getById(contratacion.idDepartamento),
              cargoService.getById(contratacion.idCargo),
            ])

            return {
              ...contratacion,
              empleado: `${empleadoRes.data.nombreEmp} ${empleadoRes.data.apellidoEmp}`,
              departamento: departamentoRes.data.nombreDepartamento,
              cargo: cargoRes.data.cargo,
            }
          }),
        )

        setRecentContrataciones(contratacionesWithDetails)
        setLoading(false)
      } catch (error) {
        console.error("Error al cargar estadísticas:", error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>Empleados</h3>
            <p className="stat-number">{stats.empleados}</p>
            <Link to="/empleados" className="stat-link">
              Ver todos
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBuilding />
          </div>
          <div className="stat-content">
            <h3>Departamentos</h3>
            <p className="stat-number">{stats.departamentos}</p>
            <Link to="/departamentos" className="stat-link">
              Ver todos
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBriefcase />
          </div>
          <div className="stat-content">
            <h3>Cargos</h3>
            <p className="stat-number">{stats.cargos}</p>
            <Link to="/cargos" className="stat-link">
              Ver todos
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaFileContract />
          </div>
          <div className="stat-content">
            <h3>Contrataciones</h3>
            <p className="stat-number">{stats.contrataciones}</p>
            <Link to="/contrataciones" className="stat-link">
              Ver todas
            </Link>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2>Contrataciones Recientes</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Empleado</th>
                <th>Departamento</th>
                <th>Cargo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentContrataciones.length > 0 ? (
                recentContrataciones.map((contratacion) => (
                  <tr key={contratacion.idContratacion}>
                    <td>{new Date(contratacion.fecha).toLocaleDateString()}</td>
                    <td>{contratacion.empleado}</td>
                    <td>{contratacion.departamento}</td>
                    <td>{contratacion.cargo}</td>
                    <td>
                      <span className={`status ${contratacion.estado ? "active" : "inactive"}`}>
                        {contratacion.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay contrataciones recientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
