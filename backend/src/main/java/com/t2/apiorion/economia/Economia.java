package com.t2.apiorion.economia;

import com.t2.apiorion.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "economia")
public class Economia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    @NotNull
    @Digits(integer = 13, fraction = 2)
    private BigDecimal saldo = BigDecimal.ZERO;

    @NotNull
    @Digits(integer = 13, fraction = 2)
    private BigDecimal reservaDeEmergencia = BigDecimal.ZERO;

    private Instant updatedAt;

    @PrePersist
    public void prePersist() {
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUsuario() { return usuario; }
    public void setUsuario(User usuario) { this.usuario = usuario; }

    public BigDecimal getSaldo() { return saldo; }
    public void setSaldo(BigDecimal saldo) { this.saldo = saldo; }

    public BigDecimal getReservaDeEmergencia() { return reservaDeEmergencia; }
    public void setReservaDeEmergencia(BigDecimal reservaDeEmergencia) { this.reservaDeEmergencia = reservaDeEmergencia; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
