package com.seuapp.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Data
public class BillRequest {

    @NotBlank(message = "A descrição é obrigatória.")
    private String description;

    @NotNull(message = "O valor é obrigatório.")
    @Positive(message = "O valor deve ser positivo.")
    private BigDecimal amount;

    @NotNull(message = "A data de vencimento é obrigatória.")
    private LocalDate dueDate;

    @NotBlank(message = "O status de pagamento é obrigatório (Ex: PENDENTE).")
    private String status;

    @NotBlank(message = "A forma de pagamento é obrigatória (Ex: BOLETO).")
    private String paymentMethod;
}