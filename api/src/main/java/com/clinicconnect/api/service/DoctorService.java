package com.clinicconnect.api.service;

import com.clinicconnect.api.dto.DoctorDTO;
import com.clinicconnect.api.model.Doctor;
import com.clinicconnect.api.model.DoctorAvailability;
import com.clinicconnect.api.repository.DoctorRepository;
import com.clinicconnect.api.repository.DoctorAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DoctorAvailabilityRepository availabilityRepository;

    public Doctor addDoctor(DoctorDTO doctorDTO) {
        if (doctorRepository.existsByEmail(doctorDTO.getEmail())) {
            throw new RuntimeException("Doctor with this email already exists");
        }

        Doctor doctor = new Doctor();
        doctor.setFname(doctorDTO.getFname());
        doctor.setLname(doctorDTO.getLname());
        doctor.setMname(doctorDTO.getMname());
        doctor.setEmail(doctorDTO.getEmail());
        doctor.setSpecialty(doctorDTO.getSpecialty());
        doctor.setStatus("AVAILABLE");

        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<DoctorAvailability> getDoctorAvailability(Integer doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return availabilityRepository.findByDoctor(doctor);
    }

    public DoctorAvailability addAvailability(Integer doctorId, DoctorAvailability availability) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        availability.setDoctor(doctor);
        return availabilityRepository.save(availability);
    }

    public DoctorAvailability updateAvailability(Integer doctorId, Integer availabilityId, DoctorAvailability availability) {
        DoctorAvailability existing = availabilityRepository.findById(availabilityId)
            .orElseThrow(() -> new RuntimeException("Availability not found"));
        existing.setStartDate(availability.getStartDate());
        existing.setEndDate(availability.getEndDate());
        existing.setAvailabilityType(availability.getAvailabilityType());
        existing.setNotes(availability.getNotes());
        return availabilityRepository.save(existing);
    }
}
