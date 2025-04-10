package com.udb.rrhh.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "tipos_contratacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipoContratacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTipoContratacion;

    @NotBlank(message = "El tipo de contratación es obligatorio")
    @Size(max = 100, message = "El tipo de contratación no puede exceder los 100 caracteres")
    @Column(name = "tipo_contratacion")
    private String tipoContratacion;

    @OneToMany(mappedBy = "tipoContratacion", cascade = CascadeType.ALL)
    private List<Contratacion> contrataciones;
}