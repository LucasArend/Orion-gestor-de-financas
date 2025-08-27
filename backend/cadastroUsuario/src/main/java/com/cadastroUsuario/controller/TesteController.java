package com.cadastroUsuario.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
public class TesteController {

    @GetMapping
    public String somenteAutenticados(){
        return "se vc esta lendo isso vc está autenticado";
    }
}
