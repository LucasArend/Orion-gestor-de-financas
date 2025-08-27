package com.cadastroUsuario.controller;

import com.cadastroUsuario.models.UserModel;
import com.cadastroUsuario.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody UserModel usuario){
        try{
            UserModel novoUsuario = userService.cadastrarUsuario(usuario);
        return ResponseEntity.ok(novoUsuario);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
