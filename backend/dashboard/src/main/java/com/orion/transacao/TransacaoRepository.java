package com.orion.transacao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    // Busca todas as transações do usuário, exatamente como estão
    List<Transacao> findByUsuarioId(Long userId);
}
