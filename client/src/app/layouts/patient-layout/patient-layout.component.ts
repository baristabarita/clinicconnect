import { Component } from '@angular/core';
import { PatientHeaderComponent } from '../../shared/components/header/patient-header/patient-header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-layout',
  standalone: true,
  imports: [
    PatientHeaderComponent, 
    FooterComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './patient-layout.component.html',
  // styleUrl: './patient-layout.component.css'
})
export class PatientLayoutComponent {

}
