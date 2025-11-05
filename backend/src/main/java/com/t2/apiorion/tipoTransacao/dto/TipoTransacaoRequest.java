package com.t2.apiorion.tipoTransacao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TipoTransacaoRequest {

    @NotBlank
    @Size(max = 50)
    private String nome;

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }


}
