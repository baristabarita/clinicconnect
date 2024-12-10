package com.clinicconnect.api.dto;

import lombok.Data;

import java.util.Map;

@Data
public class AnalyticsDTO {
    private Map<String, Integer> data;
    private String message;
    private boolean success;

    public static AnalyticsDTO success(Map<String, Integer> data) {
        AnalyticsDTO dto = new AnalyticsDTO();
        dto.setData(data);
        dto.setSuccess(true);
        dto.setMessage("Data fetched successfully");
        return dto;
    }

    public Map<String, Integer> getData() {
        return data;
    }

    public void setData(Map<String, Integer> data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
