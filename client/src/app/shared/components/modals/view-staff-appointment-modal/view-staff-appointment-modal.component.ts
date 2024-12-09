import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentWithUser } from '../../../models/types';

@Component({
  selector: 'app-view-staff-appointment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-staff-appointment-modal.component.html',
})
export class ViewStaffAppointmentModalComponent {
  @Input() appointment!: AppointmentWithUser;
  @Output() close = new EventEmitter<void>();
}
