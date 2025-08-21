package com.cadastroUsuario.services;


import com.cadastroUsuario.models.UserModel;
import com.cadastroUsuario.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UserModel cadastrarUsuario(UserModel usuario) {

        String senha = usuario.getPassword();

       if (userRepository.findByEmail(usuario.getEmail()).isPresent()){
           throw new IllegalArgumentException("Email já Cadastrado!");
       }

       if (senha.length() < 6 ) {
           throw new IllegalArgumentException("A senha deve ter no minimo 6 caracteres!");
       }

       if (!senha.matches(".*[A-Z].*")){
           throw new IllegalArgumentException("A senha deve conter pelo menos uma letra maiúscula!");
       }

       if (!senha.matches(".*[0-9].*")){
           throw new IllegalArgumentException("A senha deve conter pelo menos um número!");
       }


       if (usuario.getName() == null || usuario.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome não pode estar vazio!");
       }

       if (!usuario.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
           throw new IllegalArgumentException("Email inválido!");
       }

       usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));


        return userRepository.save(usuario);
    }
}

