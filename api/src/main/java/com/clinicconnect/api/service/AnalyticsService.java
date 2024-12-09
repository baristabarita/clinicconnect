package com.clinicconnect.api.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

public class AnalyticsService {
    public Map<String, Integer> getAppointmentsPerMonth() {
        Map<String, Integer> data = new HashMap<>();
        String url = "jdbc:mysql://localhost:3306/clinic_db";
        String username = "root";
        String password = "root";

        String query = "SELECT MONTHNAME(appointment_date) AS month, COUNT(*) AS count " +
                "FROM appointment " +
                "GROUP BY MONTH(appointment_date), MONTHNAME(appointment_date) " +
                "ORDER BY MONTH(appointment_date);";

        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement statement = conn.prepareStatement(query);
             ResultSet rs = statement.executeQuery()) {

            while (rs.next()) {
                String month = rs.getString("month");
                int count = rs.getInt("count");
                data.put(month, count);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return data;
    }
}
