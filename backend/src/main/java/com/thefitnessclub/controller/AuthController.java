package com.thefitnessclub.controller;

import com.thefitnessclub.config.JwtService;
import com.thefitnessclub.dto.LoginRequest;
import com.thefitnessclub.dto.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;
    private final String expectedUsername;
    private final String expectedPassword;
    private final long expirationMs;

    public AuthController(
            JwtService jwtService,
            @Value("${app.admin.username:admin}") String expectedUsername,
            @Value("${app.admin.password:TheFitnessClub@2026}") String expectedPassword,
            @Value("${app.jwt.expiration-ms:86400000}") long expirationMs) {
        this.jwtService = jwtService;
        this.expectedUsername = expectedUsername;
        this.expectedPassword = expectedPassword;
        this.expirationMs = expirationMs;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        if (expectedUsername.equals(request.getUsername())
                && expectedPassword.equals(request.getPassword())) {

            String token = jwtService.generateToken(expectedUsername);
            long expiresInSeconds = expirationMs / 1000;

            return ResponseEntity.ok(new LoginResponse(token, expiresInSeconds, expectedUsername));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid username or password"));
    }
}
