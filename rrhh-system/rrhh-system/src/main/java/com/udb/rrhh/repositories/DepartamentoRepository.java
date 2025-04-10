package com.udb.rrhh.repositories;

import com.udb.rrhh.models.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {

    List<Departamento> findByNombreDepartamentoContaining(String nombre);

    @Query("SELECT d FROM Departamento d WHERE SIZE(d.contrataciones) > 0")
    List<Departamento> findDepartamentosConEmpleados();
}