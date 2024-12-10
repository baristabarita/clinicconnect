package com.clinicconnect.api.service;

import com.clinicconnect.api.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

public class AnalyticsService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Fetch number of appointments per month
    public Map<String, Integer> getAppointmentsPerMonth() {
        Map<String, Integer> data = new HashMap<>();
        var results = appointmentRepository.findAppointmentsPerMonth();

        for (Object[] row : results) {
            String month = (String) row[0];
            Integer count = ((Number) row[1]).intValue();
            data.put(month, count);
        }

        return data;
    }

    // Fetch pending appointments
    public Map<String, Integer> getPendingAppointments() {
        Map<String, Integer> data = new HashMap<>();
        var results = appointmentRepository.findPendingAppointments();

        for (Object[] row : results) {
            String status = (String) row[0];
            Integer count = ((Number) row[1]).intValue();
            data.put(status, count);
        }

        return data;
    }
}
