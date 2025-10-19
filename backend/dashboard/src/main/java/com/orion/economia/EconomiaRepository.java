package com.orion.economia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EconomiaRepository extends JpaRepository<Economia, Long> {
    Optional<Economia> findByUsuarioId(Long usuarioId);
}
