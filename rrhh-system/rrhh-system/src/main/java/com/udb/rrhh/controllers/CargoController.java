package com.udb.rrhh.controllers;

import com.udb.rrhh.dtos.CargoDTO;
import com.udb.rrhh.services.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/cargos")
@CrossOrigin(origins = "*")
public class CargoController {

    @Autowired
    private CargoService cargoService;

    @GetMapping
    public ResponseEntity<List<CargoDTO>> getAllCargos() {
        return ResponseEntity.ok(cargoService.getAllCargos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CargoDTO> getCargoById(@PathVariable Long id) {
        return ResponseEntity.ok(cargoService.getCargoById(id));
    }

    @PostMapping
    public ResponseEntity<CargoDTO> createCargo(@Valid @RequestBody CargoDTO cargoDTO) {
        return new ResponseEntity<>(cargoService.createCargo(cargoDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CargoDTO> updateCargo(@PathVariable Long id, @Valid @RequestBody CargoDTO cargoDTO) {
        return ResponseEntity.ok(cargoService.updateCargo(id, cargoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCargo(@PathVariable Long id) {
        cargoService.deleteCargo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<CargoDTO>> searchCargos(@RequestParam String query) {
        return ResponseEntity.ok(cargoService.searchCargos(query));
    }
}