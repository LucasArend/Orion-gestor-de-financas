package com.orion.transacao;

import com.orion.usuario.Usuario;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transacoes")
public class Transacao {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false)
    @JoinColumn(name="usuario_id")
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false, length=10)
    private TipoTransacao tipo;

    @Column(nullable=false, length=80)
    private String categoria;

    @Column(length=150)
    private String descricao;

    @Column(nullable=false, precision=14, scale=2)
    private BigDecimal valor;

    @Column(nullable=false)
    private LocalDate data;

    // getters/setters
    public Long getId() { return id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public TipoTransacao getTipo() { return tipo; }
    public void setTipo(TipoTransacao tipo) { this.tipo = tipo; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
}
