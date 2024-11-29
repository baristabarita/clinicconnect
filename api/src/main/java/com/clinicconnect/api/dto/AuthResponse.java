package com.clinicconnect.api.dto;

import lombok.Data;
import com.clinicconnect.api.model.User;

@Data
public class AuthResponse {
    private String token;
    private String email;
    private String userType;
    private String fname;
    private String lname;
    private String mname;
    private Integer age;
    private String gender;
    private String contact;
    private String birthday;

    // Add a static factory method for convenience
    public static AuthResponse fromUser(User user, String token) {
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setEmail(user.getEmail());
        response.setUserType(user.getUserType());
        response.setFname(user.getFname());
        response.setLname(user.getLname());
        response.setMname(user.getMname());
        response.setAge(user.getAge());
        response.setGender(user.getGender());
        response.setContact(user.getContact());
        response.setBirthday(user.getBirthday() != null ? user.getBirthday().toString() : null);
        return response;
    }
} 