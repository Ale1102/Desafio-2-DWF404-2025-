package com.udb.rrhh.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartamentoDTO {

    private Long idDepartamento;

    @NotBlank(message = "El nombre del departamento es obligatorio")
    @Size(max = 50, message = "El nombre no puede exceder los 50 caracteres")
    private String nombreDepartamento;

    @Size(max = 50, message = "La ubicación no puede exceder los 50 caracteres")
    private String ubicacion;

    private String descripcionDepartamento;
}