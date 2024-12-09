import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AuthService } from '../../../core/services/auth.service';

interface User {
  userID: number;
  fname: string;
  lname: string;
  email: string;
  userType: string;
}

interface Doctor {
  doctorID: number;
  fname: string;
  lname: string;
  email: string;
  specialty?: string;
  status?: string;
}

interface AppointmentWithUser {
  aptID: number;
  userID: number;
  doctorID: number;
  purpose: string;
  visitDate: Date;
  visitTime: string;
  status: string;
  isDeleted: boolean;
  userDetails: User;
  doctor: Doctor;
}

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-appointments.component.html',
})
export class PatientsAppointmentsComponent implements OnInit {
  appointments: AppointmentWithUser[] = [];
  filteredAppointments: AppointmentWithUser[] = [];
  isLoading = false;
  error: string | null = null;
  activeFilter: string = 'all';
  stats = {
    all: 0,
    scheduled: 0,
    confirmed: 0,
    completed: 0,
    canceled: 0
  };

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

    // Mock data for appointments
    this.appointments = [
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
          userType: 'PATIENT'
        },
        doctor: {
          doctorID: 201,
          fname: 'Dr. Smith',
          lname: 'Johnson',
          email: 'dr.smith@example.com'
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
          userType: 'PATIENT'
        },
        doctor: {
          doctorID: 202,
          fname: 'Dr. Brown',
          lname: 'Williams',
          email: 'dr.brown@example.com'
        }
      }
    ];

    this.filteredAppointments = [...this.appointments];
    this.updateStats();
    this.isLoading = false;
  }

  updateStats() {
    this.stats = {
      all: this.appointments.length,
      scheduled: this.appointments.filter(apt => apt.status === 'SCHEDULED').length,
      confirmed: this.appointments.filter(apt => apt.status === 'CONFIRMED').length,
      completed: this.appointments.filter(apt => apt.status === 'COMPLETED').length,
      canceled: this.appointments.filter(apt => apt.status === 'CANCELED').length
    };
  }

  filterAppointments(status: string) {
    this.activeFilter = status;
    if (status === 'all') {
      this.filteredAppointments = [...this.appointments];
    } else {
      this.filteredAppointments = this.appointments.filter(appointment => appointment.status === status);
    }
  }
}