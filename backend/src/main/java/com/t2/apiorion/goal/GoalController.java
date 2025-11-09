package com.t2.apiorion.goal;

import com.t2.apiorion.goal.dto.GoalRequest;
import com.t2.apiorion.user.User;
import com.t2.apiorion.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/goals")
public class GoalController {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalController(GoalRepository goalRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    // Criar nova meta
    @PostMapping
    public ResponseEntity<?> createGoal(@Valid @RequestBody GoalRequest goalRequest,
                                        @AuthenticationPrincipal User user) {
        Goal goal = new Goal();
        goal.setObjective(goalRequest.getObjective());
        goal.setGoal(goalRequest.getGoal());
        goal.setSaved(goalRequest.getSaved());
        goal.setContribution(goalRequest.getContribution());
        goal.setExpectedData(goalRequest.getExpectedData());
        goal.setGoalDate(goalRequest.getGoalDate()); // ✅ novo campo
        goal.setUser(user);

        Goal savedGoal = goalRepository.save(goal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGoal);
    }

    // Buscar todas as metas do usuário autenticado
    @GetMapping
    public ResponseEntity<?> getGoals(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(goalRepository.findByUser(user));
    }

    // Buscar uma meta específica
    @GetMapping("/{id}")
    public ResponseEntity<?> getGoal(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Optional<Goal> goalOpt = goalRepository.findById(id);
        if (goalOpt.isEmpty() || !goalOpt.get().getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Meta não encontrada ou não autorizada");
        }
        return ResponseEntity.ok(goalOpt.get());
    }

    // Atualizar uma meta
    @PutMapping("/{id}")
    public ResponseEntity<?> updateGoal(@PathVariable Long id,
                                        @Valid @RequestBody GoalRequest goalRequest,
                                        @AuthenticationPrincipal User user) {
        Optional<Goal> goalOpt = goalRepository.findById(id);
        if (goalOpt.isEmpty() || !goalOpt.get().getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Meta não encontrada ou não autorizada");
        }

        Goal goal = goalOpt.get();
        goal.setObjective(goalRequest.getObjective());
        goal.setGoal(goalRequest.getGoal());
        goal.setSaved(goalRequest.getSaved());
        goal.setContribution(goalRequest.getContribution());
        goal.setExpectedData(goalRequest.getExpectedData());
        goal.setGoalDate(goalRequest.getGoalDate()); // ✅ novo campo

        Goal updatedGoal = goalRepository.save(goal);
        return ResponseEntity.ok(updatedGoal);
    }

    // Deletar uma meta
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Optional<Goal> goalOpt = goalRepository.findById(id);
        if (goalOpt.isEmpty() || !goalOpt.get().getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Meta não encontrada ou não autorizada");
        }

        goalRepository.delete(goalOpt.get());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
