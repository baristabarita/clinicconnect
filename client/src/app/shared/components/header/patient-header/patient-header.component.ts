import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
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

  constructor(
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = `${user.fname || ''} ${user.lname || ''}`.trim();
    }
  }

  isActive(path: string): boolean {
    return this.location.path().includes(path);
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
