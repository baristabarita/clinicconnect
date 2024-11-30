import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../../../../core/services/doctor.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-doctor.component.html'
})
export class AddDoctorComponent {
  doctorForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
      mname: [''],
      email: ['', [Validators.required, Validators.email]],
      specialty: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      this.isLoading = true;
      this.doctorService.addDoctor(this.doctorForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/staff/doctors']);
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to add doctor';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
