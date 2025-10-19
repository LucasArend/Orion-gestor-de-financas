package com.orion.meta;

import com.orion.usuario.Usuario;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "goal")
public class Meta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK para usuario.id
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private Usuario usuario;

    @Column(name = "objective", nullable = false, length = 255)
    private String descricao;

    @Column(name = "goal", nullable = false, precision = 12, scale = 2)
    private BigDecimal valorAlvo;

    @Column(name = "saved", nullable = false, precision = 12, scale = 2)
    private BigDecimal progresso = BigDecimal.ZERO;

    @Column(name = "data")
    private LocalDateTime dataInicio;

    @Column(name = "expected_data")
    private LocalDate dataEsperada;

    @Column(name = "data_forecast")
    private LocalDate dataPrevista;

    @Column(name = "contribution", nullable = false, precision = 12, scale = 2)
    private BigDecimal aporteMensal;

    // ===== Getters e Setters =====
    public Long getId() { return id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public BigDecimal getValorAlvo() { return valorAlvo; }
    public void setValorAlvo(BigDecimal valorAlvo) { this.valorAlvo = valorAlvo; }
    public BigDecimal getProgresso() { return progresso; }
    public void setProgresso(BigDecimal progresso) { this.progresso = progresso; }
    public LocalDateTime getDataInicio() { return dataInicio; }
    public void setDataInicio(LocalDateTime dataInicio) { this.dataInicio = dataInicio; }
    public LocalDate getDataEsperada() { return dataEsperada; }
    public void setDataEsperada(LocalDate dataEsperada) { this.dataEsperada = dataEsperada; }
    public LocalDate getDataPrevista() { return dataPrevista; }
    public void setDataPrevista(LocalDate dataPrevista) { this.dataPrevista = dataPrevista; }
    public BigDecimal getAporteMensal() { return aporteMensal; }
    public void setAporteMensal(BigDecimal aporteMensal) { this.aporteMensal = aporteMensal; }
}
