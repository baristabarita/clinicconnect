package com.clinicconnect.api.service;

import com.clinicconnect.api.config.JwtUtil;
import com.clinicconnect.api.model.User;
import com.clinicconnect.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.clinicconnect.api.dto.RegisterDTO;
import com.clinicconnect.api.dto.AuthResponse;
import com.clinicconnect.api.dto.LoginDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public AuthResponse register(RegisterDTO registerDTO) {
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setFname(registerDTO.getFname());
        user.setLname(registerDTO.getLname());
        user.setMname(registerDTO.getMname());
        user.setAge(registerDTO.getAge());
        user.setGender(registerDTO.getGender());
        user.setContact(registerDTO.getContact());
        user.setBirthday(LocalDate.parse(registerDTO.getBirthday()));
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setUserType(registerDTO.getUserType());

        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser);
        
        return AuthResponse.fromUser(savedUser, token);
    }

    public AuthResponse login(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user);
        return AuthResponse.fromUser(user, token);
    }
}
