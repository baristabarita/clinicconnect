package com.clinicconnect.api.controller;

import com.clinicconnect.api.dto.LoginDTO;
import com.clinicconnect.api.dto.RegisterDTO;
import com.clinicconnect.api.dto.AuthResponse;
import com.clinicconnect.api.service.AuthService;
import com.clinicconnect.api.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterDTO registerDTO) {
        try {
            AuthResponse response = authService.register(registerDTO);
            return ResponseEntity.ok(new ApiResponse<>(response, "Registration successful", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginDTO loginDTO) {
        try {
            AuthResponse response = authService.login(loginDTO);
            return ResponseEntity.ok(new ApiResponse<>(response, "Login successful", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }
}
