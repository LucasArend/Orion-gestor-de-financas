package com.t2.apiorion.transacao;

import com.t2.apiorion.transacao.dto.TransacaoRequest;
import com.t2.apiorion.transacao.service.TransacaoService;
import com.t2.apiorion.user.User;
import com.t2.apiorion.user.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
@Tag(name = "Transações", description = "API para gerenciar transações")
public class TransacaoController {

    private final TransacaoService transacaoService;
    private final UserRepository userRepository;
    private final TransacaoRepository transacaoRepository;

    public TransacaoController(TransacaoService transacaoService,
                               UserRepository userRepository,
                               TransacaoRepository transacaoRepository) {
        this.transacaoService = transacaoService;
        this.userRepository = userRepository;
        this.transacaoRepository = transacaoRepository;
    }

    @PostMapping
    @Operation(summary = "Cria uma nova transação para o usuário logado")
    public ResponseEntity<Transacao> criarTransacao(
            @Valid @RequestBody TransacaoRequest request,
            @AuthenticationPrincipal String username) {

        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        request.setUsuarioId(usuario.getId());
        Transacao transacao = transacaoService.criarTransacao(request);
        return ResponseEntity.ok(transacao);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma transação do usuário logado")
    public ResponseEntity<Transacao> atualizarTransacao(
            @PathVariable Long id,
            @Valid @RequestBody TransacaoRequest request,
            @AuthenticationPrincipal String username) {

        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        Transacao transacao = transacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transação não encontrada"));

        if (!transacao.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(403).build();
        }

        Transacao updated = transacaoService.atualizarTransacao(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma transação do usuário logado")
    public ResponseEntity<Void> deletarTransacao(
            @PathVariable Long id,
            @AuthenticationPrincipal String username) {

        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        Transacao transacao = transacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transação não encontrada"));

        if (!transacao.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(403).build();
        }

        transacaoService.deletarTransacao(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    @Operation(summary = "Lista todas as transações do usuário logado")
    public ResponseEntity<List<Transacao>> listarTransacoesDoUsuarioLogado(
            @AuthenticationPrincipal String username) {

        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        List<Transacao> transacoes = transacaoRepository.findByUsuarioId(usuario.getId());
        return ResponseEntity.ok(transacoes);
    }
}
