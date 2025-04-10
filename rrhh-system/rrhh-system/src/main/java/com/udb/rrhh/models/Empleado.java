package com.udb.rrhh.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "empleados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmpleado;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede exceder los 50 caracteres")
    @Column(name = "nombre_emp")
    private String nombreEmp;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 50, message = "El apellido no puede exceder los 50 caracteres")
    @Column(name = "apellido_emp")
    private String apellidoEmp;

    @Size(max = 50, message = "La dirección no puede exceder los 50 caracteres")
    private String direccion;

    @Size(max = 20, message = "El teléfono no puede exceder los 20 caracteres")
    private String telefono;

    @Email(message = "Debe proporcionar un email válido")
    @Size(max = 50, message = "El email no puede exceder los 50 caracteres")
    private String email;

    @Column(name = "fecha_nacimiento")
    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;

    @Size(max = 50, message = "La representación no puede exceder los 50 caracteres")
    @Column(name = "representacion")
    private String representacion;

    @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL)
    private List<Contratacion> contrataciones;
}