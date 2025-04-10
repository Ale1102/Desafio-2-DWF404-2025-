// src/components/contrataciones/ContratacionForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { 
  contratacionService, 
  empleadoService, 
  departamentoService, 
  cargoService, 
  tipoContratacionService 
} from "../../services/api";
import Loader from "../common/Loader";

const ContratacionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    fecha: "",
    idEmpleado: "",
    idDepartamento: "",
    idCargo: "",
    idTipoContratacion: "",
    salario: "",
    duracion: "",
    estado: true
  });

  const [empleados, setEmpleados] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [tiposContratacion, setTiposContratacion] = useState([]);
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [empleadosRes, departamentosRes, cargosRes, tiposRes] = await Promise.all([
          empleadoService.getAll(),
          departamentoService.getAll(),
          cargoService.getAll(),
          tipoContratacionService.getAll()
        ]);

        setEmpleados(empleadosRes.data);
        setDepartamentos(departamentosRes.data);
        setCargos(cargosRes.data);
        setTiposContratacion(tiposRes.data);
        
        if (isEditMode) {
          await fetchContratacion();
        }
        
        setLoadingData(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error al cargar los datos necesarios");
        setLoadingData(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchContratacion = async () => {
    try {
      setLoading(true);
      const response = await contratacionService.getById(id);
      const contratacion = response.data;

      // Formatear la fecha para el input date
      const fecha = contratacion.fecha
        ? new Date(contratacion.fecha).toISOString().split("T")[0]
        : "";

      setFormData({
        ...contratacion,
        fecha
      });
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar contratación:", error);
      toast.error("Error al cargar los datos de la contratación");
      setLoading(false);
      navigate("/contrataciones");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fecha) {
      newErrors.fecha = "La fecha es obligatoria";
    }

    if (!formData.idEmpleado) {
      newErrors.idEmpleado = "Debe seleccionar un empleado";
    }

    if (!formData.idDepartamento) {
      newErrors.idDepartamento = "Debe seleccionar un departamento";
    }

    if (!formData.idCargo) {
      newErrors.idCargo = "Debe seleccionar un cargo";
    }

    if (!formData.idTipoContratacion) {
      newErrors.idTipoContratacion = "Debe seleccionar un tipo de contratación";
    }

    if (formData.salario && isNaN(formData.salario)) {
      newErrors.salario = "El salario debe ser un número";
    }

    if (formData.duracion && isNaN(formData.duracion)) {
      newErrors.duracion = "La duración debe ser un número";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      // Convertir valores numéricos
      const dataToSubmit = {
        ...formData,
        salario: formData.salario ? parseFloat(formData.salario) : null,
        duracion: formData.duracion ? parseInt(formData.duracion) : null,
        idEmpleado: parseInt(formData.idEmpleado),
        idDepartamento: parseInt(formData.idDepartamento),
        idCargo: parseInt(formData.idCargo),
        idTipoContratacion: parseInt(formData.idTipoContratacion)
      };

      if (isEditMode) {
        await contratacionService.update(id, dataToSubmit);
        toast.success("Contratación actualizada correctamente");
      } else {
        await contratacionService.create(dataToSubmit);
        toast.success("Contratación creada correctamente");
      }

      setSubmitting(false);
      navigate("/contrataciones");
    } catch (error) {
      console.error("Error al guardar contratación:", error);
      toast.error(`Error al ${isEditMode ? "actualizar" : "crear"} la contratación`);
      setSubmitting(false);
    }
  };

  if (loadingData) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditMode ? "Editar Contratación" : "Nueva Contratación"}</h2>
        <Button variant="secondary" onClick={() => navigate("/contrataciones")}>
          <FaArrowLeft className="me-2" /> Volver
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha *</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha || ""}
                    onChange={handleChange}
                    isInvalid={!!errors.fecha}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fecha}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Empleado *</Form.Label>
                  <Form.Select
                    name="idEmpleado"
                    value={formData.idEmpleado || ""}
                    onChange={handleChange}
                    isInvalid={!!errors.idEmpleado}
                  >
                    <option value="">Seleccione un empleado</option>
                    {empleados.map(empleado => (
                      <option key={empleado.idEmpleado} value={empleado.idEmpleado}>
                        {empleado.nombreEmp} {empleado.apellidoEmp}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.idEmpleado}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Departamento *</Form.Label>
                  <Form.Select
                    name="idDepartamento"
                    value={formData.idDepartamento || ""}
                    onChange={handleChange}
                    isInvalid={!!errors.idDepartamento}
                  >
                    <option value="">Seleccione un departamento</option>
                    {departamentos.map(departamento => (
                      <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                        {departamento.nombreDepartamento}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.idDepartamento}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cargo *</Form.Label>
                  <Form.Select
                    name="idCargo"
                    value={formData.idCargo || ""}
                    onChange={handleChange}
                    isInvalid={!!errors.idCargo}
                  >
                    <option value="">Seleccione un cargo</option>
                    {cargos.map(cargo => (
                      <option key={cargo.idCargo} value={cargo.idCargo}>
                        {cargo.cargo}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.idCargo}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Contratación *</Form.Label>
                  <Form.Select
                    name="idTipoContratacion"
                    value={formData.idTipoContratacion || ""}
                    onChange={handleChange}
                    isInvalid={!!errors.idTipoContratacion}
                  >
                    <option value="">Seleccione un tipo de contratación</option>
                    {tiposContratacion.map(tipo => (
                      <option key={tipo.idTipoContratacion} value={tipo.idTipoContratacion}>
                        {tipo.tipoContratacion}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.idTipoContratacion}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salario</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="salario"
                    value={formData.salario || ""}
                    onChange={handleChange}
                    isInvalid={!!errors.salario}
                  />
                  <Form.Control.Feedback type="invalid">{errors.salario}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duración (meses)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duracion"
                    value={formData.duracion || ""}
                    onChange={handleChange}
                    isInvalid={!!errors.duracion}
                  />
                  <Form.Control.Feedback type="invalid">{errors.duracion}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3 mt-4">
                  <Form.Check
                    type="checkbox"
                    label="Contratación Activa"
                    name="estado"
                    checked={formData.estado || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary" disabled={submitting}>
                <FaSave className="me-2" /> {submitting ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContratacionForm;