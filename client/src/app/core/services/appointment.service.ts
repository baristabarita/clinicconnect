import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    //Create appointments
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

        const userID = this.authService.getUserID();
        appointmentData.userID = userID;

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

    // Method to get all appointments
    getAppointments(): Observable<ApiResponse<Appointment[]>> {
        const token = this.authService.getToken();
        
        if (!token) {
            console.error('Authentication token not found');
            return throwError(() => new Error('Please log in again'));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<ApiResponse<Appointment[]>>(`${this.apiUrl}/recent`, { headers })
            .pipe(
                catchError(error => {
                    console.error('Error fetching appointments:', error);
                    return throwError(() => new Error('Failed to fetch appointments'));
                })
            );
    }

    //get RECENT appointments
    getRecentAppointments(): Observable<ApiResponse<Appointment[]>>{
        return this.http.get<ApiResponse<Appointment[]>>(`${this.apiUrl}/recent`);
    }

    //get FILTERED appointments
    getFilteredAppointments(filters: {
        userID?: number;
        status?: string;
        startDate?: string;
        endDate?: string;
    }): Observable<ApiResponse<Appointment[]>>{
        let params = new HttpParams();

        if (filters.userID) params = params.append('userID', filters.userID.toString());
        if (filters.status) params = params.append('status', filters.status);
        if (filters.startDate) params = params.append('startDate', filters.startDate);
        if (filters.endDate) params = params.append('endDate', filters.endDate);

        return this.http.get<ApiResponse<Appointment[]>>(`${this.apiUrl}/filter`, {params});
    }    
}
