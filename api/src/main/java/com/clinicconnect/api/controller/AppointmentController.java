package com.clinicconnect.api.controller;

import com.clinicconnect.api.dto.ApiResponse;
import com.clinicconnect.api.dto.AppointmentDTO;
import com.clinicconnect.api.model.Appointment;
import com.clinicconnect.api.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<Appointment>> createAppointment(@RequestBody AppointmentDTO appointmentDTO){
        try {
            // Debug logs
            System.out.println("Received appointment data: " + appointmentDTO);
            System.out.println("Visit date: " + appointmentDTO.getVisitDate());
            System.out.println("Visit time: " + appointmentDTO.getVisitTime());

            Appointment appointment = appointmentService.createAppointment(appointmentDTO);
            return ResponseEntity.ok(new ApiResponse<>(appointment, "Appointment created successfully", 200));
        } catch (Exception e) {
            // Print full stack trace
            e.printStackTrace();

            String errorMessage = e.getMessage();
            Throwable cause = e.getCause();
            while (cause != null) {
                errorMessage += " Caused by: " + cause.getMessage();
                cause = cause.getCause();
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(null, errorMessage, 500));
        }
    }



}
