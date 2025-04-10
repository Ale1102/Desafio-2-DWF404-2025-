package com.udb.rrhh.controllers;

import com.udb.rrhh.dtos.TipoContratacionDTO;
import com.udb.rrhh.services.TipoContratacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tipos-contratacion")
@CrossOrigin(origins = "*")
public class TipoContratacionController {

    @Autowired
    private TipoContratacionService tipoContratacionService;

    @GetMapping
    public ResponseEntity<List<TipoContratacionDTO>> getAllTiposContratacion() {
        return ResponseEntity.ok(tipoContratacionService.getAllTiposContratacion());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoContratacionDTO> getTipoContratacionById(@PathVariable Long id) {
        return ResponseEntity.ok(tipoContratacionService.getTipoContratacionById(id));
    }

    @PostMapping
    public ResponseEntity<TipoContratacionDTO> createTipoContratacion(@Valid @RequestBody TipoContratacionDTO tipoContratacionDTO) {
        return new ResponseEntity<>(tipoContratacionService.createTipoContratacion(tipoContratacionDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoContratacionDTO> updateTipoContratacion(@PathVariable Long id, @Valid @RequestBody TipoContratacionDTO tipoContratacionDTO) {
        return ResponseEntity.ok(tipoContratacionService.updateTipoContratacion(id, tipoContratacionDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoContratacion(@PathVariable Long id) {
        tipoContratacionService.deleteTipoContratacion(id);
        return ResponseEntity.noContent().build();
    }
}