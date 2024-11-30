package com.clinicconnect.api.repository;

import com.clinicconnect.api.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    boolean existsByEmail(String email);
}
