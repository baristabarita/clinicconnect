import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterData
} from '../../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private userSubject = new BehaviorSubject<AuthResponse | null>(null);
  user$ = this.userSubject.asObservable();
  private currentUser: any = null;
  private authToken: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserData();
  }

  private loadUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        this.currentUser = parsed.data;
        this.authToken = parsed.data?.token || null;
      } catch (e) {
        console.error('Error parsing user data:', e);
        this.logout(); // Clear invalid data
      }
    }
  }

  login(credentials: LoginCredentials): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, credentials);
  }

  setAuthData(response: ApiResponse<AuthResponse>) {
    if (response?.data) {
      this.currentUser = response.data;
      this.authToken = response.data.token;
      localStorage.setItem('userData', JSON.stringify(response));
      console.log('Auth data set:', { user: this.currentUser, token: this.authToken });
    }
  }

  register(userData: RegisterData): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            this.userSubject.next(response.data);
            this.redirectBasedOnRole(response.data.userType);
          }
        })
      );
  }

  logout() {
    this.currentUser = null;
    this.authToken = null;
    localStorage.removeItem('userData');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  private redirectBasedOnRole(userType: string) {
    switch (userType) {
      case 'STAFF':
        this.router.navigate(['/staff/dashboard']);
        break;
      case 'PATIENT':
        this.router.navigate(['/patient/home']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): AuthResponse | null {
    if (!this.currentUser) {
      this.loadUserData();
    }
    return this.currentUser;
  }

  getUserID(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.userID; // Adjust based on your token structure
    }
    return null;
  }

  getToken(): string | null {
    if (!this.authToken) {
      this.loadUserData();
    }
    return this.authToken;
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1]; // Get the payload part of the JWT
    return JSON.parse(atob(payload)); // Decode and parse the payload
  }

}