package com.t2.apiorion.goal;

import com.t2.apiorion.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "goal")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    @Column(length = 255, nullable = false)
    private String objective;

    @NotNull
    @DecimalMin(value = "0.01", message = "Goal value must be greater than zero")
    @Digits(integer = 10, fraction = 2, message = "Goal value must have two decimal places")
    private BigDecimal goal;

    @NotNull
    @DecimalMin(value = "0.00", message = "Saved value cannot be less than zero")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal saved = BigDecimal.ZERO;

    private Instant data;

    private LocalDate expectedData;

    private LocalDate dataForecast;

    @NotNull
    @DecimalMin(value = "0.00", message = "Contribution must be greater than zero")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal contribution = BigDecimal.ZERO;

    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    public void prePersist() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getObjective() { return objective; }
    public void setObjective(String objective) { this.objective = objective; }

    public BigDecimal getGoal() { return goal; }
    public void setGoal(BigDecimal goal) { this.goal = goal; }

    public BigDecimal getSaved() { return saved; }
    public void setSaved(BigDecimal saved) { this.saved = saved; }

    public Instant getData() { return data; }
    public void setData(Instant data) { this.data = data; }

    public LocalDate getExpectedData() { return expectedData; }
    public void setExpectedData(LocalDate expectedData) { this.expectedData = expectedData; }

    public LocalDate getDataForecast() { return dataForecast; }
    public void setDataForecast(LocalDate dataForecast) { this.dataForecast = dataForecast; }

    public BigDecimal getContribution() { return contribution; }
    public void setContribution(BigDecimal contribution) { this.contribution = contribution; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    // Metodo que incrementa o valor salvo
    public void addContribution(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) > 0) {
            this.saved = this.saved.add(amount);
        } else {
            throw new IllegalArgumentException("Contribuição precisa ser maior que zero");
        }
    }

    // Metodo para verificar se a meta foi atingida
    public boolean isGoalAchieved() {
        return this.saved.compareTo(this.goal) >= 0;
    }
}
