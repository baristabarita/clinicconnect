import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doctor, DoctorAvailability } from '../../../models/types';
import { DoctorService } from '../../../../core/services/doctor.service';

type AvailabilityType = 'AVAILABLE' | 'ON_LEAVE' | 'PARTIALLY_AVAILABLE';
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
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      availabilityType: ['AVAILABLE', Validators.required],
      notes: ['']
    });
  }

  ngOnChanges() {
    if (this.availability) {
      this.availabilityForm.patchValue({
        startDate: this.formatDate(this.availability.startDate),
        endDate: this.formatDate(this.availability.endDate),
        availabilityType: this.availability.availabilityType,
        notes: this.availability.notes
      });
    } else {
      this.availabilityForm.reset({
        availabilityType: 'AVAILABLE'
      });
    }
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  setAvailabilityType(type: AvailabilityType): void {
    this.availabilityForm.patchValue({ availabilityType: type });
  }

  getNotesPlaceholder(): string {
    const type = this.availabilityForm.get('availabilityType')?.value;
    switch (type) {
      case 'ON_LEAVE':
        return 'Please specify the reason for leave...';
      case 'PARTIALLY_AVAILABLE':
        return 'Please specify available hours or any restrictions...';
      default:
        return 'Add any additional notes about availability...';
    }
  }

  private formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return date;
  }

  onSubmit(): void {
    if (this.availabilityForm.valid && this.doctor) {
      this.isLoading = true;
      const formData = this.availabilityForm.value;
      
      const availability: DoctorAvailability = {
        ...(this.availability?.availabilityID && { availabilityID: this.availability.availabilityID! }),
        doctorID: this.doctor.doctorID as number,
        startDate: formData.startDate,
        endDate: formData.endDate,
        availabilityType: formData.availabilityType,
        notes: formData.notes,
        doctor: this.doctor
      };
  
      this.doctorService.addDoctorAvailability(this.doctor.doctorID as number, availability).subscribe({
        next: (response) => {
          this.saveAvailability.emit(availability);
          this.closeModal.emit();
        },
        error: (error) => {
          this.error = error.message;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}