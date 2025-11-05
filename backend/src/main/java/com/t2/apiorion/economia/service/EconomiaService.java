package com.t2.apiorion.economia.service;

import com.t2.apiorion.economia.Economia;
import com.t2.apiorion.economia.EconomiaRepository;
import com.t2.apiorion.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.Instant;

@Service
public class EconomiaService {

    private final EconomiaRepository economiaRepository;
    private final UserRepository userRepository;

    public EconomiaService(EconomiaRepository economiaRepository, UserRepository userRepository) {
        this.economiaRepository = economiaRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Economia criarEconomia(Long usuarioId) {
        var usuario = userRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Economia economia = new Economia();
        economia.setUsuario(usuario);
        economia.setSaldo(BigDecimal.ZERO);
        economia.setReservaDeEmergencia(BigDecimal.ZERO);
        economia.setUpdatedAt(Instant.now());

        return economiaRepository.save(economia);
    }

    @Transactional
    public Economia atualizarSaldo(Long usuarioId, BigDecimal novoSaldo) {
        Economia economia = economiaRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Economia não encontrada"));

        economia.setSaldo(novoSaldo);
        economia.setUpdatedAt(Instant.now());

        return economiaRepository.save(economia);
    }

    @Transactional
    public Economia atualizarReservaEmergencia(Long usuarioId, BigDecimal novaReserva) {
        Economia economia = economiaRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Economia não encontrada"));

        economia.setReservaDeEmergencia(novaReserva);
        economia.setUpdatedAt(Instant.now());

        return economiaRepository.save(economia);
    }
}
