package com.orion.meta;

import com.orion.usuario.Usuario;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "metas")
public class Meta {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false)
    @JoinColumn(name="usuario_id")
    private Usuario usuario;

    @Column(nullable=false, length=140)
    private String descricao;

    @Column(nullable=false, precision=14, scale=2)
    private BigDecimal valorAlvo;

    @Column(nullable=false, precision=14, scale=2)
    private BigDecimal progresso = BigDecimal.ZERO;

    // getters/setters
    public Long getId() { return id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public BigDecimal getValorAlvo() { return valorAlvo; }
    public void setValorAlvo(BigDecimal valorAlvo) { this.valorAlvo = valorAlvo; }
    public BigDecimal getProgresso() { return progresso; }
    public void setProgresso(BigDecimal progresso) { this.progresso = progresso; }
}
