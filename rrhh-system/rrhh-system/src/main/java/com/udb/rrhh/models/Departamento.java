package com.udb.rrhh.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "departamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDepartamento;

    @NotBlank(message = "El nombre del departamento es obligatorio")
    @Size(max = 50, message = "El nombre no puede exceder los 50 caracteres")
    @Column(name = "nombre_departamento")
    private String nombreDepartamento;

    @Size(max = 50, message = "La ubicación no puede exceder los 50 caracteres")
    @Column(name = "ubicacion")
    private String ubicacion;

    @Column(name = "descripcion_departamento", columnDefinition = "TEXT")
    private String descripcionDepartamento;

    @OneToMany(mappedBy = "departamento", cascade = CascadeType.ALL)
    private List<Contratacion> contrataciones;
}