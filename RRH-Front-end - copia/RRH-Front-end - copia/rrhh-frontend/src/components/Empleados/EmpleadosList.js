"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa"
import { empleadoService } from "../../services/api"
import "./EmpleadosList.css"

const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchEmpleados()
  }, [])

  const fetchEmpleados = async () => {
    try {
      const response = await empleadoService.getAll()
      setEmpleados(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error al cargar empleados:", error)
      toast.error("Error al cargar la lista de empleados")
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm.trim() === "") {
      fetchEmpleados()
      return
    }

    try {
      setLoading(true)
      const response = await empleadoService.search(searchTerm)
      setEmpleados(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error al buscar empleados:", error)
      toast.error("Error al buscar empleados")
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este empleado?")) {
      try {
        await empleadoService.delete(id)
        toast.success("Empleado eliminado correctamente")
        fetchEmpleados()
      } catch (error) {
        console.error("Error al eliminar empleado:", error)
        toast.error("Error al eliminar el empleado")
      }
    }
  }

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="empleados-list">
      <div className="list-header">
        <h1>Empleados</h1>
        <Link to="/empleados/new" className="btn btn-primary">
          <FaPlus /> Nuevo Empleado
        </Link>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-input">
            <input
              type="text"
              placeholder="Buscar por nombre o apellido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length > 0 ? (
              empleados.map((empleado) => (
                <tr key={empleado.idEmpleado}>
                  <td>{empleado.idEmpleado}</td>
                  <td>{empleado.nombreEmp}</td>
                  <td>{empleado.apellidoEmp}</td>
                  <td>{empleado.email}</td>
                  <td>{empleado.telefono}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/empleados/edit/${empleado.idEmpleado}`} className="btn btn-secondary">
                        <FaEdit />
                      </Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(empleado.idEmpleado)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay empleados registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmpleadosList
