package com.udb.rrhh.repositories;

import com.udb.rrhh.models.TipoContratacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoContratacionRepository extends JpaRepository<TipoContratacion, Long> {

    TipoContratacion findByTipoContratacion(String tipoContratacion);
}