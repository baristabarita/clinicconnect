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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
}