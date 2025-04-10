package com.udb.rrhh.controllers;

import com.udb.rrhh.dtos.EmpleadoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    @Autowired
    private com.udb.rrhh.services.empleadoService empleadoService;

    @GetMapping
    public ResponseEntity<List<EmpleadoDTO>> getAllEmpleados() {
        return ResponseEntity.ok(empleadoService.getAllEmpleados());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpleadoDTO> getEmpleadoById(@PathVariable Long id) {
        return ResponseEntity.ok(empleadoService.getEmpleadoById(id));
    }

    @PostMapping
    public ResponseEntity<EmpleadoDTO> createEmpleado(@Valid @RequestBody EmpleadoDTO empleadoDTO) {
        return new ResponseEntity<>(empleadoService.createEmpleado(empleadoDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpleadoDTO> updateEmpleado(@PathVariable Long id, @Valid @RequestBody EmpleadoDTO empleadoDTO) {
        return ResponseEntity.ok(empleadoService.updateEmpleado(id, empleadoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) {
        empleadoService.deleteEmpleado(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<EmpleadoDTO>> searchEmpleados(@RequestParam String query) {
        return ResponseEntity.ok(empleadoService.searchEmpleados(query));
    }
}