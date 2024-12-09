import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentWithUser } from '../../../models/types';

@Component({
  selector: 'app-view-appointment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-appointment-modal.component.html',
})
export class ViewAppointmentModalComponent {
  @Input() appointment!: AppointmentWithUser;
  @Output() close = new EventEmitter<void>();
}
