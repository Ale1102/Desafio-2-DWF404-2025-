package com.udb.rrhh.services;

import com.udb.rrhh.dtos.ContratacionDTO;
import com.udb.rrhh.exceptions.ResourceNotFoundException;
import com.udb.rrhh.models.*;
import com.udb.rrhh.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContratacionService {

    @Autowired
    private ContratacionRepository contratacionRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private TipoContratacionRepository tipoContratacionRepository;

    public List<ContratacionDTO> getAllContrataciones() {
        return contratacionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ContratacionDTO getContratacionById(Long id) {
        Contratacion contratacion = contratacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contratación no encontrada con id: " + id));
        return convertToDTO(contratacion);
    }

    public ContratacionDTO createContratacion(ContratacionDTO contratacionDTO) {
        Contratacion contratacion = convertToEntity(contratacionDTO);
        Contratacion savedContratacion = contratacionRepository.save(contratacion);
        return convertToDTO(savedContratacion);
    }

    public ContratacionDTO updateContratacion(Long id, ContratacionDTO contratacionDTO) {
        Contratacion contratacion = contratacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contratación no encontrada con id: " + id));

        Empleado empleado = empleadoRepository.findById(contratacionDTO.getIdEmpleado())
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + contratacionDTO.getIdEmpleado()));

        Departamento departamento = departamentoRepository.findById(contratacionDTO.getIdDepartamento())
                .orElseThrow(() -> new ResourceNotFoundException("Departamento no encontrado con id: " + contratacionDTO.getIdDepartamento()));

        Cargo cargo = cargoRepository.findById(contratacionDTO.getIdCargo())
                .orElseThrow(() -> new ResourceNotFoundException("Cargo no encontrado con id: " + contratacionDTO.getIdCargo()));

        TipoContratacion tipoContratacion = tipoContratacionRepository.findById(contratacionDTO.getIdTipoContratacion())
                .orElseThrow(() -> new ResourceNotFoundException("Tipo de contratación no encontrado con id: " + contratacionDTO.getIdTipoContratacion()));

        contratacion.setFecha(contratacionDTO.getFecha());
        contratacion.setEmpleado(empleado);
        contratacion.setDepartamento(departamento);
        contratacion.setCargo(cargo);
        contratacion.setTipoContratacion(tipoContratacion);
        contratacion.setSalario(contratacionDTO.getSalario());
        contratacion.setDuracion(contratacionDTO.getDuracion());
        contratacion.setEstado(contratacionDTO.getEstado());

        Contratacion updatedContratacion = contratacionRepository.save(contratacion);
        return convertToDTO(updatedContratacion);
    }

    public void deleteContratacion(Long id) {
        Contratacion contratacion = contratacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contratación no encontrada con id: " + id));
        contratacionRepository.delete(contratacion);
    }

    public List<ContratacionDTO> getContratacionesByEmpleado(Long idEmpleado) {
        Empleado empleado = empleadoRepository.findById(idEmpleado)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + idEmpleado));

        return contratacionRepository.findByEmpleado(empleado).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ContratacionDTO> getContratacionesActivas() {
        return contratacionRepository.findByEstadoTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ContratacionDTO convertToDTO(Contratacion contratacion) {
        ContratacionDTO dto = new ContratacionDTO();
        dto.setIdContratacion(contratacion.getIdContratacion());
        dto.setFecha(contratacion.getFecha());
        dto.setIdEmpleado(contratacion.getEmpleado().getIdEmpleado());
        dto.setIdDepartamento(contratacion.getDepartamento().getIdDepartamento());
        dto.setIdCargo(contratacion.getCargo().getIdCargo());
        dto.setIdTipoContratacion(contratacion.getTipoContratacion().getIdTipoContratacion());
        dto.setSalario(contratacion.getSalario());
        dto.setDuracion(contratacion.getDuracion());
        dto.setEstado(contratacion.getEstado());
        return dto;
    }

    private Contratacion convertToEntity(ContratacionDTO dto) {
        Contratacion contratacion = new Contratacion();
        contratacion.setIdContratacion(dto.getIdContratacion());
        contratacion.setFecha(dto.getFecha());

        Empleado empleado = empleadoRepository.findById(dto.getIdEmpleado())
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + dto.getIdEmpleado()));
        contratacion.setEmpleado(empleado);

        Departamento departamento = departamentoRepository.findById(dto.getIdDepartamento())
                .orElseThrow(() -> new ResourceNotFoundException("Departamento no encontrado con id: " + dto.getIdDepartamento()));
        contratacion.setDepartamento(departamento);

        Cargo cargo = cargoRepository.findById(dto.getIdCargo())
                .orElseThrow(() -> new ResourceNotFoundException("Cargo no encontrado con id: " + dto.getIdCargo()));
        contratacion.setCargo(cargo);

        TipoContratacion tipoContratacion = tipoContratacionRepository.findById(dto.getIdTipoContratacion())
                .orElseThrow(() -> new ResourceNotFoundException("Tipo de contratación no encontrado con id: " + dto.getIdTipoContratacion()));
        contratacion.setTipoContratacion(tipoContratacion);

        contratacion.setSalario(dto.getSalario());
        contratacion.setDuracion(dto.getDuracion());
        contratacion.setEstado(dto.getEstado());

        return contratacion;
    }
}