package com.example.cinema.controller;

import com.example.cinema.dto.LoginRequest;
import com.example.cinema.dto.RegisterRequest;
import com.example.cinema.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String jwt = authService.authenticate(request);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("Registration successful");
    }
}
