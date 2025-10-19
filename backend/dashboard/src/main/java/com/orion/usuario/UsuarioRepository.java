package com.orion.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Repositório básico para CRUD de usuário
    // Métodos customizados podem ser adicionados aqui se necessário
}
