import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../../../core/services/doctor.service';
import { Doctor, DoctorAvailability } from '../../../../shared/models/types';
import { AvailabilityModalComponent } from '../../../../shared/components/modals/availability-modal/availability-modal.component';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, RouterLink, AvailabilityModalComponent],
  templateUrl: './doctors-list.component.html'
})
export class DoctorsListComponent implements OnInit {
  doctors: Doctor[] = [];
  isLoading = true;
  error: string | null = null;
  selectedDoctor: Doctor | null = null;
  showAvailabilityModal = false;
  selectedAvailability: DoctorAvailability | undefined;
  availabilities: Record<number, DoctorAvailability[]> = {};

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe({
      next: (response) => {
        this.doctors = response.data || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load doctors';
        this.isLoading = false;
      }
    });
  }

  openAvailabilityModal(doctor: Doctor, availability?: DoctorAvailability) {
    this.selectedDoctor = doctor;
    this.selectedAvailability = availability;
    this.showAvailabilityModal = true;
  }

  loadDoctorAvailability(doctorId: number) {
    this.doctorService.getDoctorAvailability(doctorId).subscribe({
      next: (response) => {
        this.availabilities[doctorId] = response.data || [];
      },
      error: (error) => {
        console.error('Failed to load availability:', error);
      }
    });
  }

  onAvailabilityUpdated() {
    if (this.selectedDoctor) {
      this.loadDoctorAvailability(this.selectedDoctor.doctorID!);
    }
  }
}