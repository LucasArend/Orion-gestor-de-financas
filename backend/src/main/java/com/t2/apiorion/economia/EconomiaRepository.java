package com.t2.apiorion.economia;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EconomiaRepository extends JpaRepository<Economia, Long> {
    Optional<Economia> findByUsuarioId(Long usuarioId);
}
