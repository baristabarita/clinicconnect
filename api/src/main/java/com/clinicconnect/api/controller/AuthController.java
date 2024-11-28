package com.clinicconnect.api.controller;

import com.clinicconnect.api.dto.LoginDTO;
import com.clinicconnect.api.dto.RegisterDTO;
import com.clinicconnect.api.dto.UserDTO;
import com.clinicconnect.api.service.AuthService;
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
    public ResponseEntity<UserDTO> register(@RequestBody RegisterDTO registerDTO) {
        UserDTO response = authService.register(registerDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        String jwtToken = authService.login(loginDTO);
        return ResponseEntity.ok(jwtToken);
    }
}
