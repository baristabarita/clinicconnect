package com.clinicconnect.api.dto;

import com.clinicconnect.api.model.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentDTO {
    private Integer userID;
    private Integer doctorID;
    private LocalDate visitDate;
    private LocalTime visitTime;
    private String purpose;
    private String status;
    private boolean isDeleted;

    public AppointmentDTO(){
        this.isDeleted = false;
    }

    // Add toString for debugging
    @Override
    public String toString() {
        return "AppointmentDTO{" +
                "userID=" + userID +
                ", doctorID=" + doctorID +
                ", visitDate=" + visitDate +
                ", visitTime=" + visitTime +
                ", purpose='" + purpose + '\'' +
                ", status=" + status +
                ", isDeleted=" + isDeleted +
                '}';
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public Integer getDoctorID() {
        return doctorID;
    }

    public void setDoctorID(Integer doctorID) {
        this.doctorID = doctorID;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public LocalTime getVisitTime() {
        return visitTime;
    }

    public void setVisitTime(LocalTime visitTime) {
        this.visitTime = visitTime;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
