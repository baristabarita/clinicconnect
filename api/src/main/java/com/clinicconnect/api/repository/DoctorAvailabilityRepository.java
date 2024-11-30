package com.clinicconnect.api.repository;

import com.clinicconnect.api.model.Doctor;
import com.clinicconnect.api.model.DoctorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability, Integer> {
    List<DoctorAvailability> findByDoctor(Doctor doctor);
} 