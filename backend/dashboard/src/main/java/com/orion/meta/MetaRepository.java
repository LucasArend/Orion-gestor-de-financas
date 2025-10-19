package com.orion.meta;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MetaRepository extends JpaRepository<Meta, Long> {
    // Retorna todas as metas pertencentes a um usuário
    List<Meta> findByUsuarioId(Long usuarioId);
}
