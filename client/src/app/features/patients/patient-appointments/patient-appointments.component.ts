import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AuthService } from '../../../core/services/auth.service';
import { ViewAppointmentModalComponent } from '../../../shared/components/modals/view-appointment-modal/view-appointment-modal.component'; 
import { User, Doctor, AppointmentWithUser } from '../../../shared/models/types';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule, ViewAppointmentModalComponent],
  templateUrl: './patient-appointments.component.html',
})
export class PatientsAppointmentsComponent implements OnInit {
  appointments: AppointmentWithUser[] = [];
  filteredAppointments: AppointmentWithUser[] = [];
  paginatedAppointments: AppointmentWithUser[] = [];
  selectedAppointment: AppointmentWithUser | null = null;
  isViewModalOpen = false;
  activeFilter: string = 'all';
  stats = {
    all: 0,
    scheduled: 0,
    confirmed: 0,
    completed: 0,
    canceled: 0,
    rescheduled: 0
  };
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  isLoading = false;
  error: string | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    const userID = this.authService.getUserID();

    if (!userID) {
      this.error = 'User not authenticated';
      this.isLoading = false;
      return;
    }

    this.appointmentService.getUserAppointments(userID).subscribe({
      next: (response) => {
        this.appointments = response.data || [];
        this.filterAppointments('all');
        this.updateStats();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    });
  }

  filterAppointments(status: string) {
    this.activeFilter = status;
    if (status === 'all') {
      this.filteredAppointments = [...this.appointments];
    } else {
      this.filteredAppointments = this.appointments.filter(
        appointment => appointment.status === status.toUpperCase()
      );
    }
    this.currentPage = 1;
    this.updatePagination();
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


  //Opens the appointment modal
  viewAppointment(appointment: AppointmentWithUser) {
    this.selectedAppointment = appointment;
    this.isViewModalOpen = true;
  }

  closeViewModal() {
      this.isViewModalOpen = false;
      this.selectedAppointment = null;
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAppointments = this.filteredAppointments.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}