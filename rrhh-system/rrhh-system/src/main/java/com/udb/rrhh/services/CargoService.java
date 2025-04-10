package com.udb.rrhh.services;

import com.udb.rrhh.dtos.CargoDTO;
import com.udb.rrhh.exceptions.ResourceNotFoundException;
import com.udb.rrhh.models.Cargo;
import com.udb.rrhh.repositories.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    public List<CargoDTO> getAllCargos() {
        return cargoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CargoDTO getCargoById(Long id) {
        Cargo cargo = cargoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cargo no encontrado con id: " + id));
        return convertToDTO(cargo);
    }

    public CargoDTO createCargo(CargoDTO cargoDTO) {
        Cargo cargo = convertToEntity(cargoDTO);
        Cargo savedCargo = cargoRepository.save(cargo);
        return convertToDTO(savedCargo);
    }

    public CargoDTO updateCargo(Long id, CargoDTO cargoDTO) {
        Cargo cargo = cargoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cargo no encontrado con id: " + id));

        cargo.setCargo(cargoDTO.getCargo());
        cargo.setDescripcionCargo(cargoDTO.getDescripcionCargo());

        Cargo updatedCargo = cargoRepository.save(cargo);
        return convertToDTO(updatedCargo);
    }

    public void deleteCargo(Long id) {
        Cargo cargo = cargoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cargo no encontrado con id: " + id));
        cargoRepository.delete(cargo);
    }

    public List<CargoDTO> searchCargos(String query) {
        return cargoRepository.findByCargoContaining(query)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CargoDTO convertToDTO(Cargo cargo) {
        CargoDTO dto = new CargoDTO();
        dto.setIdCargo(cargo.getIdCargo());
        dto.setCargo(cargo.getCargo());
        dto.setDescripcionCargo(cargo.getDescripcionCargo());
        return dto;
    }

    private Cargo convertToEntity(CargoDTO dto) {
        Cargo cargo = new Cargo();
        cargo.setIdCargo(dto.getIdCargo());
        cargo.setCargo(dto.getCargo());
        cargo.setDescripcionCargo(dto.getDescripcionCargo());
        return cargo;
    }
}