import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentWithUser, UserType } from '../../../shared/models/types';
import { AppointmentService } from '../../../core/services/appointment.service';
import { UserService } from '../../../core/services/user.service';
import { ViewAppointmentModalComponent } from './view-appointment-modal.component';
import { EditAppointmentModalComponent } from './edit-appointment-modal.component';

@Component({
  selector: 'app-staff-appointments',
  templateUrl: './staff-appointments.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ViewAppointmentModalComponent, EditAppointmentModalComponent]
})
export class StaffAppointmentsComponent implements OnInit {
  appointments: AppointmentWithUser[] = [];
  filteredAppointments: AppointmentWithUser[] = [];
  isLoading = false;
  error: string | null = null;
  selectedAppointment: AppointmentWithUser | null = null;
  isEditModalOpen = false;
  isViewModalOpen = false;

  filterForm = new FormGroup({
    status: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService
  ){}

  // Mock data for appointments
  private mockAppointments: AppointmentWithUser[] = [
    {
      aptID: 1,
      userID: 101,
      doctorID: 201,
      purpose: 'Routine Checkup',
      visitDate: new Date('2023-10-15'),
      visitTime: '09:00',
      status: 'SCHEDULED',
      isDeleted: false,
      userDetails: {
        userID: 101,
        fname: 'John',
        lname: 'Doe',
        email: 'john.doe@example.com',
        userType: UserType.PATIENT
      }
    },
    {
      aptID: 2,
      userID: 102,
      doctorID: 202,
      purpose: 'Dental Cleaning',
      visitDate: new Date('2023-10-16'),
      visitTime: '10:30',
      status: 'CONFIRMED',
      isDeleted: false,
      userDetails: {
        userID: 102,
        fname: 'Jane',
        lname: 'Smith',
        email: 'jane.smith@example.com',
        userType: UserType.PATIENT
      }
    },
    // Add more mock appointments as needed
  ];

  ngOnInit(){
    this.loadAppointments();
  }

  loadAppointments(){
    this.isLoading = true;
    // Simulate API call delay
    setTimeout(() => {
      this.appointments = this.mockAppointments;
      this.filteredAppointments = [...this.appointments];
      this.isLoading = false;
    }, 1000);
  }

  applyFilters() {
    const { status, startDate, endDate } = this.filterForm.value;
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchesStatus = status ? appointment.status === status : true;
      const matchesStartDate = startDate ? new Date(appointment.visitDate) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(appointment.visitDate) <= new Date(endDate) : true;
      return matchesStatus && matchesStartDate && matchesEndDate;
    });
  }

  viewAppointment(appointment: AppointmentWithUser) {
    this.selectedAppointment = appointment;
    this.isViewModalOpen = true;
  }

  editAppointment(appointment: AppointmentWithUser) {
    this.selectedAppointment = appointment;
    this.isEditModalOpen = true;
  }

  closeModal() {
    this.isViewModalOpen = false;
    this.isEditModalOpen = false;
    this.selectedAppointment = null;
  }

  deleteAppointment(appointment: AppointmentWithUser) {
    const confirmDelete = confirm(`Are you sure you want to delete Appointment ID: ${appointment.aptID}?`);
    if (confirmDelete) {
      this.filteredAppointments = this.filteredAppointments.filter(a => a.aptID !== appointment.aptID);
      this.appointments = this.appointments.filter(a => a.aptID !== appointment.aptID);
      alert(`Appointment ID: ${appointment.aptID} deleted successfully.`);
    }
  }
}