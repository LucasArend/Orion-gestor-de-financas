package com.t2.apiorion.transacao.service;

import com.t2.apiorion.transacao.Transacao;
import com.t2.apiorion.transacao.TransacaoRepository;
import com.t2.apiorion.transacao.dto.TransacaoRequest;
import com.t2.apiorion.user.UserRepository;
import com.t2.apiorion.categoria.CategoriaRepository;
import com.t2.apiorion.tipoTransacao.TipoTransacaoRepository;
import com.t2.apiorion.transacao.StatusTransacao;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public Transacao criarTransacao(TransacaoRequest request) {
        // Definir o status da transação com valor padrão "pendente" caso o status seja nulo
        StatusTransacao status = (request.getStatus() != null) ? StatusTransacao.valueOf(request.getStatus()) : StatusTransacao.PENDENTE;

        // Criar e configurar a transação
        Transacao transacao = new Transacao();
        transacao.setDescricao(request.getDescricao());
        transacao.setValor(request.getValor());
        transacao.setDataVencimento(request.getDataVencimento());
        transacao.setQuantidadeParcelas(request.getQuantidadeParcelas());
        transacao.setStatus(status);

        // Buscar e associar o usuário ao qual a transação pertence
        transacao.setUsuario(userRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado")));

        // Buscar e associar a categoria à transação
        transacao.setCategoria(categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada")));

        // Buscar e associar o tipo de transação
        transacao.setTipoTransacao(tipoTransacaoRepository.findById(request.getTipoTransacaoId())
                .orElseThrow(() -> new EntityNotFoundException("Tipo de transação não encontrado")));

        // Salvar e retornar a transação
        return transacaoRepository.save(transacao);
    }

    @Transactional
    public Transacao atualizarTransacao(Long id, TransacaoRequest request) {
        // Buscar a transação existente
        Transacao transacao = transacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transação não encontrada"));

        // Atualizar as informações da transação
        transacao.setDescricao(request.getDescricao());
        transacao.setValor(request.getValor());
        transacao.setDataVencimento(request.getDataVencimento());
        transacao.setQuantidadeParcelas(request.getQuantidadeParcelas());
        transacao.setStatus(request.getStatus() != null ? StatusTransacao.valueOf(request.getStatus()) : transacao.getStatus());

        // Atualizar e salvar a transação
        return transacaoRepository.save(transacao);
    }

    @Transactional
    public void deletarTransacao(Long id) {
        // Buscar a transação para exclusão
        Transacao transacao = transacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transação não encontrada"));

        // Excluir a transação
        transacaoRepository.delete(transacao);
    }
}
