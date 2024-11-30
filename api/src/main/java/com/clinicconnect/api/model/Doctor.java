package com.clinicconnect.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "doctors")
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer doctorID;

    @Column(nullable = false)
    private String fname;

    @Column(nullable = false)
    private String lname;

    private String mname;

    @Column(nullable = false, unique = true)
    private String email;

    private String specialty;

    @Column(nullable = false)
    private String status;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'https://imgur.com/QQTJIpn.jpg'")
    private String profileImagePath;

    private LocalDateTime profileImageUpdatedAt;

    public Integer getDoctorID() {
        return doctorID;
    }

    public void setDoctorID(Integer doctorID) {
        this.doctorID = doctorID;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }

    public LocalDateTime getProfileImageUpdatedAt() {
        return profileImageUpdatedAt;
    }

    public void setProfileImageUpdatedAt(LocalDateTime profileImageUpdatedAt) {
        this.profileImageUpdatedAt = profileImageUpdatedAt;
    }
}
