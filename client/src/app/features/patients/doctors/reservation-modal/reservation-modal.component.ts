import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { Doctor } from '../../../../shared/models/types';

@Component({
    selector: 'reservation-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './reservation-modal.component.html',
})


export class ReservationModalComponent {
    @Input() isVisible = false;
    @Input() title = 'Modal Title';
    @Input() selectedDoctor: Doctor | null = null;
    @Output() confirm = new EventEmitter<void>();
    @Output() closeModal = new EventEmitter<void>();

    form: FormGroup;

    constructor(private fb: FormBuilder, private http: HttpClient, private appointmentService: AppointmentService) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            age: ['', [Validators.required, Validators.min(0)]],
            bday: ['', Validators.required],
            gender: ['', Validators.required],
            time: ['08:00', Validators.required], 
            purpose: ['', Validators.required],
        });
    }

    onOutsideClick(event: MouseEvent): void {
        console.log(this.selectedDoctor);
        // Only close the modal if the click was outside the modal content
        if (!(event.target instanceof HTMLElement && event.target.closest('.modal-content'))) {
            this.close();
        }
    }
    
    // Method to prevet closing the modal when clicking inside the modal content
    preventClose(event: MouseEvent): void {
        event.stopPropagation();
    }
    

    close() {
        this.closeModal.emit();
    }

    onConfirm() {
        if (this.form.valid && this.selectedDoctor) {
            const formData = { ...this.form.value };
            console.log('Form data:', this.form.value);
            
            // Format birthday to match backend expected format (yyyy-MM-dd)
            if (formData.bday) {
                const bdayDate = new Date(formData.bday);
                formData.bday = bdayDate.toISOString().split('T')[0];
            }

            const payload = {
                apiID: 'exampleApiID', // Replace with dynamic value
                userID: 'exampleUserID', // Replace with dynamic value
                doctorID: this.selectedDoctor.doctorID,
                visitDate: formData.bday,
                visitTime: formData.time,
                purpose: formData.purpose,
                status: 'SCHEDULED',
                isDeleted: false,
            };
-
            console.log('Submitting payload:', payload);

            this.appointmentService.createAppointment(payload).subscribe({
                next: (response) => {
                    console.log('Appointment created successfully:', response);
                    this.confirm.emit(); // Notify parent component
                },
                error: (error) => {
                    console.error('Error submitting appointment:', error);
                },
            });
        } else {
            this.form.markAllAsTouched(); // Highlight invalid fields
            console.error('Form is invalid');
        }
    }
    
}
