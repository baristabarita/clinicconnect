import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  isPatientLayout: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if current URL includes '/patient' to determine the layout
    this.isPatientLayout = this.router.url.includes('/patient');
  }
}
