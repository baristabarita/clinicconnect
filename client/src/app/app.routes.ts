import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { StaffLayoutComponent } from './layouts/staff-layout/staff-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { LandingComponent } from './features/home/landing/landing.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/staff/dashboard/dashboard.component';
import { AppointmentsComponent } from './features/staff/appointments/appointments.component';
import { DoctorsComponent } from './features/patients/doctors/doctors.component';
import { DoctorsListComponent } from './features/staff/doctors/doctors-list/doctors-list.component';
import { AddDoctorComponent } from './features/staff/doctors/add-doctor/add-doctor.component';
export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { 
        path: '', 
        component: LandingComponent,
        // canActivate: [authGuard],
        // data: { requiresGuest: true }
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'staff',
    component: StaffLayoutComponent,
    canActivate: [authGuard],
    data: { role: 'STAFF' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'doctors/add', component: AddDoctorComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'patient',
    component: PatientLayoutComponent,
    canActivate: [authGuard],
    data: { role: 'PATIENT' },
    children: [
      { path: 'home', component: LandingComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
