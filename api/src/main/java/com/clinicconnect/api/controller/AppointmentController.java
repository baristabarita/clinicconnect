package com.clinicconnect.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    // private final AppointmentService appointmentService;

    // @Autowired
    // public AppointmentController(AppointmentService appointmentService){
    //     this.appointmentService = appointmentService;
    // }

    // @PostMapping("/create")
    // public ResponseEntity<ApiResponse<Appointment>> createAppointment(@RequestBody AppointmentRequest request) {
    //     Appointment appointment = appointmentService.createAppointment(request);
    //     ApiResponse<Appointment> response = new ApiResponse<>(200, "Appointment created successfully", appointment);
    //     return ResponseEntity.ok(response);
    // }


    // @GetMapping("/list")
    // public ApiResponse<List<Appointment>> listAppointments() {
    //     List<Appointment> appointments = appointmentService.getAllAppointments();
    //     return new ApiResponse.ok(200, "Appointments retrieved successfully", appointments);
    // }


}
