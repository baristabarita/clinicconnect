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

    @Column(name = "profile_image_path", columnDefinition = "VARCHAR(255) DEFAULT 'https://imgur.com/QQTJIpn.jpg'")
    private String profile_image_path;

    @Column(name = "profile_image_updated_at")
    private LocalDateTime profile_image_updated_at;

    @Column(name = "is_deleted", columnDefinition = "TINYINT(1) DEFAULT 0")
    private int isDeleted = 0;

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

    public String getProfile_image_path() {
        return profile_image_path;
    }

    public void setProfile_image_path(String profile_image_path) {
        this.profile_image_path = profile_image_path;
    }

    public LocalDateTime getProfile_image_updated_at() {
        return profile_image_updated_at;
    }

    public void setProfile_image_updated_at(LocalDateTime profile_image_updated_at) {
        this.profile_image_updated_at = profile_image_updated_at;
    }

    public int getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(int isDeleted) {
        this.isDeleted = isDeleted;
    }

    // Convenience methods to check deleted status
    public boolean isDeleted() {
        return isDeleted == 1;
    }
}
