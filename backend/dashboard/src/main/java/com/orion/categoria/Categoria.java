package com.orion.categoria;

import com.orion.usuario.Usuario;
import com.orion.transacao.Transacao;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String nome;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "categoria")
    private List<Transacao> transacoes;

    // Construtor padrão protegido para JPA
    protected Categoria() {}

    // Apenas getters (somente leitura)
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public List<Transacao> getTransacoes() {
        return transacoes;
    }
}
