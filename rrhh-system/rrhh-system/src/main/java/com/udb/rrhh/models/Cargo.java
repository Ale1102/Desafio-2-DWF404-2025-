package com.udb.rrhh.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "cargos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cargo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCargo;

    @NotBlank(message = "El cargo es obligatorio")
    @Size(max = 50, message = "El cargo no puede exceder los 50 caracteres")
    private String cargo;

    @Column(name = "descripcion_cargo", columnDefinition = "TEXT")
    private String descripcionCargo;

    @OneToMany(mappedBy = "cargo", cascade = CascadeType.ALL)
    private List<Contratacion> contrataciones;
}