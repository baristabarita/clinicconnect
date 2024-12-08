import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
      mname: [''],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      birthday: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['PATIENT', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.errors) {
      if (control.errors['required']) return `${field} is required`;
      if (control.errors['email']) return 'Invalid email format';
      if (control.errors['minlength']) return `${field} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['min']) return `${field} must be a positive number`;
      if (control.errors['pattern']) return 'Invalid contact number format';
    }
    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = '';
      
      // Create a copy of the form value and format the data
      const formData = { ...this.registerForm.value };
      delete formData.confirmPassword;
      
      // Format birthday to match backend expected format (yyyy-MM-dd)
      if (formData.birthday) {
        formData.birthday = new Date(formData.birthday)
          .toISOString().split('T')[0];
      }

      this.authService.register(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Redirect to login page
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.message || 'Registration failed. Please try again later.';
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
