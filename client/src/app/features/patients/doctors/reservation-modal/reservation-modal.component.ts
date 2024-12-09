import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Doctor } from '../../../../shared/models/types';

@Component({
    selector: 'reservation-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './reservation-modal.component.html',
})
export class ReservationModalComponent implements OnInit {
    @Input() isVisible = false;
    @Input() selectedDoctor: Doctor | null = null;
    @Output() confirm = new EventEmitter<void>();
    @Output() closeModal = new EventEmitter<void>();

    form: FormGroup;
    showConfirmation = false;
    showSuccess = false;
    appointmentDetails: any = null;

    constructor(
        private fb: FormBuilder, 
        private appointmentService: AppointmentService,
        private authService: AuthService
    ) {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        
        this.form = this.fb.group({
            name: ['', Validators.required],
            age: ['', [Validators.required, Validators.min(0)]],
            bday: ['', Validators.required],
            gender: ['', Validators.required],
            visit_date: [today, Validators.required], // Set default to today
            visit_time: ['08:00', Validators.required], 
            purpose: ['', Validators.required],
        });
    }

    ngOnInit() {
        // Load user data from auth service
        const user = this.authService.getCurrentUser();
        if (user) {
            this.form.patchValue({
                name: `${user.fname} ${user.lname}`,
                age: user.age,
                bday: user.birthday,
                gender: user.gender
            });
            
            // Disable fields that should be read-only
            this.form.get('name')?.disable();
            this.form.get('age')?.disable();
            this.form.get('bday')?.disable();
            this.form.get('gender')?.disable();
        }
    }

    onOutsideClick(event: MouseEvent): void {
        if (!(event.target instanceof HTMLElement && event.target.closest('.modal-content'))) {
            this.close();
        }
    }

    preventClose(event: MouseEvent): void {
        event.stopPropagation();
    }

    close() {
        this.closeModal.emit();
        this.showConfirmation = false;
    }

    onConfirm() {
        if (this.form.valid && this.selectedDoctor) {
            const formData = { ...this.form.getRawValue() }; // getRawValue includes disabled fields
            
            // Format dates
            const visitDate = new Date(formData.visit_date);
            const formattedVisitDate = visitDate.toISOString().split('T')[0];

            const payload = {
                userID: this.authService.getUserID(),
                doctorID: this.selectedDoctor.doctorID,
                visit_date: formattedVisitDate,
                visit_time: formData.visit_time,
                purpose: formData.purpose,
                status: 'SCHEDULED',
                is_deleted: false
            };

            this.appointmentDetails = {
                ...payload,
                doctorName: `Dr. ${this.selectedDoctor.fname} ${this.selectedDoctor.lname}`,
                specialty: this.selectedDoctor.specialty
            };

            this.showConfirmation = true;
        } else {
            this.form.markAllAsTouched();
        }
    }

    handleConfirmationConfirm() {
        if (this.appointmentDetails && this.selectedDoctor) {
            const formData = this.form.getRawValue();
            
            const payload = {
                doctorID: this.selectedDoctor.doctorID,
                userID: this.authService.getCurrentUser()?.userID,
                visitDate: formData.visit_date,
                visitTime: formData.visit_time,
                purpose: formData.purpose,
                status: "SCHEDULED",
                isDeleted: false
            };

            console.log('Sending payload:', payload);

            this.appointmentService.createAppointment(payload).subscribe({
                next: (response) => {
                    this.close;
                    this.showSuccess = true;
                    this.showConfirmation = false;
                    console.log('Appointment created successfully:', response);
                },
                error: (error) => {
                    console.error('Full error response:', error);
                    const errorMessage = error.error?.message || 'An error occurred while creating the appointment';
                    // Handle error (show to user)
                    console.error('Server error:', errorMessage);
                }
            });
        }
    }

    handleConfirmationCancel() {
        this.showConfirmation = false;
        this.close();
    }

    handleSuccessConfirm() {
        this.showSuccess = false;
        this.close();
        this.confirm.emit();

    }

    private formatDate(date: string): string {
        return new Date(date).toISOString().split('T')[0];
    }

    private formatTime(time: string): string {
        return time.substring(0, 5);
    }

}

