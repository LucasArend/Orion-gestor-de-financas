package com.orion.categoria;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    // Retorna todas as categorias pertencentes a um usuário
    List<Categoria> findByUsuarioId(Long usuarioId);

    // Busca uma categoria específica por nome e usuário
    Categoria findByNomeIgnoreCaseAndUsuarioId(String nome, Long usuarioId);
}
