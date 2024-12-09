import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DoctorAvailability, Appointment } from '../../../models/types';

@Component({
  selector: 'app-event-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail-modal.component.html',
  // styleUrl: './event-detail-modal.component.css'
})
export class EventDetailModalComponent {
  @Input() availability?: DoctorAvailability;
  @Input() appointment?: Appointment;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  close(){
    this.closeModal.emit();
  }
}
