package com.udb.rrhh.controllers;

import com.udb.rrhh.dtos.DepartamentoDTO;
import com.udb.rrhh.services.DepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/departamentos")
@CrossOrigin(origins = "*")
public class DepartamentoController {

    @Autowired
    private DepartamentoService departamentoService;

    @GetMapping
    public ResponseEntity<List<DepartamentoDTO>> getAllDepartamentos() {
        return ResponseEntity.ok(departamentoService.getAllDepartamentos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartamentoDTO> getDepartamentoById(@PathVariable Long id) {
        return ResponseEntity.ok(departamentoService.getDepartamentoById(id));
    }

    @PostMapping
    public ResponseEntity<DepartamentoDTO> createDepartamento(@Valid @RequestBody DepartamentoDTO departamentoDTO) {
        return new ResponseEntity<>(departamentoService.createDepartamento(departamentoDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartamentoDTO> updateDepartamento(@PathVariable Long id, @Valid @RequestBody DepartamentoDTO departamentoDTO) {
        return ResponseEntity.ok(departamentoService.updateDepartamento(id, departamentoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartamento(@PathVariable Long id) {
        departamentoService.deleteDepartamento(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<DepartamentoDTO>> searchDepartamentos(@RequestParam String query) {
        return ResponseEntity.ok(departamentoService.searchDepartamentos(query));
    }
}