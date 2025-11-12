package com.t2.apiorion.transacao.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.Instant;

public class TransacaoRequest {

    @NotBlank
    private String descricao;

    @NotNull
    @DecimalMin(value = "0.01", message = "Valor deve ser maior que zero")
    @Digits(integer = 13, fraction = 2)
    private BigDecimal valor;

    @NotNull
    private Instant dataVencimento;

    private Integer quantidadeParcelas;

    private String status;

    @NotNull
    private Long categoriaId;

    @NotNull
    private Long tipoTransacaoId;

    // Getters and Setters
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }

    public Instant getDataVencimento() { return dataVencimento; }
    public void setDataVencimento(Instant dataVencimento) { this.dataVencimento = dataVencimento; }

    public Integer getQuantidadeParcelas() { return quantidadeParcelas; }
    public void setQuantidadeParcelas(Integer quantidadeParcelas) { this.quantidadeParcelas = quantidadeParcelas; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getCategoriaId() { return categoriaId; }
    public void setCategoriaId(Long categoriaId) { this.categoriaId = categoriaId; }

    public Long getTipoTransacaoId() { return tipoTransacaoId; }
    public void setTipoTransacaoId(Long tipoTransacaoId) { this.tipoTransacaoId = tipoTransacaoId; }
}
