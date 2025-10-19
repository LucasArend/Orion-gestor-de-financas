package com.orion.tipoTransacao;

import jakarta.persistence.*;

@Entity
@Table(name = "tipo_transacao")
public class TipoTransacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nome;

    // Construtor padrão exigido pelo JPA
    protected TipoTransacao() {}

    // Apenas getters (somente leitura)
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}
