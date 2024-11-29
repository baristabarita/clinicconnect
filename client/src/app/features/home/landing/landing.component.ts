import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './landing.component.html',
  // styleUrl: './landing.component.css'
})
export class LandingComponent {

}
