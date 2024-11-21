import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './patient-header.component.html',
  // styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent {
  userProfileImage = 'assets/images/default_pfp.jpg';
}
