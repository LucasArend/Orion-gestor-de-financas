package com.t2.apiorion.goal;

import com.t2.apiorion.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    Optional<Goal> findByIdAndUserId(Long id, Long userId);
    List<Goal> findByUserId(Long userId);
    List<Goal> findByUser(User user);
}
