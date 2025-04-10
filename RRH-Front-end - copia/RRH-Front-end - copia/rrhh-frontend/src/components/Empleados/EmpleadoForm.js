"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaSave, FaArrowLeft } from "react-icons/fa"
import { empleadoService } from "../../services/api"
import "./EmpleadoForm.css"

const EmpleadoForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    nombreEmp: "",
    apellidoEmp: "",
    direccion: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    representacion: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    if (isEditMode) {
      fetchEmpleado()
    }
  }, [id, isEditMode])

  const fetchEmpleado = async () => {
    try {
      setLoading(true)
      const response = await empleadoService.getById(id)
      const empleado = response.data

      // Formatear la fecha para el input date
      const fechaNacimiento = empleado.fechaNacimiento
        ? new Date(empleado.fechaNacimiento).toISOString().split("T")[0]
        : ""

      setFormData({
        ...empleado,
        fechaNacimiento,
      })
      setLoading(false)
    } catch (error) {
      console.error("Error al cargar empleado:", error)
      toast.error("Error al cargar los datos del empleado")
      setLoading(false)
      navigate("/empleados")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombreEmp.trim()) {
      newErrors.nombreEmp = "El nombre es obligatorio"
    }

    if (!formData.apellidoEmp.trim()) {
      newErrors.apellidoEmp = "El apellido es obligatorio"
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
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

    // Limpiar error cuando el usuario modifica un campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)

      // Crear una copia del formData para enviar
      const dataToSend = { ...formData }

      if (isEditMode) {
        await empleadoService.update(id, dataToSend)
        toast.success("Empleado actualizado correctamente")
      } else {
        await empleadoService.create(dataToSend)
        toast.success("Empleado creado correctamente")
      }

      setLoading(false)
      navigate("/empleados")
    } catch (error) {
      console.error("Error al guardar empleado:", error)

      // Mostrar mensaje de error más específico si está disponible
      const errorMessage =
        error.response?.data?.message || `Error al ${isEditMode ? "actualizar" : "crear"} el empleado`

      toast.error(errorMessage)
      setSubmitError(errorMessage)
      setLoading(false)
    }
  }

  if (loading && isEditMode) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="empleado-form">
      <div className="form-header">
        <h1>{isEditMode ? "Editar Empleado" : "Nuevo Empleado"}</h1>
        <button className="btn btn-secondary" onClick={() => navigate("/empleados")}>
          <FaArrowLeft /> Volver
        </button>
      </div>

      <div className="form-container">
        {submitError && <div className="error-message">{submitError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombreEmp">Nombre *</label>
              <input
                type="text"
                id="nombreEmp"
                name="nombreEmp"
                className={`form-control ${errors.nombreEmp ? "is-invalid" : ""}`}
                value={formData.nombreEmp}
                onChange={handleChange}
              />
              {errors.nombreEmp && <div className="form-error">{errors.nombreEmp}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="apellidoEmp">Apellido *</label>
              <input
                type="text"
                id="apellidoEmp"
                name="apellidoEmp"
                className={`form-control ${errors.apellidoEmp ? "is-invalid" : ""}`}
                value={formData.apellidoEmp}
                onChange={handleChange}
              />
              {errors.apellidoEmp && <div className="form-error">{errors.apellidoEmp}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email || ""}
                onChange={handleChange}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                className="form-control"
                value={formData.telefono || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className="form-control"
                value={formData.direccion || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                className="form-control"
                value={formData.fechaNacimiento || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="representacion">Representación</label>
            <input
              type="text"
              id="representacion"
              name="representacion"
              className="form-control"
              value={formData.representacion || ""}
              onChange={handleChange}
            />
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

export default EmpleadoForm
