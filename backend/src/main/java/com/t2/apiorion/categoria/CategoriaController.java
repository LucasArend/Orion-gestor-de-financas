package com.t2.apiorion.categoria;

import com.t2.apiorion.categoria.dto.CategoriaRequest;
import com.t2.apiorion.categoria.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<?> criarCategoria(@Valid @RequestBody CategoriaRequest request) {
        Categoria categoria = categoriaService.criarCategoria(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
    }

    @GetMapping
    public ResponseEntity<?> listarCategorias() {
        return ResponseEntity.ok(categoriaService.listarCategorias());
    }
}
