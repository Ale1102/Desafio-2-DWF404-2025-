package com.udb.rrhh.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipoContratacionDTO {

    private Long idTipoContratacion;

    @NotBlank(message = "El tipo de contratación es obligatorio")
    @Size(max = 100, message = "El tipo de contratación no puede exceder los 100 caracteres")
    private String tipoContratacion;
}