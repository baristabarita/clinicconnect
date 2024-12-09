import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../../../shared/models/types';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule, ReservationModalComponent],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})

export class DoctorCardComponent {
  @Input() doctor!: Doctor;
  @Output() bookAppointmentEvent = new EventEmitter<Doctor>();

  bookAppointment() {
    this.bookAppointmentEvent.emit(this.doctor);
  }

}