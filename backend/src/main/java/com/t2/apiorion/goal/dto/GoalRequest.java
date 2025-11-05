package com.t2.apiorion.goal.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public class GoalRequest {

    @NotBlank(message = "Objective is required")
    private String objective;

    @NotNull(message = "Goal value is required")
    @DecimalMin(value = "0.01", message = "Goal value must be greater than zero")
    @Digits(integer = 10, fraction = 2, message = "Goal value must have up to two decimal places")
    private BigDecimal goal;

    @NotNull(message = "Saved value is required")
    @DecimalMin(value = "0.00", message = "Saved value cannot be less than zero")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal saved = BigDecimal.ZERO;

    @NotNull(message = "Contribution is required")
    @DecimalMin(value = "0.00", message = "Contribution must be greater than zero")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal contribution = BigDecimal.ZERO;

    private LocalDate expectedData;

    // Getters and Setters

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public BigDecimal getGoal() {
        return goal;
    }

    public void setGoal(BigDecimal goal) {
        this.goal = goal;
    }

    public BigDecimal getSaved() {
        return saved;
    }

    public void setSaved(BigDecimal saved) {
        this.saved = saved;
    }

    public BigDecimal getContribution() {
        return contribution;
    }

    public void setContribution(BigDecimal contribution) {
        this.contribution = contribution;
    }

    public LocalDate getExpectedData() {
        return expectedData;
    }

    public void setExpectedData(LocalDate expectedData) {
        this.expectedData = expectedData;
    }
}
