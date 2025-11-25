package com.t2.apiorion.categoria;

import com.t2.apiorion.categoria.dto.CategoriaRequest;
import com.t2.apiorion.categoria.service.CategoriaService;
import com.t2.apiorion.user.User;
import com.t2.apiorion.user.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/categorias")
@Tag(name = "categoria-controller", description = "API para gerenciar categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;
    private final UserRepository userRepository;
    private final CategoriaRepository categoriaRepository;

    public CategoriaController(CategoriaService categoriaService,
                               UserRepository userRepository,
                               CategoriaRepository categoriaRepository) {
        this.categoriaService = categoriaService;
        this.userRepository = userRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @PostMapping
    @Operation(summary = "Cria uma nova categoria", description = "Cria uma categoria associada ao usuário logado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Categoria criada com sucesso")
    })
    public ResponseEntity<Categoria> criarCategoria(
            @Valid @RequestBody CategoriaRequest request,
            Principal principal
    ) {
        if (principal == null || principal.getName() == null) {
            throw new EntityNotFoundException("Usuário não autenticado");
        }

        User usuario = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        Categoria categoria = categoriaService.criarCategoria(request, usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
    }

    @GetMapping
    @Operation(summary = "Lista todas as categorias", description = "Retorna todas as categorias do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de categorias retornada com sucesso")
    })
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaService.listarCategorias();
        return ResponseEntity.ok(categorias);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma categoria existente", description = "Atualiza o nome de uma categoria pelo seu ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoria atualizada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    public ResponseEntity<Categoria> atualizarCategoria(
            @PathVariable Long id,
            @Valid @RequestBody CategoriaRequest request,
            Principal principal
    ) {
        if (principal == null || principal.getName() == null) {
            throw new EntityNotFoundException("Usuário não autenticado");
        }

        User usuario = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        Categoria categoriaAtualizada = categoriaService.atualizarCategoria(id, request, usuario);
        return ResponseEntity.ok(categoriaAtualizada);
    }

    @GetMapping("/me")
    @Operation(summary = "Lista todas as categorias do usuário logado", description = "Retorna todas as categorias associadas ao usuário logado")
    public ResponseEntity<List<Categoria>> listarCategoriasDoUsuarioLogado(Principal principal) {
        if (principal == null || principal.getName() == null) {
            throw new EntityNotFoundException("Usuário não autenticado");
        }

        User usuario = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        List<Categoria> categorias = categoriaRepository.findByUsuario(usuario);
        return ResponseEntity.ok(categorias);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma categoria e suas transações associadas", description = "Deleta uma categoria e todas as transações associadas a ela")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Categoria deletada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Categoria não encontrada")
    })
    public ResponseEntity<Void> deletarCategoria(
            @PathVariable Long id,
            Principal principal
    ) {
        if (principal == null || principal.getName() == null) {
            throw new EntityNotFoundException("Usuário não autenticado");
        }

        User usuario = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        Categoria categoria = categoriaRepository.findById(id)
                .filter(c -> {
                    // proteção contra usuário null na categoria (evita NPE)
                    if (c.getUsuario() == null) return false;
                    return Objects.equals(c.getUsuario().getId(), usuario.getId());
                })
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada ou não pertence ao usuário"));

        categoriaRepository.delete(categoria);
        return ResponseEntity.noContent().build();
    }
}
