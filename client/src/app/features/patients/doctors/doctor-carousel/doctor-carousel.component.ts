import { CommonModule } from '@angular/common'; // Ensure this is imported in the right module
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor.service';
import { Doctor } from '../../../../shared/models/types';
import { DoctorCardComponent } from '../doctor-card/doctor-card.component';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-doctor-carousel',
  standalone: true,
  imports: [
    CommonModule, 
    DoctorCardComponent, 
    ReservationModalComponent
  ],
  templateUrl: './doctor-carousel.component.html',
  styleUrls: ['./doctor-carousel.component.css']
})

export class DoctorCarouselComponent implements OnInit {
  @Output() bookAppointmentEvent = new EventEmitter<Doctor>();
  @Input() selectedDoctor: Doctor | null = null;

  doctors: Doctor[] = [];
  currentIndex: number = 0;

  isModalVisible: boolean = false;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe(
      (response) => {
        if (response.data) {
          this.doctors = response.data;
        } else {
          this.doctors = [];
        }
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  moveRight() {
    if (this.currentIndex < this.doctors.length - 2) {
      this.currentIndex += 1;
    }
  }

  openModal(doctor: Doctor) {
    this.selectedDoctor = doctor; // Store the selected doctor
    this.isModalVisible = true;  // Show the modal
  }

  closeModal() {
    this.isModalVisible = false; // Hide the modal
    this.selectedDoctor = null; // Clear the selected doctor
  }

  handleConfirmation() {
    console.log('Appointment confirmed for:', this.selectedDoctor);
    this.closeModal();
  }

  // Event listener for the 'bookAppointmentEvent' emitted from 'DoctorCardComponent'
  onBookAppointment(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.isModalVisible = true;
    this.bookAppointmentEvent.emit(doctor);
    console.log('Appointment confirmed for:', this.selectedDoctor);
  
  }

}
