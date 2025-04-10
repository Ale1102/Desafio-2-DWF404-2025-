package com.udb.rrhh.services;

import com.udb.rrhh.dtos.DepartamentoDTO;
import com.udb.rrhh.exceptions.ResourceNotFoundException;
import com.udb.rrhh.models.Departamento;
import com.udb.rrhh.repositories.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    public List<DepartamentoDTO> getAllDepartamentos() {
        return departamentoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DepartamentoDTO getDepartamentoById(Long id) {
        Departamento departamento = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Departamento no encontrado con id: " + id));
        return convertToDTO(departamento);
    }

    public DepartamentoDTO createDepartamento(DepartamentoDTO departamentoDTO) {
        Departamento departamento = convertToEntity(departamentoDTO);
        Departamento savedDepartamento = departamentoRepository.save(departamento);
        return convertToDTO(savedDepartamento);
    }

    public DepartamentoDTO updateDepartamento(Long id, DepartamentoDTO departamentoDTO) {
        Departamento departamento = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Departamento no encontrado con id: " + id));

        departamento.setNombreDepartamento(departamentoDTO.getNombreDepartamento());
        departamento.setUbicacion(departamentoDTO.getUbicacion());
        departamento.setDescripcionDepartamento(departamentoDTO.getDescripcionDepartamento());

        Departamento updatedDepartamento = departamentoRepository.save(departamento);
        return convertToDTO(updatedDepartamento);
    }

    public void deleteDepartamento(Long id) {
        Departamento departamento = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Departamento no encontrado con id: " + id));
        departamentoRepository.delete(departamento);
    }

    public List<DepartamentoDTO> searchDepartamentos(String query) {
        return departamentoRepository.findByNombreDepartamentoContaining(query)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private DepartamentoDTO convertToDTO(Departamento departamento) {
        DepartamentoDTO dto = new DepartamentoDTO();
        dto.setIdDepartamento(departamento.getIdDepartamento());
        dto.setNombreDepartamento(departamento.getNombreDepartamento());
        dto.setUbicacion(departamento.getUbicacion());
        dto.setDescripcionDepartamento(departamento.getDescripcionDepartamento());
        return dto;
    }

    private Departamento convertToEntity(DepartamentoDTO dto) {
        Departamento departamento = new Departamento();
        departamento.setIdDepartamento(dto.getIdDepartamento());
        departamento.setNombreDepartamento(dto.getNombreDepartamento());
        departamento.setUbicacion(dto.getUbicacion());
        departamento.setDescripcionDepartamento(dto.getDescripcionDepartamento());
        return departamento;
    }
}