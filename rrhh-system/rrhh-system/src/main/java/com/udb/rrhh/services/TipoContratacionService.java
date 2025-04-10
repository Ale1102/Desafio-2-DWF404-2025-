package com.udb.rrhh.services;

import com.udb.rrhh.dtos.TipoContratacionDTO;
import com.udb.rrhh.exceptions.ResourceNotFoundException;
import com.udb.rrhh.models.TipoContratacion;
import com.udb.rrhh.repositories.TipoContratacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TipoContratacionService {

    @Autowired
    private TipoContratacionRepository tipoContratacionRepository;

    public List<TipoContratacionDTO> getAllTiposContratacion() {
        return tipoContratacionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TipoContratacionDTO getTipoContratacionById(Long id) {
        TipoContratacion tipoContratacion = tipoContratacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tipo de contratación no encontrado con id: " + id));
        return convertToDTO(tipoContratacion);
    }

    public TipoContratacionDTO createTipoContratacion(TipoContratacionDTO tipoContratacionDTO) {
        TipoContratacion tipoContratacion = convertToEntity(tipoContratacionDTO);
        TipoContratacion savedTipoContratacion = tipoContratacionRepository.save(tipoContratacion);
        return convertToDTO(savedTipoContratacion);
    }

    public TipoContratacionDTO updateTipoContratacion(Long id, TipoContratacionDTO tipoContratacionDTO) {
        TipoContratacion tipoContratacion = tipoContratacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tipo de contratación no encontrado con id: " + id));

        tipoContratacion.setTipoContratacion(tipoContratacionDTO.getTipoContratacion());

        TipoContratacion updatedTipoContratacion = tipoContratacionRepository.save(tipoContratacion);
        return convertToDTO(updatedTipoContratacion);
    }

    public void deleteTipoContratacion(Long id) {
        TipoContratacion tipoContratacion = tipoContratacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tipo de contratación no encontrado con id: " + id));
        tipoContratacionRepository.delete(tipoContratacion);
    }

    private TipoContratacionDTO convertToDTO(TipoContratacion tipoContratacion) {
        TipoContratacionDTO dto = new TipoContratacionDTO();
        dto.setIdTipoContratacion(tipoContratacion.getIdTipoContratacion());
        dto.setTipoContratacion(tipoContratacion.getTipoContratacion());
        return dto;
    }

    private TipoContratacion convertToEntity(TipoContratacionDTO dto) {
        TipoContratacion tipoContratacion = new TipoContratacion();
        tipoContratacion.setIdTipoContratacion(dto.getIdTipoContratacion());
        tipoContratacion.setTipoContratacion(dto.getTipoContratacion());
        return tipoContratacion;
    }
}