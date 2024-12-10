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

  formatStatus(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }

  formatAvailabilityType(type: string): string {
    return type
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }

  formatTime(time: string): string {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
