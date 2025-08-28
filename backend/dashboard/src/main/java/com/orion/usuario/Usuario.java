package com.orion.usuario;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, length=120)
    private String nome;

    @Column(name="reserva_emergencia", nullable=false)
    private BigDecimal reservaEmergencia = BigDecimal.ZERO;

    // getters/setters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public BigDecimal getReservaEmergencia() { return reservaEmergencia; }
    public void setReservaEmergencia(BigDecimal r) { this.reservaEmergencia = r; }
}
