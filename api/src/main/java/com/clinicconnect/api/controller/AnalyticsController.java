package com.clinicconnect.api.controller;

import com.clinicconnect.api.dto.AnalyticsDTO;
import com.clinicconnect.api.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/appointments-per-month")
    public ResponseEntity<AnalyticsDTO> getAppointmentsPerMonth() {
        return ResponseEntity.ok(AnalyticsDTO.success(analyticsService.getAppointmentsPerMonth()));
    }

    @GetMapping("/pending-appointments")
    public ResponseEntity<AnalyticsDTO> getPendingAppointments() {
        return ResponseEntity.ok(AnalyticsDTO.success(analyticsService.getPendingAppointments()));
    }
}
