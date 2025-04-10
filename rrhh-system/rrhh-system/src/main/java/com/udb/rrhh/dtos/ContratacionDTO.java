package com.udb.rrhh.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContratacionDTO {

    private Long idContratacion;

    @NotNull(message = "La fecha es obligatoria")
    private Date fecha;

    @NotNull(message = "El departamento es obligatorio")
    private Long idDepartamento;

    @NotNull(message = "El empleado es obligatorio")
    private Long idEmpleado;

    @NotNull(message = "El cargo es obligatorio")
    private Long idCargo;

    @NotNull(message = "El tipo de contratación es obligatorio")
    private Long idTipoContratacion;

    private Double salario;

    private Integer duracion;

    private Boolean estado;
}