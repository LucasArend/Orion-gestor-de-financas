package com.t2.apiorion.tipoTransacao.service;

import com.t2.apiorion.tipoTransacao.TipoTransacao;
import com.t2.apiorion.tipoTransacao.TipoTransacaoRepository;
import com.t2.apiorion.tipoTransacao.dto.TipoTransacaoRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class TipoTransacaoService {

    private final TipoTransacaoRepository tipoTransacaoRepository;

    public TipoTransacaoService(TipoTransacaoRepository tipoTransacaoRepository) {
        this.tipoTransacaoRepository = tipoTransacaoRepository;
    }

    @Transactional
    public TipoTransacao criarTipoTransacao(TipoTransacaoRequest request) {
        TipoTransacao tipoTransacao = new TipoTransacao();
        tipoTransacao.setNome(request.getNome());

        // Campos de auditoria
        tipoTransacao.setCreatedAt(Instant.now());
        tipoTransacao.setUpdatedAt(Instant.now());

        return tipoTransacaoRepository.save(tipoTransacao);
    }
}
