package com.seuapp.repository;

import com.seuapp.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    // Métodos de busca personalizados podem ser adicionados aqui
}
