package com.seuapp.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Data
public class GoalRequest {

    @NotBlank(message = "O nome da meta é obrigatório.")
    private String name;

    @NotNull(message = "O valor alvo é obrigatório.")
    @Positive(message = "O valor alvo deve ser positivo.")
    private BigDecimal targetAmount;

    @NotNull(message = "O prazo final é obrigatório.")
    private LocalDate deadline;
}
