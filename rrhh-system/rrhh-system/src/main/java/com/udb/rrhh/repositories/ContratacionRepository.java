package com.udb.rrhh.repositories;

import com.udb.rrhh.models.Contratacion;
import com.udb.rrhh.models.Departamento;
import com.udb.rrhh.models.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ContratacionRepository extends JpaRepository<Contratacion, Long> {

    List<Contratacion> findByEmpleado(Empleado empleado);

    List<Contratacion> findByDepartamento(Departamento departamento);

    List<Contratacion> findByEstadoTrue();

    @Query("SELECT c FROM Contratacion c WHERE c.fecha BETWEEN :fechaInicio AND :fechaFin")
    List<Contratacion> findContratacionesPorRangoDeFechas(
            @Param("fechaInicio") Date fechaInicio,
            @Param("fechaFin") Date fechaFin);
}