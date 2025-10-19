package com.orion.tipoTransacao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoTransacaoRepository extends JpaRepository<TipoTransacao, Long> {
    List<TipoTransacao> findByNomeIgnoreCase(String nome);
}
