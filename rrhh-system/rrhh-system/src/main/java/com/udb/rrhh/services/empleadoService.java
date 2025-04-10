package com.udb.rrhh.services;

import com.udb.rrhh.dtos.EmpleadoDTO;
import com.udb.rrhh.exceptions.ResourceNotFoundException;
import com.udb.rrhh.models.Empleado;
import com.udb.rrhh.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class empleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    public List<EmpleadoDTO> getAllEmpleados() {
        return empleadoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EmpleadoDTO getEmpleadoById(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));
        return convertToDTO(empleado);
    }

    public EmpleadoDTO createEmpleado(EmpleadoDTO empleadoDTO) {
        Empleado empleado = convertToEntity(empleadoDTO);
        Empleado savedEmpleado = empleadoRepository.save(empleado);
        return convertToDTO(savedEmpleado);
    }

    public EmpleadoDTO updateEmpleado(Long id, EmpleadoDTO empleadoDTO) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));

        empleado.setNombreEmp(empleadoDTO.getNombreEmp());
        empleado.setApellidoEmp(empleadoDTO.getApellidoEmp());
        empleado.setDireccion(empleadoDTO.getDireccion());
        empleado.setTelefono(empleadoDTO.getTelefono());
        empleado.setEmail(empleadoDTO.getEmail());
        empleado.setFechaNacimiento(empleadoDTO.getFechaNacimiento());
        empleado.setRepresentacion(empleadoDTO.getRepresentacion());

        Empleado updatedEmpleado = empleadoRepository.save(empleado);
        return convertToDTO(updatedEmpleado);
    }

    public void deleteEmpleado(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));
        empleadoRepository.delete(empleado);
    }

    public List<EmpleadoDTO> searchEmpleados(String query) {
        return empleadoRepository.findByNombreEmpContainingOrApellidoEmpContaining(query, query)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private EmpleadoDTO convertToDTO(Empleado empleado) {
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

    private Empleado convertToEntity(EmpleadoDTO dto) {
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
}