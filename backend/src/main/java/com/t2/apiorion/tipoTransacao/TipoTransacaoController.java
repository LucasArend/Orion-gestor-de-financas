package com.t2.apiorion.tipoTransacao;

import com.t2.apiorion.tipoTransacao.dto.TipoTransacaoRequest;
import com.t2.apiorion.tipoTransacao.service.TipoTransacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@Tag(name = "Tipo Transações")
@RestController
@RequestMapping("/tipo-transacao")
public class TipoTransacaoController {

    private final TipoTransacaoService tipoTransacaoService;

    public TipoTransacaoController(TipoTransacaoService tipoTransacaoService) {
        this.tipoTransacaoService = tipoTransacaoService;
    }

    @Operation(summary = "Criar Tipo de Transação")
    @PostMapping
    public ResponseEntity<TipoTransacao> criarTipoTransacao(@Valid @RequestBody TipoTransacaoRequest request) {
        TipoTransacao tipoTransacao = tipoTransacaoService.criarTipoTransacao(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(tipoTransacao);
    }
}
