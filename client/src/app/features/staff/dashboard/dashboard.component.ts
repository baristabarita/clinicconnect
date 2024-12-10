import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../core/services/appointment.service';
import { UserService } from '../../../core/services/user.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { AppointmentWithUser } from '../../../shared/models/types';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats = {
    totalAppointments: 0,
    activeDoctors: 0,
    todayAppointments: 0,
    pendingAppointments: 0
  };
  
  recentAppointments: AppointmentWithUser[] = [];
  private appointmentsChart: Chart | null = null;
  private statusChart: Chart | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
    private doctorService: DoctorService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.loadDashboardStats();
    this.loadRecentAppointments();
    this.loadCharts();
  }

  private loadDashboardStats() {
    // Load total appointments
    this.appointmentService.getAppointments().subscribe(response => {
      this.stats.totalAppointments = response.data?.length || 0;
    });

    // Load active doctors
    this.doctorService.getDoctors().subscribe(response => {
      this.stats.activeDoctors = response.data?.filter(d => d.status === 'AVAILABLE').length || 0;
    });

    // Load today's appointments
    const today = new Date().toISOString().split('T')[0];
    this.appointmentService.getAppointmentsByDate(today).subscribe({
        next: (response) => {
            this.stats.todayAppointments = response.data?.length || 0;
        },
        error: (error) => {
            console.error('Error loading today\'s appointments:', error);
            this.stats.todayAppointments = 0;
        }
    });

    // Load pending appointments
    this.appointmentService.getAppointmentsByStatus('SCHEDULED').subscribe({
        next: (response) => {
            this.stats.pendingAppointments = response.data?.length || 0;
        },
        error: (error) => {
            console.error('Error loading pending appointments:', error);
            this.stats.pendingAppointments = 0;
        }
    });
  }

  private loadRecentAppointments() {
    this.appointmentService.getRecentAppointments().subscribe(response => {
      this.recentAppointments = (response.data || []).slice(0, 5);
    });
  }

  private loadCharts() {
    this.loadAppointmentsPerMonth();
    this.loadAppointmentStatus();
  }

  private loadAppointmentsPerMonth() {
    this.analyticsService.getAppointmentsPerMonth().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const ctx = document.getElementById('appointmentsChart') as HTMLCanvasElement;
          if (this.appointmentsChart) {
            this.appointmentsChart.destroy();
          }
          this.appointmentsChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: Object.keys(response.data),
              datasets: [{
                label: 'Number of Appointments',
                data: Object.values(response.data),
                backgroundColor: 'rgba(29, 53, 87, 0.6)',
                borderColor: 'rgb(29, 53, 87)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
      }
    });
  }

  private loadAppointmentStatus() {
    this.analyticsService.getAppointmentStatus().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
          if (this.statusChart) {
            this.statusChart.destroy();
          }
          this.statusChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: Object.keys(response.data),
              datasets: [{
                data: Object.values(response.data),
                backgroundColor: [
                  'rgba(144, 224, 239, 0.8)',
                  'rgba(29, 53, 87, 0.8)',
                  'rgba(241, 250, 238, 0.8)',
                  'rgba(230, 57, 70, 0.8)'
                ]
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
      }
    });
  }
}
