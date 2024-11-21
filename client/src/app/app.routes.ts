import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { LandingComponent } from './features/home/landing/landing.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { StaffLayoutComponent } from './layouts/staff-layout/staff-layout.component';


export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: '',
                component: LandingComponent,
                pathMatch: 'full'
            },
            // {
            //     path: 'login',
            //     //component: UserLoginComponent
            // },
            // {
            //     path: 'register',
            //     //component: UserRegisterComponent
            // }
        ]
    },
    {
        path: 'patient',
        component: PatientLayoutComponent,
        children: [
          // Patient-specific routes
        ]
    },
    {
        path: 'staff',
        component: StaffLayoutComponent,
        children: [
          // Staff-specific routes
        ]
    },
    {
        path: '**', 
        redirectTo: '' // Redirect any unknown routes to the home page
    }
];
