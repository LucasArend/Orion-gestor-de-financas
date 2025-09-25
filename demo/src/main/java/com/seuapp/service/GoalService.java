package com.seuapp.service;

import com.seuapp.dto.GoalRequest;
import com.seuapp.model.Goal;
import com.seuapp.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    // Você pode injetar o TransactionRepository aqui para futuras consultas
    // @Autowired
    // private TransactionRepository transactionRepository;

    public Goal createGoal(GoalRequest request) {
        Goal goal = new Goal();
        goal.setName(request.getName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setDeadline(request.getDeadline());
        goal.setCreatedAt(LocalDateTime.now());

        // Inicializa o progresso com zero. A lógica de cálculo virá depois.
        goal.setCurrentAmount(BigDecimal.ZERO);

        return goalRepository.save(goal);
    }

    // Futuramente: public BigDecimal calculateProgress(Goal goal) { ... }
}
