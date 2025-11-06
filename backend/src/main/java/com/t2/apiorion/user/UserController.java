package com.t2.apiorion.user;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.t2.apiorion.user.dto.ChangePasswordRequest;

import java.security.Principal;
import java.util.Map;

@Tag(name = "users")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    public Map<String, Object> me(Principal principal) {
        var user = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));
        return Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "username", user.getUsername(),
                "roles", user.getRoles()
        );
    }

    @PutMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    public Map<String, Object> updateUser(@RequestBody User updatedUser, Principal principal) {
        var existingUser = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));


        existingUser.setName(updatedUser.getName());
        existingUser.setUsername(updatedUser.getUsername());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        existingUser.setRoles(updatedUser.getRoles());

        userRepository.save(existingUser);

        return Map.of(
                "id", existingUser.getId(),
                "name", existingUser.getName(),
                "username", existingUser.getUsername(),
                "roles", existingUser.getRoles()
        );
    }

    @PutMapping("/password")
    @SecurityRequirement(name = "bearerAuth")
    public Map<String, Object> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, Principal principal) {
        var existingUser = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));

        // Verificar se a senha atual fornecida é válida
        if (!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), existingUser.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Validar a nova senha (você pode adicionar regras adicionais, como tamanho mínimo, etc.)
        if (changePasswordRequest.getNewPassword() == null || changePasswordRequest.getNewPassword().isEmpty()) {
            throw new RuntimeException("New password cannot be empty");
        }

        // Atualizar a senha do usuário
        existingUser.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(existingUser);

        return Map.of(
                "message", "Password changed successfully"
        );
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public Map<String, Object> getAllUsers() {
        var users = userRepository.findAll();
        return Map.of("users", users);
    }
}
