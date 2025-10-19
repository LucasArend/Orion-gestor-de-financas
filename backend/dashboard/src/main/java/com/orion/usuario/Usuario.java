package com.orion.usuario;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String foto;

    // Construtor padrão protegido para JPA
    protected Usuario() {}

    // Apenas getters (somente leitura)
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getFoto() { return foto; }

    // Setter de nome se necessário (ex: edição de usuário)
    public void setNome(String nome) { this.nome = nome; }

    // Setter de foto se necessário (ex: upload de imagem)
    public void setFoto(String foto) { this.foto = foto; }
}
