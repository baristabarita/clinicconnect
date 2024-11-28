package com.clinicconnect.api.service;

import com.clinicconnect.api.config.JwtUtil;
import com.clinicconnect.api.model.User;
import com.clinicconnect.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.clinicconnect.api.dto.RegisterDTO;
import com.clinicconnect.api.dto.UserDTO;
import com.clinicconnect.api.dto.LoginDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public UserDTO register(RegisterDTO registerDTO) {
        if(userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists!");
        }

        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setFname(registerDTO.getFname());
        user.setLname(registerDTO.getLname());
        user.setMname(registerDTO.getMname());
        user.setAge(registerDTO.getAge());
        user.setGender(registerDTO.getGender());
        user.setContact(registerDTO.getContact());
        user.setBirthday(LocalDate.parse(registerDTO.getBirthday(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setUserType(registerDTO.getUserType());

        System.out.println("User type being set: " + registerDTO.getUserType());

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setEmail(user.getEmail());
        dto.setFname(user.getFname());
        dto.setLname(user.getLname());
        dto.setMname(user.getMname());
        dto.setUserType(user.getUserType());
        // Don't set password for security reasons
        return dto;
    }

    public String login(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return jwtUtil.generateToken(user.getEmail(), user.getUserType());
    }
}
