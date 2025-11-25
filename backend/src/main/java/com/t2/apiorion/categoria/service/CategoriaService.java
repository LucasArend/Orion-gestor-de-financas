package com.t2.apiorion.categoria.service;

import com.t2.apiorion.categoria.Categoria;
import com.t2.apiorion.categoria.CategoriaRepository;
import com.t2.apiorion.categoria.dto.CategoriaRequest;
import com.t2.apiorion.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Objects;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional
    public Categoria criarCategoria(CategoriaRequest request, User usuario) {
        if (usuario == null) {
            throw new EntityNotFoundException("Usuário não encontrado");
        }

        Categoria categoria = new Categoria();
        categoria.setNome(request.getNome());
        categoria.setUsuario(usuario);
        return categoriaRepository.save(categoria);
    }

    @Transactional
    public Categoria atualizarCategoria(Long id, CategoriaRequest request, User usuario) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com id " + id));

        if (categoria.getUsuario() == null || !Objects.equals(categoria.getUsuario().getId(), usuario.getId())) {
            throw new EntityNotFoundException("Categoria não pertence ao usuário");
        }

        categoria.setNome(request.getNome());
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }
}
