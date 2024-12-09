import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppointmentWithUser } from '../../../shared/models/types';

@Component({
  selector: 'app-edit-appointment-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50" *ngIf="appointment">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="modal-header flex justify-between items-center">
          <h4 class="modal-title text-lg font-bold">Edit Appointment</h4>
          <button type="button" class="text-gray-500 hover:text-gray-700" aria-label="Close" (click)="close.emit()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mt-4">
          <form [formGroup]="editForm">
            <div class="form-group mb-4">
              <label for="purpose" class="block text-sm font-medium text-gray-700"><strong>Purpose</strong></label>
              <input id="purpose" type="text" formControlName="purpose" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
            <div class="form-group mb-4">
              <label for="visitDate" class="block text-sm font-medium text-gray-700"><strong>Visit Date</strong></label>
              <input id="visitDate" type="date" formControlName="visitDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
            <div class="form-group mb-4">
              <label for="status" class="block text-sm font-medium text-gray-700"><strong>Status</strong></label>
              <select id="status" formControlName="status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option value="SCHEDULED">Scheduled</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer mt-4 flex justify-end space-x-2">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" (click)="close.emit()">Cancel</button>
          <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" (click)="onSave()">Save</button>
        </div>
      </div>
    </div>
  `
})
export class EditAppointmentModalComponent implements OnInit {
  @Input() appointment!: AppointmentWithUser;
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  editForm = new FormGroup({
    purpose: new FormControl('', Validators.required),
    visitDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.editForm.setValue({
      purpose: this.appointment.purpose || '',
      visitDate: this.appointment.visitDate ? this.appointment.visitDate.toISOString().split('T')[0] : '',
      status: this.appointment.status || ''
    });
  }

  onSave() {
    if (this.editForm.valid) {
      const updatedAppointment = {
        ...this.appointment,
        ...this.editForm.value,
        visitDate: new Date(this.editForm.value.visitDate || '')
      };
      // Here you would typically send the updated appointment to the server
      console.log('Updated Appointment:', updatedAppointment);
      this.save.emit();
    }
  }
}