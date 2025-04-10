"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaSave, FaArrowLeft } from "react-icons/fa"
import { departamentoService } from "../../services/api"


const DepartamentoForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    nombreDepartamento: "",
    ubicacion: "",
    descripcionDepartamento: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditMode) {
      fetchDepartamento()
    }
  }, [id])

  const fetchDepartamento = async () => {
    try {
      setLoading(true)
      const response = await departamentoService.getById(id)
      setFormData(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error al cargar departamento:", error)
      toast.error("Error al cargar los datos del departamento")
      setLoading(false)
      navigate("/departamentos")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombreDepartamento.trim()) {
      newErrors.nombreDepartamento = "El nombre del departamento es obligatorio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)

      if (isEditMode) {
        await departamentoService.update(id, formData)
        toast.success("Departamento actualizado correctamente")
      } else {
        await departamentoService.create(formData)
        toast.success("Departamento creado correctamente")
      }

      setLoading(false)
      navigate("/departamentos")
    } catch (error) {
      console.error("Error al guardar departamento:", error)
      toast.error(`Error al ${isEditMode ? "actualizar" : "crear"} el departamento`)
      setLoading(false)
    }
  }

  if (loading && isEditMode) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="empleado-form">
      <div className="form-header">
        <h1>{isEditMode ? "Editar Departamento" : "Nuevo Departamento"}</h1>
        <button className="btn btn-secondary" onClick={() => navigate("/departamentos")}>
          <FaArrowLeft /> Volver
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombreDepartamento">Nombre del Departamento *</label>
            <input
              type="text"
              id="nombreDepartamento"
              name="nombreDepartamento"
              className={`form-control ${errors.nombreDepartamento ? "is-invalid" : ""}`}
              value={formData.nombreDepartamento}
              onChange={handleChange}
            />
            {errors.nombreDepartamento && <div className="form-error">{errors.nombreDepartamento}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              className="form-control"
              value={formData.ubicacion || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcionDepartamento">Descripción</label>
            <textarea
              id="descripcionDepartamento"
              name="descripcionDepartamento"
              className="form-control"
              rows="4"
              value={formData.descripcionDepartamento || ""}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FaSave /> {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DepartamentoForm
