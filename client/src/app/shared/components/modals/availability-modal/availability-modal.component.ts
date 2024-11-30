import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doctor, DoctorAvailability } from '../../../models/types';
import { DoctorService } from '../../../../core/services/doctor.service';

@Component({
  selector: 'app-availability-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './availability-modal.component.html'
})
export class AvailabilityModalComponent {
  @Input() doctor?: Doctor;
  @Input() availability?: DoctorAvailability;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveAvailability = new EventEmitter<DoctorAvailability>();

  availabilityForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {
    this.availabilityForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      availabilityType: [null, Validators.required],
    });
  }

  ngOnChanges() {
    if (this.availability) {
      this.availabilityForm.patchValue({
        startDate: this.availability.startDate,
        endDate: this.availability.endDate,
        availabilityType: this.availability.availabilityType,
        notes: this.availability.notes
      });
    } else {
      this.availabilityForm.reset({
        availabilityType: 'AVAILABLE'
      });
    }
  }

  onSubmit() {
    if (this.availabilityForm.valid) {
      this.isLoading = true;
      const availabilityData = {
        ...this.availabilityForm.value,
        doctorID: this.doctor?.doctorID
      };

      const request = this.availability 
        ? this.doctorService.updateDoctorAvailability(
            this.doctor?.doctorID!, 
            this.availability.availabilityID!, 
            availabilityData
          )
        : this.doctorService.addDoctorAvailability(
            this.doctor?.doctorID!, 
            availabilityData
          );
        request.subscribe({
          next: () => {
            this.isLoading = false;
            this.saveAvailability.emit();
            this.closeModal.emit();
          },
          error: (error) => {
            this.error = error.error?.message || 'Failed to save availability';
            this.isLoading = false;
        }
      });
    }
  }
}
