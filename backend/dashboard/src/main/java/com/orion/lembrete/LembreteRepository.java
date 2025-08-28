package com.orion.lembrete;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LembreteRepository extends JpaRepository<Lembrete, Long> {
    List<Lembrete> findByUsuarioIdOrderByDataAsc(Long userId);
}
