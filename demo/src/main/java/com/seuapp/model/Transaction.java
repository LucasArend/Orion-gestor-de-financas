package com.seuapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "type", nullable = false)
    private String type; // Ex: INCOME, EXPENSE

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    // Pode adicionar mais campos aqui, como a categoria da transação, o usuário, etc.
    // Por exemplo: @ManyToOne private User user;
}