package com.t2.apiorion.economia;

import com.t2.apiorion.economia.service.EconomiaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/economias")
public class EconomiaController {

    private final EconomiaService economiaService;

    public EconomiaController(EconomiaService economiaService) {
        this.economiaService = economiaService;
    }

    @PostMapping("/{usuarioId}")
    public ResponseEntity<Economia> criarEconomia(@PathVariable Long usuarioId) {
        Economia economia = economiaService.criarEconomia(usuarioId);
        return ResponseEntity.ok(economia);
    }

    @PutMapping("/{usuarioId}/saldo")
    public ResponseEntity<Economia> atualizarSaldo(@PathVariable Long usuarioId, @RequestBody BigDecimal novoSaldo) {
        Economia economia = economiaService.atualizarSaldo(usuarioId, novoSaldo);
        return ResponseEntity.ok(economia);
    }

    @PutMapping("/{usuarioId}/reserva")
    public ResponseEntity<Economia> atualizarReserva(@PathVariable Long usuarioId, @RequestBody BigDecimal novaReserva) {
        Economia economia = economiaService.atualizarReservaEmergencia(usuarioId, novaReserva);
        return ResponseEntity.ok(economia);
    }
}
