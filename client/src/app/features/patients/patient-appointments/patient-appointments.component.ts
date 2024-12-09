import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../shared/models/types';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-appointments.component.html',
})
export class PatientsAppointmentsComponent implements OnInit{
  appointments: Appointment[] = [];
  isLoading = false;
  error: string | null = null;
  activeFilter: string = 'all';
  stats = {
    all: 0,
    scheduled: 0,
    confirmed: 0,
    completed: 0,
    canceled: 0,
    rescheduled: 0
  };
  
  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ){}

  ngOnInit(){
    this.loadAppointments();
  }

  loadAppointments(status?: string){
    this.isLoading = true;
    const userID = this.authService.getUserID();

    if(!userID){
      this.error = 'User not authenticated';
      return;
    }

    // Add userID to filters
    const filters = {
      userID: userID,
      status: status === 'all' ? undefined : status
    };

    this.appointmentService.getFilteredAppointments(filters).subscribe({
      next: (response) => {
        this.appointments = response.data || [];
        this.updateStats();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    });
  }

  updateStats() {
    this.stats = {
      all: this.appointments.length,
      scheduled: this.appointments.filter(apt => apt.status === 'SCHEDULED').length,
      confirmed: this.appointments.filter(apt => apt.status === 'CONFIRMED').length,
      completed: this.appointments.filter(apt => apt.status === 'COMPLETED').length,
      canceled: this.appointments.filter(apt => apt.status === 'CANCELED').length,
      rescheduled: this.appointments.filter(apt => apt.status === 'RESCHEDULED').length
    };
  }

  filterAppointments(status: string) {
    this.activeFilter = status;
    const userID = this.authService.getUserID();
    
    if (!userID) {
      this.error = 'User not authenticated';
      return;
    }
  
    const filters = {
      userID,
      status: status === 'all' ? undefined : status
    };
  
    this.loadAppointments(status);
  }
}

