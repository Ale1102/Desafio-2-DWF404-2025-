package com.udb.rrhh.utils;

import com.udb.rrhh.dtos.*;
import com.udb.rrhh.models.*;
import org.springframework.stereotype.Component;

@Component
public class EntityDtoMapper {

    // Mapeo de Cargo
    public CargoDTO mapToCargoDTO(Cargo cargo) {
        if (cargo == null) return null;

        CargoDTO dto = new CargoDTO();
        dto.setIdCargo(cargo.getIdCargo());
        dto.setCargo(cargo.getCargo());
        dto.setDescripcionCargo(cargo.getDescripcionCargo());
        return dto;
    }

    public Cargo mapToCargo(CargoDTO dto) {
        if (dto == null) return null;

        Cargo cargo = new Cargo();
        cargo.setIdCargo(dto.getIdCargo());
        cargo.setCargo(dto.getCargo());
        cargo.setDescripcionCargo(dto.getDescripcionCargo());
        return cargo;
    }

    // Mapeo de Departamento
    public DepartamentoDTO mapToDepartamentoDTO(Departamento departamento) {
        if (departamento == null) return null;

        DepartamentoDTO dto = new DepartamentoDTO();
        dto.setIdDepartamento(departamento.getIdDepartamento());
        dto.setNombreDepartamento(departamento.getNombreDepartamento());
        dto.setUbicacion(departamento.getUbicacion());
        dto.setDescripcionDepartamento(departamento.getDescripcionDepartamento());
        return dto;
    }

    public Departamento mapToDepartamento(DepartamentoDTO dto) {
        if (dto == null) return null;

        Departamento departamento = new Departamento();
        departamento.setIdDepartamento(dto.getIdDepartamento());
        departamento.setNombreDepartamento(dto.getNombreDepartamento());
        departamento.setUbicacion(dto.getUbicacion());
        departamento.setDescripcionDepartamento(dto.getDescripcionDepartamento());
        return departamento;
    }

    // Mapeo de Empleado
    public EmpleadoDTO mapToEmpleadoDTO(Empleado empleado) {
        if (empleado == null) return null;

        EmpleadoDTO dto = new EmpleadoDTO();
        dto.setIdEmpleado(empleado.getIdEmpleado());
        dto.setNombreEmp(empleado.getNombreEmp());
        dto.setApellidoEmp(empleado.getApellidoEmp());
        dto.setDireccion(empleado.getDireccion());
        dto.setTelefono(empleado.getTelefono());
        dto.setEmail(empleado.getEmail());
        dto.setFechaNacimiento(empleado.getFechaNacimiento());
        dto.setRepresentacion(empleado.getRepresentacion());
        return dto;
    }

    public Empleado mapToEmpleado(EmpleadoDTO dto) {
        if (dto == null) return null;

        Empleado empleado = new Empleado();
        empleado.setIdEmpleado(dto.getIdEmpleado());
        empleado.setNombreEmp(dto.getNombreEmp());
        empleado.setApellidoEmp(dto.getApellidoEmp());
        empleado.setDireccion(dto.getDireccion());
        empleado.setTelefono(dto.getTelefono());
        empleado.setEmail(dto.getEmail());
        empleado.setFechaNacimiento(dto.getFechaNacimiento());
        empleado.setRepresentacion(dto.getRepresentacion());
        return empleado;
    }

    // Mapeo de TipoContratacion
    public TipoContratacionDTO mapToTipoContratacionDTO(TipoContratacion tipoContratacion) {
        if (tipoContratacion == null) return null;

        TipoContratacionDTO dto = new TipoContratacionDTO();
        dto.setIdTipoContratacion(tipoContratacion.getIdTipoContratacion());
        dto.setTipoContratacion(tipoContratacion.getTipoContratacion());
        return dto;
    }

    public TipoContratacion mapToTipoContratacion(TipoContratacionDTO dto) {
        if (dto == null) return null;

        TipoContratacion tipoContratacion = new TipoContratacion();
        tipoContratacion.setIdTipoContratacion(dto.getIdTipoContratacion());
        tipoContratacion.setTipoContratacion(dto.getTipoContratacion());
        return tipoContratacion;
    }

    // Mapeo de Contratacion
    public ContratacionDTO mapToContratacionDTO(Contratacion contratacion) {
        if (contratacion == null) return null;

        ContratacionDTO dto = new ContratacionDTO();
        dto.setIdContratacion(contratacion.getIdContratacion());
        dto.setFecha(contratacion.getFecha());

        if (contratacion.getEmpleado() != null) {
            dto.setIdEmpleado(contratacion.getEmpleado().getIdEmpleado());
        }

        if (contratacion.getDepartamento() != null) {
            dto.setIdDepartamento(contratacion.getDepartamento().getIdDepartamento());
        }

        if (contratacion.getCargo() != null) {
            dto.setIdCargo(contratacion.getCargo().getIdCargo());
        }

        if (contratacion.getTipoContratacion() != null) {
            dto.setIdTipoContratacion(contratacion.getTipoContratacion().getIdTipoContratacion());
        }

        dto.setSalario(contratacion.getSalario());
        dto.setDuracion(contratacion.getDuracion());
        dto.setEstado(contratacion.getEstado());

        return dto;
    }
}
