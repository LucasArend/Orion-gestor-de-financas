package com.orion.meta;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MetaRepository extends JpaRepository<Meta, Long> {
    List<Meta> findByUsuarioId(Long userId);
}
