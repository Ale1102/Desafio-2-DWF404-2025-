// src/components/cargos/CargosList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Form, InputGroup, Card } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { cargoService } from "../../services/api";
import Loader from "../common/Loader";
import ConfirmDialog from "../common/ConfirmDialog";

const CargosList = () => {
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [cargoToDelete, setCargoToDelete] = useState(null);

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      setLoading(true);
      const response = await cargoService.getAll();
      setCargos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar cargos:", error);
      toast.error("Error al cargar la lista de cargos");
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      fetchCargos();
      return;
    }

    try {
      setLoading(true);
      const response = await cargoService.search(searchTerm);
      setCargos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al buscar cargos:", error);
      toast.error("Error al buscar cargos");
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setCargoToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!cargoToDelete) return;

    try {
      await cargoService.delete(cargoToDelete);
      toast.success("Cargo eliminado correctamente");
      fetchCargos();
      setShowConfirm(false);
      setCargoToDelete(null);
    } catch (error) {
      console.error("Error al eliminar cargo:", error);
      toast.error("Error al eliminar el cargo");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Cargos</h2>
        <Link to="/cargos/new" className="btn btn-primary">
          <FaPlus className="me-2" /> Nuevo Cargo
        </Link>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="primary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cargo</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargos.length > 0 ? (
                cargos.map((cargo) => (
                  <tr key={cargo.idCargo}>
                    <td>{cargo.idCargo}</td>
                    <td>{cargo.cargo}</td>
                    <td>{cargo.descripcionCargo}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/cargos/edit/${cargo.idCargo}`} className="btn btn-sm btn-secondary">
                          <FaEdit />
                        </Link>
                        <Button variant="danger" size="sm" onClick={() => confirmDelete(cargo.idCargo)}>
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hay cargos registrados
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
        message="¿Está seguro que desea eliminar este cargo? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default CargosList;