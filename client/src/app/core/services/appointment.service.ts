import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/types'; // Adjust the import path as necessary

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = 'http://localhost:8080/api/appointments';

    constructor(private http: HttpClient) {}

    /**
     * Create a new appointment
     * @param appointmentData Appointment payload
     */
    createAppointment(appointmentData: any): Observable<ApiResponse<any>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<ApiResponse<any>>(`${this.apiUrl}`, appointmentData, { headers });
    }

    /**
     * Get all appointments
     */
    getAppointments(): Observable<ApiResponse<any[]>> {
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}`);
    }

    /**
     * Get a specific appointment by ID
     * @param id Appointment ID
     */
    getAppointmentById(id: string): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }

    /**
     * Update an appointment
     * @param id Appointment ID
     * @param updates Update payload
     */
    updateAppointment(id: string, updates: any): Observable<ApiResponse<any>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, updates, { headers });
    }

    /**
     * Delete an appointment
     * @param id Appointment ID
     */
    deleteAppointment(id: string): Observable<ApiResponse<any>> {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
    }
}
