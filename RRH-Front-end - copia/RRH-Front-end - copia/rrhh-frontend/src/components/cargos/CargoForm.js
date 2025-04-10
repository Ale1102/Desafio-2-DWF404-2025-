// src/components/cargos/CargoForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { cargoService } from "../../services/api";
import Loader from "../common/Loader";

const CargoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    cargo: "",
    descripcionCargo: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchCargo();
    }
  }, [id]);

  const fetchCargo = async () => {
    try {
      setLoading(true);
      const response = await cargoService.getById(id);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar cargo:", error);
      toast.error("Error al cargar los datos del cargo");
      setLoading(false);
      navigate("/cargos");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cargo.trim()) {
      newErrors.cargo = "El nombre del cargo es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      if (isEditMode) {
        await cargoService.update(id, formData);
        toast.success("Cargo actualizado correctamente");
      } else {
        await cargoService.create(formData);
        toast.success("Cargo creado correctamente");
      }

      setSubmitting(false);
      navigate("/cargos");
    } catch (error) {
      console.error("Error al guardar cargo:", error);
      toast.error(`Error al ${isEditMode ? "actualizar" : "crear"} el cargo`);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditMode ? "Editar Cargo" : "Nuevo Cargo"}</h2>
        <Button variant="secondary" onClick={() => navigate("/cargos")}>
          <FaArrowLeft className="me-2" /> Volver
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Cargo *</Form.Label>
              <Form.Control
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                isInvalid={!!errors.cargo}
              />
              <Form.Control.Feedback type="invalid">{errors.cargo}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="descripcionCargo"
                value={formData.descripcionCargo || ""}
                onChange={handleChange}
              />
            </Form.Group>

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

export default CargoForm;