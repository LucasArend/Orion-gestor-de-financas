package com.orion.economia;

import com.orion.usuario.Usuario;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "economia")
public final class Economia {

    @Id
    @Column(name = "usuario_id")
    private Long usuarioId; // PK e FK

    @OneToOne
    @MapsId // O ID desta entidade é também a FK
    @JoinColumn(name = "usuario_id") // "referencedColumnName" é implícito
    private Usuario usuario;

    @Column(nullable = false)
    private BigDecimal saldo = BigDecimal.ZERO;

    @Column(name = "reserva_de_emergencia", nullable = false)
    private BigDecimal reservaDeEmergencia = BigDecimal.ZERO;

    @Column(name = "atualizado_em", updatable = false, insertable = false)
    private LocalDateTime atualizadoEm; // Controlado pelo banco (DEFAULT NOW())

    // Construtor padrão exigido pelo JPA
    protected Economia() {}

    // Apenas getters (somente leitura)
    public Long getUsuarioId() {
        return usuarioId;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public BigDecimal getReservaDeEmergencia() {
        return reservaDeEmergencia;
    }

    public LocalDateTime getAtualizadoEm() {
        return atualizadoEm;
    }
}
