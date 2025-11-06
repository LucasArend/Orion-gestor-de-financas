package com.t2.apiorion.user;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@Tag(name = "users")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;  // Injeção do PasswordEncoder

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

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public Map<String, Object> updateUser(@PathVariable Long id, @RequestBody User updatedUser, Principal principal) {
        var existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (!existingUser.getUsername().equals(principal.getName())) {
            throw new RuntimeException("You can only update your own profile");
        }

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

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public Map<String, Object> getAllUsers() {
        var users = userRepository.findAll();
        return Map.of("users", users);
    }
}
