package com.clinicconnect.api.repository;

import com.clinicconnect.api.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    List<Doctor> findByIsDeleted(int isDeleted);
    boolean existsByEmail(String email);
}
