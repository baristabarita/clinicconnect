import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ApiResponse, Appointment } from '../../shared/models/types'; // Adjust the import path as necessary
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = 'http://localhost:8080/api/appointments';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    /**
     * Create a new appointment
     * @param appointmentData Appointment payload
     */
    createAppointment(appointmentData: any): Observable<ApiResponse<any>> {
        const token = this.authService.getToken();
        
        if (!token) {
            console.error('Authentication token not found');
            return throwError(() => new Error('Please log in again'));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        console.log('Token being sent:', token);
        console.log('Full headers:', headers.keys().map(key => `${key}: ${headers.get(key)}`));
        console.log('Appointment data:', appointmentData);

        return this.http.post<ApiResponse<any>>(this.apiUrl, appointmentData, { headers })
            .pipe(
                catchError(error => {
                    console.error('Full error response:', error);
                    if (error.error?.message) {
                        return throwError(() => new Error(error.error.message));
                    }
                    return throwError(() => error);
                })
            );
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
