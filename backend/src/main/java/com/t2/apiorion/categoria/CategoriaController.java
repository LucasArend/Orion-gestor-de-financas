package com.t2.apiorion.categoria;

import com.t2.apiorion.categoria.dto.CategoriaRequest;
import com.t2.apiorion.categoria.service.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categorias")
@Tag(name = "categoria-controller", description = "API para gerenciar categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    @Operation(summary = "Cria uma nova categoria", description = "Cria uma categoria associada ao usuário logado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Categoria criada com sucesso")
    })
    public ResponseEntity<Categoria> criarCategoria(@Valid @RequestBody CategoriaRequest request) {
        Categoria categoria = categoriaService.criarCategoria(request);
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
            @Valid @RequestBody CategoriaRequest request) {

        Categoria categoriaAtualizada = categoriaService.atualizarCategoria(id, request);
        return ResponseEntity.ok(categoriaAtualizada);
    }
}
