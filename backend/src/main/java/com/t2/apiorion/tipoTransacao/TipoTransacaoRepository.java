package com.t2.apiorion.tipoTransacao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoTransacaoRepository extends JpaRepository<TipoTransacao, Long> {
    Optional<TipoTransacao> findByNome(String nome);
}
