package com.clinicconnect.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "doctor_availability")
public class DoctorAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer availabilityID;

    @ManyToOne
    @JoinColumn(name = "doctorID")
    private Doctor doctor;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "availability_type")
    @Enumerated(EnumType.STRING)
    private AvailabilityType availabilityType;

    private String notes;

    public enum AvailabilityType {
        AVAILABLE, ON_LEAVE, PARTIALLY_AVAILABLE
    }

    public Integer getAvailabilityID() {
        return availabilityID;
    }

    public void setAvailabilityID(Integer availabilityID) {
        this.availabilityID = availabilityID;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public AvailabilityType getAvailabilityType() {
        return availabilityType;
    }

    public void setAvailabilityType(AvailabilityType availabilityType) {
        this.availabilityType = availabilityType;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}