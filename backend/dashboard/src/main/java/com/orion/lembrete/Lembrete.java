package com.orion.lembrete;

import com.orion.usuario.Usuario;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lembretes")
public class Lembrete {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false)
    @JoinColumn(name="usuario_id")
    private Usuario usuario;

    @Column(nullable=false, length=140)
    private String titulo;

    @Column(nullable=false)
    private LocalDate data;

    // getters/setters
    public Long getId() { return id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
}
