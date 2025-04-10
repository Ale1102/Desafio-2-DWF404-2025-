package com.udb.rrhh.repositories;

import com.udb.rrhh.models.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    List<Empleado> findByNombreEmpContainingOrApellidoEmpContaining(String nombre, String apellido);

    @Query("SELECT e FROM Empleado e WHERE NOT EXISTS (SELECT c FROM Contratacion c WHERE c.empleado = e AND c.estado = true)")
    List<Empleado> findEmpleadosSinContratacionActiva();
}