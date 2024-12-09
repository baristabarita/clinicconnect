import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentWithUser } from '../../../shared/models/types';

@Component({
  selector: 'app-view-appointment-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50" *ngIf="appointment">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="modal-header flex justify-between items-center">
          <h4 class="modal-title text-lg font-bold">Appointment Details</h4>
          <button type="button" class="text-gray-500 hover:text-gray-700" aria-label="Close" (click)="close.emit()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mt-4">
          <p class="mb-2"><strong>ID:</strong> {{appointment.aptID}}</p>
          <p class="mb-2"><strong>Patient Name:</strong> {{appointment.userDetails?.fname}} {{appointment.userDetails?.lname}}</p>
          <p class="mb-2"><strong>Purpose:</strong> {{appointment.purpose}}</p>
          <p class="mb-2"><strong>Visit Date:</strong> {{appointment.visitDate | date}}</p>
          <p class="mb-2"><strong>Status:</strong> {{appointment.status}}</p>
        </div>
        <div class="modal-footer mt-4 flex justify-end">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" (click)="close.emit()">Close</button>
        </div>
      </div>
    </div>
  `
})
export class ViewAppointmentModalComponent {
  @Input() appointment!: AppointmentWithUser;
  @Output() close = new EventEmitter<void>();
}