// src/components/contrataciones/ContratacionesList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Form, InputGroup, Card, Badge } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { contratacionService, empleadoService, departamentoService, cargoService } from "../../services/api";
import Loader from "../common/Loader";
import ConfirmDialog from "../common/ConfirmDialog";

const ContratacionesList = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [contratacionesConDetalles, setContratacionesConDetalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [contratacionToDelete, setContratacionToDelete] = useState(null);

  useEffect(() => {
    fetchContrataciones();
  }, []);

  const fetchContrataciones = async () => {
    try {
      setLoading(true);
      const response = await contratacionService.getAll();
      setContrataciones(response.data);
      
      // Obtener detalles adicionales para cada contratación
      const contratacionesDetalladas = await Promise.all(
        response.data.map(async (contratacion) => {
          try {
            const [empleadoRes, departamentoRes, cargoRes] = await Promise.all([
              empleadoService.getById(contratacion.idEmpleado),
              departamentoService.getById(contratacion.idDepartamento),
              cargoService.getById(contratacion.idCargo)
            ]);
            
            return {
              ...contratacion,
              empleadoNombre: `${empleadoRes.data.nombreEmp} ${empleadoRes.data.apellidoEmp}`,
              departamentoNombre: departamentoRes.data.nombreDepartamento,
              cargoNombre: cargoRes.data.cargo
            };
          } catch (error) {
            console.error("Error al obtener detalles de contratación:", error);
            return {
              ...contratacion,
              empleadoNombre: "No disponible",
              departamentoNombre: "No disponible",
              cargoNombre: "No disponible"
            };
          }
        })
      );
      
      setContratacionesConDetalles(contratacionesDetalladas);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar contrataciones:", error);
      toast.error("Error al cargar la lista de contrataciones");
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setContratacionToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!contratacionToDelete) return;

    try {
      await contratacionService.delete(contratacionToDelete);
      toast.success("Contratación eliminada correctamente");
      fetchContrataciones();
      setShowConfirm(false);
      setContratacionToDelete(null);
    } catch (error) {
      console.error("Error al eliminar contratación:", error);
      toast.error("Error al eliminar la contratación");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contrataciones</h2>
        <Link to="/contrataciones/new" className="btn btn-primary">
          <FaPlus className="me-2" /> Nueva Contratación
        </Link>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Empleado</th>
                <th>Departamento</th>
                <th>Cargo</th>
                <th>Salario</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contratacionesConDetalles.length > 0 ? (
                contratacionesConDetalles.map((contratacion) => (
                  <tr key={contratacion.idContratacion}>
                    <td>{contratacion.idContratacion}</td>
                    <td>{new Date(contratacion.fecha).toLocaleDateString()}</td>
                    <td>{contratacion.empleadoNombre}</td>
                    <td>{contratacion.departamentoNombre}</td>
                    <td>{contratacion.cargoNombre}</td>
                    <td>${contratacion.salario?.toFixed(2) || "N/A"}</td>
                    <td>
                      <Badge bg={contratacion.estado ? "success" : "danger"}>
                        {contratacion.estado ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/contrataciones/edit/${contratacion.idContratacion}`} className="btn btn-sm btn-secondary">
                          <FaEdit />
                        </Link>
                        <Button variant="danger" size="sm" onClick={() => confirmDelete(contratacion.idContratacion)}>
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No hay contrataciones registradas
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <ConfirmDialog
        show={showConfirm}
        title="Confirmar eliminación"
        message="¿Está seguro que desea eliminar esta contratación? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default ContratacionesList;