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
    private final String admin1Username;
    private final String admin1Password;
    private final String admin2Username;
    private final String admin2Password;
    private final long expirationMs;

    public AuthController(
            JwtService jwtService,
            @Value("${app.admin.username:admin}") String admin1Username,
            @Value("${app.admin.password:TheFitnessClub@2026}") String admin1Password,
            @Value("${app.admin2.username:}") String admin2Username,
            @Value("${app.admin2.password:}") String admin2Password,
            @Value("${app.jwt.expiration-ms:86400000}") long expirationMs) {
        this.jwtService = jwtService;
        this.admin1Username = admin1Username != null ? admin1Username.trim() : "";
        this.admin1Password = admin1Password != null ? admin1Password.trim() : "";
        this.admin2Username = admin2Username != null ? admin2Username.trim() : "";
        this.admin2Password = admin2Password != null ? admin2Password.trim() : "";
        this.expirationMs = expirationMs;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        String reqUser = request.getUsername() != null ? request.getUsername().trim() : "";
        String reqPass = request.getPassword() != null ? request.getPassword().trim() : "";

        String authenticatedUser = null;

        // Check Account 1 (Owner)
        if (!admin1Username.isEmpty() && admin1Username.equals(reqUser) && admin1Password.equals(reqPass)) {
            authenticatedUser = admin1Username;
        }
        // Check Account 2 (Developer / Co-Owner) - only validated if both username & password are configured
        else if (!admin2Username.isEmpty() && !admin2Password.isEmpty()
                && admin2Username.equals(reqUser) && admin2Password.equals(reqPass)) {
            authenticatedUser = admin2Username;
        }

        if (authenticatedUser != null) {
            String token = jwtService.generateToken(authenticatedUser);
            long expiresInSeconds = expirationMs / 1000;
            return ResponseEntity.ok(new LoginResponse(token, expiresInSeconds, authenticatedUser));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid username or password"));
    }
}
