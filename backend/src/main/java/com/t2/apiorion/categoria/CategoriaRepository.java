package com.t2.apiorion.categoria;

import com.t2.apiorion.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Optional<Categoria> findByNomeAndUsuarioId(String nome, Long usuarioId);

    Optional<Categoria> findByNome(String nome);

    Optional<Categoria> findByNomeAndUsuario(String nome, User usuario);

    Optional<Categoria> findByNomeAndUsuarioIsNull(String nome);

    List<Categoria> findByUsuario(User usuario);
}
