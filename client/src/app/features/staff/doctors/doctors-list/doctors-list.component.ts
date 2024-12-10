import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { DoctorService } from '../../../../core/services/doctor.service';
import { Doctor, DoctorAvailability } from '../../../../shared/models/types';
import { AvailabilityModalComponent } from '../../../../shared/components/modals/availability-modal/availability-modal.component';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, RouterLink, AvailabilityModalComponent, ReactiveFormsModule],
  templateUrl: './doctors-list.component.html'
})
export class DoctorsListComponent implements OnInit {
  doctors: Doctor[] = [];
  allDoctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;
  showAvailabilityModal = false;
  selectedAvailability: DoctorAvailability | undefined;
  availabilities: Record<number, DoctorAvailability[]> = {};
  isLoading = true;
  error: string | null = null;
  
  searchControl = new FormControl('');

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
    this.setupSearchSubscription();
  }

  loadDoctors() {
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe({
      next: (response) => {
        this.doctors = response.data || [];
        this.allDoctors = [...(response.data || [])];
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load doctors';
        this.isLoading = false;
      }
    });
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
  
  openAvailabilityModal(doctor: Doctor, availability?: DoctorAvailability) {
    this.selectedDoctor = doctor;
    this.selectedAvailability = availability;
    this.showAvailabilityModal = true;
  }

  onAvailabilityUpdated() {
    if (this.selectedDoctor) {
      this.loadDoctorAvailability(this.selectedDoctor.doctorID!);
    }
  }

  setupSearchSubscription() {
    this.searchControl.valueChanges.subscribe(searchTerm => {
      this.searchDoctors(searchTerm || '');
    });
  }


  searchDoctors(searchTerm: string) {
    if (!searchTerm) {
      this.doctors = [...this.allDoctors];
    } else {
      searchTerm = searchTerm.toLowerCase();
      this.doctors = this.allDoctors.filter(doctor => 
        doctor.fname?.toLowerCase().includes(searchTerm) ||
        doctor.lname?.toLowerCase().includes(searchTerm) ||
        doctor.email?.toLowerCase().includes(searchTerm) ||
        doctor.specialty?.toLowerCase().includes(searchTerm)
      );
    }
  }
}