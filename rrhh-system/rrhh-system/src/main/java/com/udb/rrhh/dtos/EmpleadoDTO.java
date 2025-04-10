package com.udb.rrhh.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpleadoDTO {

    private Long idEmpleado;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede exceder los 50 caracteres")
    private String nombreEmp;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 50, message = "El apellido no puede exceder los 50 caracteres")
    private String apellidoEmp;

    @Size(max = 50, message = "La dirección no puede exceder los 50 caracteres")
    private String direccion;

    @Size(max = 20, message = "El teléfono no puede exceder los 20 caracteres")
    private String telefono;

    @Email(message = "Debe proporcionar un email válido")
    @Size(max = 50, message = "El email no puede exceder los 50 caracteres")
    private String email;

    private Date fechaNacimiento;

    @Size(max = 50, message = "La representación no puede exceder los 50 caracteres")
    private String representacion;
}