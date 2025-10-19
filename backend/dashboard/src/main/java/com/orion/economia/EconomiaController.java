package com.orion.economia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/economia")
@CrossOrigin(origins = "*") // libera acesso de qualquer origem (ex: frontend React)
public class EconomiaController {

    @Autowired
    private EconomiaRepository economiaRepository;

    @GetMapping("/{usuarioId}")
    public ResponseEntity<?> getEconomiaPorUsuario(@PathVariable Long usuarioId) {
        Optional<Economia> economia = economiaRepository.findByUsuarioId(usuarioId);
        if (economia.isPresent()) {
            return ResponseEntity.ok(economia.get());
        } else {
            return ResponseEntity.status(404).body("Economia não encontrada para o usuário ID " + usuarioId);
        }
    }
}
