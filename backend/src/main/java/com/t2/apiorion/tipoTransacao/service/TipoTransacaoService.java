package com.t2.apiorion.tipoTransacao.service;

import com.t2.apiorion.tipoTransacao.TipoTransacao;
import com.t2.apiorion.tipoTransacao.TipoTransacaoRepository;
import com.t2.apiorion.tipoTransacao.dto.TipoTransacaoRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
public class TipoTransacaoService {

    private final TipoTransacaoRepository tipoTransacaoRepository;

    public TipoTransacaoService(TipoTransacaoRepository tipoTransacaoRepository) {
        this.tipoTransacaoRepository = tipoTransacaoRepository;
    }

    /**
     * Cria um novo TipoTransacao
     */
    @Transactional
    public TipoTransacao criarTipoTransacao(TipoTransacaoRequest request) {
        TipoTransacao tipoTransacao = new TipoTransacao();
        tipoTransacao.setNome(request.getNome());

        // Campos de auditoria
        tipoTransacao.setCreatedAt(Instant.now());
        tipoTransacao.setUpdatedAt(Instant.now());

        return tipoTransacaoRepository.save(tipoTransacao);
    }

    /**
     * Retorna a quantidade de tipos de transação no banco
     */
    public long count() {
        return tipoTransacaoRepository.count();
    }

    /**
     * Procura TipoTransacao por nome
     */
    public Optional<TipoTransacao> findByNome(String nome) {
        return tipoTransacaoRepository.findAll()
                .stream()
                .filter(t -> t.getNome().equalsIgnoreCase(nome))
                .findFirst();
    }
}
