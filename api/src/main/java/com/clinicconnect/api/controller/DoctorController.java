package com.clinicconnect.api.controller;

import com.clinicconnect.api.dto.ApiResponse;
import com.clinicconnect.api.dto.DoctorDTO;
import com.clinicconnect.api.model.Doctor;
import com.clinicconnect.api.model.DoctorAvailability;
import com.clinicconnect.api.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:4200")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public ResponseEntity<ApiResponse <Doctor>> addDoctor (@RequestBody DoctorDTO doctorDTO){
        try {
            Doctor doctor = doctorService.addDoctor(doctorDTO);
            return ResponseEntity.ok(new ApiResponse<>(doctor, "Doctor added successfully", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Doctor>>> getAllDoctors() {
        try {
            List<Doctor> doctors = doctorService.getAllDoctors();
            return ResponseEntity.ok(new ApiResponse<>(doctors, "Doctors retrieved successfully", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDoctor(@PathVariable Integer id) {
        try {
            doctorService.deleteDoctor(id);
            return ResponseEntity.ok(new ApiResponse<>(null, "Doctor deleted successfully", 200));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(null, e.getMessage(), 404));
        }
    }


    //Availability Related Mappings

    @GetMapping("/{doctorId}/availability")
    public ResponseEntity<ApiResponse<List<DoctorAvailability>>> getDoctorAvailability(@PathVariable Integer doctorId) {
        try {
            List<DoctorAvailability> availability = doctorService.getDoctorAvailability(doctorId);
            return ResponseEntity.ok(new ApiResponse<>(availability, "Availability retrieved successfully", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    @PostMapping("/{doctorId}/availability")
    public ResponseEntity<ApiResponse<DoctorAvailability>> addAvailability(
            @PathVariable Integer doctorId,
            @RequestBody DoctorAvailability availability
    ) {
        try {
            DoctorAvailability saved = doctorService.addAvailability(doctorId, availability);
            return ResponseEntity.ok(new ApiResponse<>(saved, "Availability added successfully", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    @PutMapping("/{doctorId}/availability/{availabilityId}")
    public ResponseEntity<ApiResponse<DoctorAvailability>> updateAvailability(
            @PathVariable Integer doctorId,
            @PathVariable Integer availabilityId,
            @RequestBody DoctorAvailability availability
    ) {
        try {
            DoctorAvailability updated = doctorService.updateAvailability(doctorId, availabilityId, availability);
            return ResponseEntity.ok(new ApiResponse<>(updated, "Availability updated successfully", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }
}
