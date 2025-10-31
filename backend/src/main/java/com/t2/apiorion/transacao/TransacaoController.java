package com.t2.apiorion.transacao;

import com.t2.apiorion.transacao.dto.TransacaoRequest;
import com.t2.apiorion.transacao.service.TransacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transacoes")
@Tag(name = "Transações", description = "API para gerenciar transações")
public class TransacaoController {

    private final TransacaoService transacaoService;

    public TransacaoController(TransacaoService transacaoService) {
        this.transacaoService = transacaoService;
    }

    @PostMapping
    @Operation(summary = "Cria uma nova transação")
    public ResponseEntity<Transacao> criarTransacao(@Valid @RequestBody TransacaoRequest request) {
        Transacao transacao = transacaoService.criarTransacao(request);
        return ResponseEntity.ok(transacao);
    }
}
