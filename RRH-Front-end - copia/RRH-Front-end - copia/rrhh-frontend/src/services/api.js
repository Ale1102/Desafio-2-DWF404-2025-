import axios from "axios"

const API_BASE_URL = "http://localhost:8080/rrhh-api/api"

// Configuración de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Servicios para Empleados
export const empleadoService = {
  getAll: () => api.get("/empleados"),
  getById: (id) => api.get(`/empleados/${id}`),
  create: (empleado) => api.post("/empleados", empleado),
  update: (id, empleado) => api.put(`/empleados/${id}`, empleado),
  delete: (id) => api.delete(`/empleados/${id}`),
  search: (query) => api.get(`/empleados/search?query=${query}`),
}

// Servicios para Departamentos
export const departamentoService = {
  getAll: () => api.get("/departamentos"),
  getById: (id) => api.get(`/departamentos/${id}`),
  create: (departamento) => api.post("/departamentos", departamento),
  update: (id, departamento) => api.put(`/departamentos/${id}`, departamento),
  delete: (id) => api.delete(`/departamentos/${id}`),
  search: (query) => api.get(`/departamentos/search?query=${query}`),
}

// Servicios para Cargos
export const cargoService = {
  getAll: () => api.get("/cargos"),
  getById: (id) => api.get(`/cargos/${id}`),
  create: (cargo) => api.post("/cargos", cargo),
  update: (id, cargo) => api.put(`/cargos/${id}`, cargo),
  delete: (id) => api.delete(`/cargos/${id}`),
  search: (query) => api.get(`/cargos/search?query=${query}`),
}

// Servicios para Tipos de Contratación
export const tipoContratacionService = {
  getAll: () => api.get("/tipos-contratacion"),
  getById: (id) => api.get(`/tipos-contratacion/${id}`),
  create: (tipoContratacion) => api.post("/tipos-contratacion", tipoContratacion),
  update: (id, tipoContratacion) => api.put(`/tipos-contratacion/${id}`, tipoContratacion),
  delete: (id) => api.delete(`/tipos-contratacion/${id}`),
}

// Servicios para Contrataciones
export const contratacionService = {
  getAll: () => api.get("/contrataciones"),
  getById: (id) => api.get(`/contrataciones/${id}`),
  create: (contratacion) => api.post("/contrataciones", contratacion),
  update: (id, contratacion) => api.put(`/contrataciones/${id}`, contratacion),
  delete: (id) => api.delete(`/contrataciones/${id}`),
  getByEmpleado: (idEmpleado) => api.get(`/contrataciones/empleado/${idEmpleado}`),
  getActivas: () => api.get("/contrataciones/activas"),
}

export default {
  empleadoService,
  departamentoService,
  cargoService,
  tipoContratacionService,
  contratacionService,
}
