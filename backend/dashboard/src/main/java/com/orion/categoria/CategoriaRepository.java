package com.orion.categoria;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    List<Categoria> findByUsuarioId(Long usuarioId);

    Optional<Categoria> findByNomeIgnoreCaseAndUsuarioId(String nome, Long usuarioId);
}
