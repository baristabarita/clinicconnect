import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { StaffLayoutComponent } from './layouts/staff-layout/staff-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { LandingComponent } from './features/home/landing/landing.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/staff/dashboard/dashboard.component';
import { RecentAppointmentsComponent } from './features/staff/appointments/appointments.component';
import { DoctorsComponent } from './features/patients/doctors/doctors.component';
import { DoctorsListComponent } from './features/staff/doctors/doctors-list/doctors-list.component';
import { AddDoctorComponent } from './features/staff/doctors/add-doctor/add-doctor.component';
import { CalendarComponent } from './features/staff/calendar/calendar.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
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
      { path: 'appointments', component: RecentAppointmentsComponent },
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'doctors/add', component: AddDoctorComponent },
      { path: 'calendar', component: CalendarComponent },
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
      { path: 'doctors', component: DoctorsComponent },
      { path: 'appointments', component: RecentAppointmentsComponent },
      { path: 'recent-appointments', component: RecentAppointmentsComponent }, 
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
