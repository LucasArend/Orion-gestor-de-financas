package com.t2.apiorion.economia.service;

import com.t2.apiorion.economia.Economia;
import com.t2.apiorion.economia.EconomiaRepository;
import com.t2.apiorion.user.User;
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

    private Economia getOrCreateEconomia(User user) {
        return economiaRepository.findByUsuarioId(user.getId())
                .orElseGet(() -> {
                    Economia economia = new Economia();
                    economia.setUsuario(user);
                    economia.setSaldo(BigDecimal.ZERO);
                    economia.setReservaDeEmergencia(BigDecimal.ZERO);
                    economia.setUpdatedAt(Instant.now());
                    return economiaRepository.save(economia);
                });
    }

    // ======== SALDO ========

    @Transactional
    public Economia definirSaldo(String username, BigDecimal valor) {
        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Economia economia = getOrCreateEconomia(usuario);
        economia.setSaldo(valor);
        economia.setUpdatedAt(Instant.now());
        return economiaRepository.save(economia);
    }

    @Transactional
    public Economia atualizarSaldo(String username, BigDecimal novoSaldo) {
        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Economia economia = economiaRepository.findByUsuarioId(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Economia não encontrada"));
        economia.setSaldo(novoSaldo);
        economia.setUpdatedAt(Instant.now());
        return economiaRepository.save(economia);
    }

    @Transactional(readOnly = true)
    public BigDecimal obterSaldo(String username) {
        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return economiaRepository.findByUsuarioId(usuario.getId())
                .map(Economia::getSaldo)
                .orElse(BigDecimal.ZERO);
    }

    // ======== RESERVA ========

    @Transactional
    public Economia definirReserva(String username, BigDecimal valor) {
        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Economia economia = getOrCreateEconomia(usuario);
        economia.setReservaDeEmergencia(valor);
        economia.setUpdatedAt(Instant.now());
        return economiaRepository.save(economia);
    }

    @Transactional
    public Economia atualizarReservaEmergencia(String username, BigDecimal novaReserva) {
        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Economia economia = economiaRepository.findByUsuarioId(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Economia não encontrada"));
        economia.setReservaDeEmergencia(novaReserva);
        economia.setUpdatedAt(Instant.now());
        return economiaRepository.save(economia);
    }

    @Transactional(readOnly = true)
    public BigDecimal obterReserva(String username) {
        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return economiaRepository.findByUsuarioId(usuario.getId())
                .map(Economia::getReservaDeEmergencia)
                .orElse(BigDecimal.ZERO);
    }
}
