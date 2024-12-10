package com.clinicconnect.api.service;

import com.clinicconnect.api.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Map<String, Integer> getAppointmentsPerMonth() {
        try {
            Map<String, Integer> data = new HashMap<>();
            var results = appointmentRepository.findAppointmentsPerMonth();

            if (results.isEmpty()) {
                // Return empty data for months if no appointments
                String[] months = {"January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"};
                for (String month : months) {
                    data.put(month, 0);
                }
            } else {
                for (Object[] row : results) {
                    String month = (String) row[0];
                    Integer count = ((Number) row[1]).intValue();
                    data.put(month, count);
                }
            }

            return data;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching appointments per month", e);
        }
    }

    public Map<String, Integer> getPendingAppointments() {
        try {
            Map<String, Integer> data = new HashMap<>();
            var results = appointmentRepository.findPendingAppointments();

            if (results.isEmpty()) {
                // Initialize with zero counts if no data
                data.put("SCHEDULED", 0);
                data.put("CONFIRMED", 0);
                data.put("COMPLETED", 0);
                data.put("CANCELLED", 0);
            } else {
                for (Object[] row : results) {
                    String status = (String) row[0];
                    Integer count = ((Number) row[1]).intValue();
                    data.put(status, count);
                }
            }

            return data;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching appointment status counts", e);
        }
    }
}

