package com.t2.apiorion.transacao.dto;

import jakarta.validation.constraints.NotBlank;

public class AtualizarStatusRequest {

    @NotBlank
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
