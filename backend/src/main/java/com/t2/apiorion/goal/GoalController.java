package com.t2.apiorion.goal;

import com.t2.apiorion.goal.dto.GoalRequest;
import com.t2.apiorion.goal.service.GoalService;
import com.t2.apiorion.user.User;
import com.t2.apiorion.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/goals")
public class GoalController {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final GoalService goalService;

    public GoalController(GoalRepository goalRepository, UserRepository userRepository, GoalService goalService) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
        this.goalService = goalService;
    }

    @PostMapping
    public ResponseEntity<?> createGoal(@Valid @RequestBody GoalRequest goalRequest,
                                        @AuthenticationPrincipal String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Goal goal = new Goal();
        goal.setObjective(goalRequest.getObjective());
        goal.setGoal(goalRequest.getGoal());
        goal.setSaved(goalRequest.getSaved());
        goal.setContribution(goalRequest.getContribution());
        goal.setExpectedData(goalRequest.getExpectedData());
        goal.setGoalDate(goalRequest.getGoalDate());
        goal.setUser(user);

        Goal savedGoal = goalRepository.save(goal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGoal);
    }

    @GetMapping
    public ResponseEntity<?> getGoals(@AuthenticationPrincipal String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return ResponseEntity.ok(goalRepository.findByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGoal(@PathVariable Long id,
                                     @AuthenticationPrincipal String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Optional<Goal> goalOpt = goalRepository.findById(id);
        if (goalOpt.isEmpty() || !goalOpt.get().getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Meta não encontrada ou não autorizada");
        }
        return ResponseEntity.ok(goalOpt.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGoal(@PathVariable Long id,
                                        @Valid @RequestBody GoalRequest goalRequest,
                                        @AuthenticationPrincipal String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

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
        goal.setGoalDate(goalRequest.getGoalDate());

        Goal updatedGoal = goalRepository.save(goal);
        return ResponseEntity.ok(updatedGoal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long id,
                                        @AuthenticationPrincipal String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Optional<Goal> goalOpt = goalRepository.findById(id);
        if (goalOpt.isEmpty() || !goalOpt.get().getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Meta não encontrada ou não autorizada");
        }

        goalRepository.delete(goalOpt.get());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{id}/contribute")
    public ResponseEntity<?> aplicarContribuicao(@PathVariable Long id,
                                                 @AuthenticationPrincipal String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Goal updatedGoal = goalService.aplicarContribuicao(user.getId(), id);

        return ResponseEntity.ok().body(updatedGoal);
    }
}
