import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, ApiResponse, DoctorAvailability } from '../../shared/models/types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

  addDoctor(doctorData: Partial<Doctor>): Observable<ApiResponse<Doctor>> {
    return this.http.post<ApiResponse<Doctor>>(this.apiUrl, doctorData);
  }

  getDoctors(): Observable<ApiResponse<Doctor[]>> {
    return this.http.get<ApiResponse<Doctor[]>>(this.apiUrl);
  }

  getDoctorAvailability(doctorId: number): Observable<ApiResponse<DoctorAvailability[]>> {
    return this.http.get<ApiResponse<DoctorAvailability[]>>(`${this.apiUrl}/${doctorId}/availability`);
  }

  addDoctorAvailability(doctorId: number, availability: DoctorAvailability): Observable<ApiResponse<DoctorAvailability>> {
    return this.http.post<ApiResponse<DoctorAvailability>>(`${this.apiUrl}/${doctorId}/availability`, availability);
  }

  updateDoctorAvailability(doctorId: number, availabilityId: number, availability: DoctorAvailability): Observable<ApiResponse<DoctorAvailability>> {
    return this.http.put<ApiResponse<DoctorAvailability>>(`${this.apiUrl}/${doctorId}/availability/${availabilityId}`, availability);
  } 

  deleteDoctorAvailability(doctorId: number, availabilityId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${doctorId}/availability/${availabilityId}`);
  } 
} 