package com.t2.apiorion.goal.service;

import com.t2.apiorion.goal.Goal;
import com.t2.apiorion.goal.GoalRepository;
import com.t2.apiorion.goal.dto.GoalRequest;
import com.t2.apiorion.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalService(GoalRepository goalRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Goal criarMeta(Long userId, GoalRequest goalRequest) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Goal goal = new Goal();
        goal.setUser(user);
        goal.setObjective(goalRequest.getObjective());
        goal.setGoal(goalRequest.getGoal());
        goal.setSaved(BigDecimal.ZERO);
        goal.setContribution(goalRequest.getContribution());
        goal.setExpectedData(goalRequest.getExpectedData());
        goal.setGoalDate(goalRequest.getGoalDate()); // ✅ novo campo

        return goalRepository.save(goal);
    }

    @Transactional
    public Goal adicionarContribuicao(Long userId, Long goalId, BigDecimal valorContribuicao) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Meta não encontrada ou usuário não autorizado"));

        goal.addContribution(valorContribuicao);
        return goalRepository.save(goal);
    }
}
