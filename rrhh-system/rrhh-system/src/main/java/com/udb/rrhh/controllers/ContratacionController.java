package com.udb.rrhh.controllers;

import com.udb.rrhh.dtos.ContratacionDTO;
import com.udb.rrhh.services.ContratacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/contrataciones")
@CrossOrigin(origins = "*")
public class ContratacionController {

    @Autowired
    private ContratacionService contratacionService;

    @GetMapping
    public ResponseEntity<List<ContratacionDTO>> getAllContrataciones() {
        return ResponseEntity.ok(contratacionService.getAllContrataciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContratacionDTO> getContratacionById(@PathVariable Long id) {
        return ResponseEntity.ok(contratacionService.getContratacionById(id));
    }

    @PostMapping
    public ResponseEntity<ContratacionDTO> createContratacion(@Valid @RequestBody ContratacionDTO contratacionDTO) {
        return new ResponseEntity<>(contratacionService.createContratacion(contratacionDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContratacionDTO> updateContratacion(@PathVariable Long id, @Valid @RequestBody ContratacionDTO contratacionDTO) {
        return ResponseEntity.ok(contratacionService.updateContratacion(id, contratacionDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContratacion(@PathVariable Long id) {
        contratacionService.deleteContratacion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/empleado/{idEmpleado}")
    public ResponseEntity<List<ContratacionDTO>> getContratacionesByEmpleado(@PathVariable Long idEmpleado) {
        return ResponseEntity.ok(contratacionService.getContratacionesByEmpleado(idEmpleado));
    }

    @GetMapping("/activas")
    public ResponseEntity<List<ContratacionDTO>> getContratacionesActivas() {
        return ResponseEntity.ok(contratacionService.getContratacionesActivas());
    }
}