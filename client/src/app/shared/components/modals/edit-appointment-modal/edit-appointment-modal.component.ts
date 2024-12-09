import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { AppointmentWithUser } from '../../../models/types';


@Component({
  selector: 'app-edit-appointment-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-appointment-modal.component.html',
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

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.editForm.setValue({
      purpose: this.appointment.purpose || '',
      visitDate: this.appointment.visitDate ? new Date(this.appointment.visitDate).toISOString().split('T')[0] : '',
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

      this.appointmentService.updateAppointment(this.appointment.aptID!, updatedAppointment)
        .subscribe({
          next: () => {
            this.save.emit();
          },
          error: (error) => {
            console.error('Error updating appointment:', error);
            // You could add error handling UI feedback here
          }
        });
    }
  }
}