package com.t2.apiorion.economia;

import com.t2.apiorion.economia.service.EconomiaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/economias")
public class EconomiaController {

    private final EconomiaService economiaService;

    public EconomiaController(EconomiaService economiaService) {
        this.economiaService = economiaService;
    }

    // ======== SALDO ========

    @PostMapping("/saldo")
    public ResponseEntity<Economia> criarOuDefinirSaldo(Principal principal, @RequestBody Map<String, BigDecimal> body) {
        String username = principal.getName();
        BigDecimal valor = body.get("valor");
        Economia economia = economiaService.definirSaldo(username, valor);
        return ResponseEntity.ok(economia);
    }

    @PutMapping("/saldo")
    public ResponseEntity<Economia> atualizarSaldo(Principal principal, @RequestBody Map<String, BigDecimal> body) {
        String username = principal.getName();
        BigDecimal valor = body.get("valor");
        Economia economia = economiaService.atualizarSaldo(username, valor);
        return ResponseEntity.ok(economia);
    }

    @GetMapping("/saldo")
    public ResponseEntity<BigDecimal> obterSaldo(Principal principal) {
        String username = principal.getName();
        BigDecimal saldo = economiaService.obterSaldo(username);
        return ResponseEntity.ok(saldo);
    }

    // ======== RESERVA ========

    @PostMapping("/reserva")
    public ResponseEntity<Economia> criarOuDefinirReserva(Principal principal, @RequestBody Map<String, BigDecimal> body) {
        String username = principal.getName();
        BigDecimal valor = body.get("valor");
        Economia economia = economiaService.definirReserva(username, valor);
        return ResponseEntity.ok(economia);
    }

    @PutMapping("/reserva")
    public ResponseEntity<Economia> atualizarReserva(Principal principal, @RequestBody Map<String, BigDecimal> body) {
        String username = principal.getName();
        BigDecimal valor = body.get("valor");
        Economia economia = economiaService.atualizarReservaEmergencia(username, valor);
        return ResponseEntity.ok(economia);
    }

    @GetMapping("/reserva")
    public ResponseEntity<BigDecimal> obterReserva(Principal principal) {
        String username = principal.getName();
        BigDecimal reserva = economiaService.obterReserva(username);
        return ResponseEntity.ok(reserva);
    }
}
