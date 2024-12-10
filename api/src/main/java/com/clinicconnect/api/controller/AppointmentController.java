package com.clinicconnect.api.controller;

import com.clinicconnect.api.dto.ApiResponse;
import com.clinicconnect.api.dto.AppointmentDTO;
import com.clinicconnect.api.model.Appointment;
import com.clinicconnect.api.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    //Recent Appointments
    @GetMapping("/recent")
    public ResponseEntity<ApiResponse<List<Appointment>>> getRecentAppointments(){
        try{
            List<Appointment> appointments = appointmentService.getRecentAppointments();
            return ResponseEntity.ok(new ApiResponse<>(appointments, "Recent appointments retrieved", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    //Filtering Appointments
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<Appointment>>> getFilteredAppointments(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate endDate
            ){

        try{
            Appointment.AppointmentStatus statusEnum = status != null ?
                    Appointment.AppointmentStatus.valueOf(status) : null;
            List<Appointment> appointments = appointmentService.getFilteredAppointments(
                    statusEnum, startDate, endDate);
            return ResponseEntity.ok(new ApiResponse<>(appointments, "Filtered appointments retrieved", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    //Get and view full details
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Appointment>> getAppointmentDetails(@PathVariable Integer aptID){
        try{
            Appointment appointment = appointmentService.getAppointmentDetails(aptID);
            return ResponseEntity.ok(new ApiResponse<>(appointment, "Appointment details retrieved", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    //View specific appointments by user
    @GetMapping("/user/{userID}")
    public ResponseEntity<ApiResponse<List<Appointment>>> getUserAppointments(@PathVariable Integer userID) {
        try {
            List<Appointment> appointments = appointmentService.getUserAppointments(userID);
            return ResponseEntity.ok(new ApiResponse<>(appointments, "User appointments retrieved successfully", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    //View Appointments by Date
    @GetMapping("/date/{date}")
    public ResponseEntity<ApiResponse<List<Appointment>>> getAppointmentsByDate(
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        try {
            List<Appointment> appointments = appointmentService.getAppointmentsByDate(date);
            return ResponseEntity.ok(new ApiResponse<>(appointments, "Appointments for the date retrieved", 200));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(null, "No appointments found for the given date", 404));
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<Appointment>>> getAppointmentsByStatus(
            @PathVariable String status) {
        try {
            Appointment.AppointmentStatus statusEnum = Appointment.AppointmentStatus.valueOf(status.toUpperCase());
            List<Appointment> appointments = appointmentService.getAppointmentsByStatus(statusEnum);
            return ResponseEntity.ok(new ApiResponse<>(appointments, "Appointments with status retrieved", 200));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(null, "Invalid status value", 400));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(null, "No appointments found with the given status", 404));
        }
    }

    //Creating Appointments
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

    //Update appointment
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Appointment>> updateAppointment(
            @PathVariable("id") Integer aptID,
            @RequestBody AppointmentDTO updateDTO){
        try{
            Appointment updated = appointmentService.updateAppointment(aptID, updateDTO);
            return ResponseEntity.ok(new ApiResponse<>(updated, "Appointment updated successfully", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }

    //Delete Appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAppointment(@PathVariable("id") Integer aptID) {
        try {
            appointmentService.deleteAppointment(aptID);
            return ResponseEntity.ok(new ApiResponse<>(null, "Appointment deleted successfully", 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(null, e.getMessage(), 400));
        }
    }
}
