package com.clinicconnect.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AnalyticsController {
    @GetMapping("/api/anaytics")
    public Map<String, Integer> getAppointmentsPerMonth() {
        Map<String, Integer> data = new HashMap<>();
        //Replace with actual database logic later...
        data.put("January", 50);
        data.put("February", 75);
        data.put("March", 100);

        return data;
    }
}
