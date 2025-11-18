package com.t2.apiorion.auth;

import com.t2.apiorion.auth.dto.AuthResponse;
import com.t2.apiorion.auth.dto.LoginRequest;
import com.t2.apiorion.auth.dto.RegisterRequest;
import com.t2.apiorion.security.JwtService;
import com.t2.apiorion.user.User;
import com.t2.apiorion.user.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@Tag(name = "Authentication")
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername().toLowerCase())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Username já existe!"));
        }

        User user = new User();
        user.setName(request.getName());
        user.setUsername(request.getUsername().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        Map<String, Object> claims = Map.of(
                "name", user.getName(),
                "roles", user.getRoles()
        );

        String token = jwtService.generateToken(user.getUsername(), claims);

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token));
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        var username = request.getUsername().toLowerCase();
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        var user = userOpt.get();

        Map<String, Object> claims = Map.of(
                "name", user.getName(),
                "roles", user.getRoles()
        );

        String token = jwtService.generateToken(username, claims);

        return ResponseEntity.ok(new AuthResponse(token));
    }


    @GetMapping("/login/oauth2/code/google")
    public ResponseEntity<?> oauth2Success(@AuthenticationPrincipal OAuth2User oAuth2User) {
        System.out.println("Método oauth2Success chamado!");  // Adicione um log aqui

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        System.out.println("ué n printa? ");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Não foi possível obter o e-mail do Google"));
        }
        System.out.println("estive ali!!!!!! ");
        User user = userRepository.findByUsername(email.toLowerCase())
                .orElseGet(() -> {
                    User u = new User();
                    u.setName(name != null ? name : "Usuário Google");
                    u.setUsername(email.toLowerCase());
                    u.setProvider("GOOGLE");
                    u.setPassword("");
                    userRepository.save(u);
                    return u;
                });


        Map<String, Object> claims = Map.of(
                "name", user.getName(),
                "roles", user.getRoles()
        );

        System.out.println("estive aqui!!!!!! ");
        String token = jwtService.generateToken(user.getUsername(), claims);
        System.out.println("Token gerado: " + token);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Autenticação Google bem-sucedida!",
                        "name", user.getName(),
                        "email", email,
                        "token", token
                )
        );
    }


}
