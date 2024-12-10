package com.clinicconnect.api.controller;

import com.clinicconnect.api.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/api/appointments-per-month")
    public Map<String, Integer> getAppointmentsPerMonth() {
        return analyticsService.getAppointmentsPerMonth();
    }

    @GetMapping("/api/pending-appointments")
    public Map<String, Integer> getPendingAppointments() {
        return analyticsService.getPendingAppointments();
    }
}
