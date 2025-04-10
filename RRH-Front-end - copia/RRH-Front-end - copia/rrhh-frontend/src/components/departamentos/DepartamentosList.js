"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa"
import { departamentoService } from "../../services/api"


const DepartamentosList = () => {
  const [departamentos, setDepartamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchDepartamentos()
  }, [])

  const fetchDepartamentos = async () => {
    try {
      const response = await departamentoService.getAll()
      setDepartamentos(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error al cargar departamentos:", error)
      toast.error("Error al cargar la lista de departamentos")
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm.trim() === "") {
      fetchDepartamentos()
      return
    }

    try {
      setLoading(true)
      const response = await departamentoService.search(searchTerm)
      setDepartamentos(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error al buscar departamentos:", error)
      toast.error("Error al buscar departamentos")
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este departamento?")) {
      try {
        await departamentoService.delete(id)
        toast.success("Departamento eliminado correctamente")
        fetchDepartamentos()
      } catch (error) {
        console.error("Error al eliminar departamento:", error)
        toast.error("Error al eliminar el departamento")
      }
    }
  }

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="empleados-list">
      <div className="list-header">
        <h1>Departamentos</h1>
        <Link to="/departamentos/new" className="btn btn-primary">
          <FaPlus /> Nuevo Departamento
        </Link>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-input">
            <input
              type="text"
              placeholder="Buscar por nombre..."
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
              <th>Ubicación</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.length > 0 ? (
              departamentos.map((departamento) => (
                <tr key={departamento.idDepartamento}>
                  <td>{departamento.idDepartamento}</td>
                  <td>{departamento.nombreDepartamento}</td>
                  <td>{departamento.ubicacion}</td>
                  <td>{departamento.descripcionDepartamento}</td>
                  <td>
                    <div className="actions">
                      <Link to={`/departamentos/edit/${departamento.idDepartamento}`} className="btn btn-secondary">
                        <FaEdit />
                      </Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(departamento.idDepartamento)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay departamentos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DepartamentosList
