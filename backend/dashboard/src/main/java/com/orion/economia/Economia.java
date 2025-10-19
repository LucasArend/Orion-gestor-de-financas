package com.orion.economia;

import com.orion.usuario.Usuario;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "economia")
public class Economia {

    @Id
    @Column(name = "usuario_id")
    private Long usuarioId; // PK e FK

    @OneToOne
    @MapsId // Indica que o ID desta entidade é também a FK
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    @Column(nullable = false)
    private BigDecimal saldo = BigDecimal.ZERO;

    @Column(name = "reserva_de_emergencia", nullable = false)
    private BigDecimal reservaDeEmergencia = BigDecimal.ZERO;

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm = LocalDateTime.now();

    // Getters e Setters
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public BigDecimal getReservaDeEmergencia() {
        return reservaDeEmergencia;
    }

    public void setReservaDeEmergencia(BigDecimal reservaDeEmergencia) {
        this.reservaDeEmergencia = reservaDeEmergencia;
    }

    public LocalDateTime getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(LocalDateTime atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }
}
