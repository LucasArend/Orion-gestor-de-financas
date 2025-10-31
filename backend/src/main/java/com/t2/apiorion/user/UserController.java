package com.t2.apiorion.user;

import com.t2.apiorion.categoria.CategoriaRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@Tag(name = "users")  // Define o grupo de endpoints "users" no Swagger UI
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;


    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Rota "/me" que retorna os dados do usuário autenticado
    @GetMapping("/me")
    public Map<String, Object> me(Principal principal) {
        var user = userRepository.findByUsername(principal.getName()).orElseThrow();
        return Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "username", user.getUsername(),
                "roles", user.getRoles());
    }
}
