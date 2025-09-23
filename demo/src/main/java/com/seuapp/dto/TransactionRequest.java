package com.seuapp.dto;

import lombok.Data;
import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Data
public class TransactionRequest {

    @NotBlank(message = "A descrição é obrigatória.")
    private String description;

    @NotNull(message = "O valor é obrigatório.")
    @Positive(message = "O valor deve ser positivo.")
    private BigDecimal amount;

    @NotBlank(message = "O tipo da transação é obrigatório.")
    private String type;
}