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

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<ApiResponse<AuthResponse>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/login`, credentials, { 
      headers, 
      responseType: 'text' 
    }).pipe(
      map(token => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const response: ApiResponse<AuthResponse> = {
          status: 200,
          data: {
            token: token,
            userType: payload.userType,
            email: payload.sub,
            // userid: payload.userod,
            fname: payload.fname,
            lname: payload.lname,
            mname: payload.mname,
            contact: payload.contact,
            birthday: payload.birthday,
            age: payload.age,
            gender: payload.gender
          }
        };
        return response;
      }),
      tap(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.userSubject.next(response.data);
          this.redirectBasedOnRole(response.data.userType);
        }
      })
    );
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
    localStorage.removeItem('user');
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
    return !!this.userSubject.value;
  }

  getCurrentUser(): AuthResponse | null {
    return this.userSubject.value;
  }
}