package com.t2.apiorion.user;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.t2.apiorion.user.dto.ChangePasswordRequest;
import com.t2.apiorion.user.dto.UpdateUserRequest;

import java.security.Principal;
import java.util.Map;
import java.util.regex.Pattern;

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
    public Map<String, Object> updateUser(@RequestBody UpdateUserRequest updatedUser, Principal principal) {
        var existingUser = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));

        if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
            if (!isValidEmail(updatedUser.getUsername())) {
                throw new RuntimeException("Invalid email format");
            }

            if (!updatedUser.getUsername().equals(existingUser.getUsername()) && userRepository.existsByUsername(updatedUser.getUsername())) {
                throw new RuntimeException("Username already exists");
            }

            existingUser.setUsername(updatedUser.getUsername());
        }

        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }

        if (updatedUser.getRoles() != null && !updatedUser.getRoles().isEmpty()) {
            existingUser.setRoles(updatedUser.getRoles());
        }

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

        if (!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), existingUser.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        if (changePasswordRequest.getNewPassword() == null || changePasswordRequest.getNewPassword().isEmpty()) {
            throw new RuntimeException("New password cannot be empty");
        }

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

    private boolean isValidEmail(String username) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(username).matches();
    }
}
