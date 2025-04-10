// src/components/common/Loader.js
import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
};

export default Loader;