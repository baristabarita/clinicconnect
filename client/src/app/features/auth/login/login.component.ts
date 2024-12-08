import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ApiResponse, AuthResponse, LoginCredentials, UserType } from '../../../shared/models/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response: ApiResponse<AuthResponse>) => {
          console.log('Full login response:', response); // Debug log
          console.log('User data:', response.data); // Debug log

          
          if (response.data?.userType === UserType.STAFF) {
            this.router.navigate(['/staff/dashboard']);
          } else {
            this.router.navigate(['/patient/home']);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.error = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }
}
