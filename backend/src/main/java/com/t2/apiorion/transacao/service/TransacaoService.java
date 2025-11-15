package com.t2.apiorion.transacao.service;

import com.t2.apiorion.transacao.Transacao;
import com.t2.apiorion.transacao.TransacaoRepository;
import com.t2.apiorion.transacao.dto.TransacaoRequest;
import com.t2.apiorion.user.User;
import com.t2.apiorion.user.UserRepository;
import com.t2.apiorion.categoria.CategoriaRepository;
import com.t2.apiorion.tipoTransacao.TipoTransacaoRepository;
import com.t2.apiorion.transacao.StatusTransacao;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransacaoService {

    private final TransacaoRepository transacaoRepository;
    private final UserRepository userRepository;
    private final CategoriaRepository categoriaRepository;
    private final TipoTransacaoRepository tipoTransacaoRepository;

    public TransacaoService(TransacaoRepository transacaoRepository,
                            UserRepository userRepository,
                            CategoriaRepository categoriaRepository,
                            TipoTransacaoRepository tipoTransacaoRepository) {
        this.transacaoRepository = transacaoRepository;
        this.userRepository = userRepository;
        this.categoriaRepository = categoriaRepository;
        this.tipoTransacaoRepository = tipoTransacaoRepository;
    }

    @Transactional(readOnly = true)
    public List<Transacao> listarTransacoesPorUsuario(Long usuarioId) {
        if (!userRepository.existsById(usuarioId)) {
            throw new EntityNotFoundException("Usuário não encontrado");
        }

        return transacaoRepository.findByUsuarioId(usuarioId);
    }

    @Transactional
    public Transacao criarTransacao(TransacaoRequest request, User usuario) {
        StatusTransacao status = (request.getStatus() != null)
                ? StatusTransacao.valueOf(request.getStatus().toUpperCase())
                : StatusTransacao.PENDENTE;

        Transacao transacao = new Transacao();
        transacao.setDescricao(request.getDescricao());
        transacao.setValor(request.getValor());
        transacao.setDataVencimento(request.getDataVencimento());
        transacao.setQuantidadeParcelas(request.getQuantidadeParcelas());
        transacao.setStatus(status);
        transacao.setUsuario(usuario);

        transacao.setCategoria(categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada")));

        transacao.setTipoTransacao(tipoTransacaoRepository.findById(request.getTipoTransacaoId())
                .orElseThrow(() -> new EntityNotFoundException("Tipo de transação não encontrado")));

        return transacaoRepository.save(transacao);
    }

    @Transactional
    public Transacao atualizarTransacao(Long id, TransacaoRequest request) {
        Transacao transacao = transacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transação não encontrada"));

        transacao.setDescricao(request.getDescricao());
        transacao.setValor(request.getValor());
        transacao.setDataVencimento(request.getDataVencimento());
        transacao.setQuantidadeParcelas(request.getQuantidadeParcelas());
        transacao.setStatus(request.getStatus() != null
                ? StatusTransacao.valueOf(request.getStatus().toUpperCase())
                : transacao.getStatus());

        return transacaoRepository.save(transacao);
    }

    @Transactional
    public Transacao atualizarStatus(Long id, String novoStatus) {
        Transacao transacao = transacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transação não encontrada"));

        try {
            StatusTransacao statusEnum = StatusTransacao.valueOf(novoStatus.toUpperCase());
            transacao.setStatus(statusEnum);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Status inválido: " + novoStatus);
        }

        return transacaoRepository.save(transacao);
    }

    @Transactional
    public void deletarTransacao(Long id) {
        Transacao transacao = transacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transação não encontrada"));

        transacaoRepository.delete(transacao);
    }



}
