import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentWithUser } from '../../../shared/models/types';
import { AppointmentService } from '../../../core/services/appointment.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-staff-appointments',
  templateUrl: './staff-appointments.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class StaffAppointmentsComponent {
  appointments: AppointmentWithUser[] = [];
  isLoading = false;
  error: string | null = null;

  filterForm = new FormGroup({
    status: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService
  ){}

  ngOnInit(){
    this.loadAppointments();
  }

  loadAppointments(){
    this.isLoading = true;
    this.appointmentService.getRecentAppointments().subscribe({
      next: (response) => {
        this.appointments = response.data || [];
        this.appointments.forEach(appointment => {
          this.userService.getUserById(appointment.userID).subscribe(user => {
            (appointment as AppointmentWithUser).userDetails = user;
          });
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    });
  }

  applyFilters(){
    const filters = {
      status: this.filterForm.value.status || undefined,
      startDate: this.filterForm.value.startDate || undefined,
      endDate: this.filterForm.value.endDate || undefined
    };
    
    this.isLoading = true;

    this.appointmentService.getFilteredAppointments(filters).subscribe({
      next: (response) => {
        this.appointments = response.data || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    });    
  }
}