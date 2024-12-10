import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  private appointmentsChart: Chart | null = null;
  private statusChart: Chart | null = null;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
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
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1
                  }
                }
              }
            }
          });
        }
      },
      error: (error) => console.error('Error fetching monthly data:', error)
    });
  }

  private loadAppointmentStatus() {
    this.analyticsService.getAppointmentStatus().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const ctx = document.getElementById('pendingAppointmentsChart') as HTMLCanvasElement;
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
                ],
                borderColor: [
                  'rgb(144, 224, 239)',
                  'rgb(29, 53, 87)',
                  'rgb(241, 250, 238)',
                  'rgb(230, 57, 70)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right'
                }
              }
            }
          });
        }
      },
      error: (error) => console.error('Error fetching status data:', error)
    });
  }
}
