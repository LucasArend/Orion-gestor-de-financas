package com.t2.apiorion.categoria;

import com.t2.apiorion.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    // Busca uma categoria pelo nome e pelo ID do usuário
    Optional<Categoria> findByNomeAndUsuarioId(String nome, Long usuarioId);

    // Busca uma categoria apenas pelo nome
    Optional<Categoria> findByNome(String nome);

    // Busca uma categoria pelo nome e objeto do usuário
    Optional<Categoria> findByNomeAndUsuario(String nome, User usuario);

    // Busca uma categoria global (sem usuário vinculado)
    Optional<Categoria> findByNomeAndUsuarioIsNull(String nome);

    // Lista todas as categorias de um usuário específico
    List<Categoria> findByUsuario(User usuario);
}
