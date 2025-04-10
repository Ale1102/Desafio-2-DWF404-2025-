package com.udb.rrhh.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "contrataciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contratacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idContratacion;

    @NotNull(message = "La fecha es obligatoria")
    @Temporal(TemporalType.DATE)
    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    private Departamento departamento;

    @ManyToOne
    @JoinColumn(name = "id_empleado")
    private Empleado empleado;

    @ManyToOne
    @JoinColumn(name = "id_cargo")
    private Cargo cargo;

    @ManyToOne
    @JoinColumn(name = "id_tipo_contratacion")
    private TipoContratacion tipoContratacion;

    @Column(name = "salario")
    private Double salario;

    @Column(name = "duracion")
    private Integer duracion;

    @Column(name = "estado")
    private Boolean estado;
}