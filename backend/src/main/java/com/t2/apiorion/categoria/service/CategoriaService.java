package com.t2.apiorion.categoria.service;

import com.t2.apiorion.categoria.Categoria;
import com.t2.apiorion.categoria.CategoriaRepository;
import com.t2.apiorion.categoria.dto.CategoriaRequest;
import com.t2.apiorion.user.User;
import com.t2.apiorion.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final UserRepository userRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, UserRepository userRepository) {
        this.categoriaRepository = categoriaRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Categoria criarCategoria(CategoriaRequest request) {
        Categoria categoria = new Categoria();
        categoria.setNome(request.getNome());

        // Associando a categoria ao usuário logado (nesse caso, assume-se que o usuário logado tenha ID 1)
        User usuario = userRepository.findById(1L)  // Aqui você deve pegar o usuário logado, por exemplo com SecurityContext
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        categoria.setUsuario(usuario);

        return categoriaRepository.save(categoria);
    }

    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }
}
