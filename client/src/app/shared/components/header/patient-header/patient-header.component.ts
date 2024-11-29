import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './patient-header.component.html'
})
export class PatientHeaderComponent implements OnInit {
  userProfileImage = 'assets/images/default_pfp.jpg';
  isProfileMenuOpen = false;
  userName = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = `${user.fname || ''} ${user.lname || ''}`.trim();
    }
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
