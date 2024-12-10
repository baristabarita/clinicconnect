import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterLink, CommonModule, NotificationsComponent],
  templateUrl: './patient-header.component.html'
})
export class PatientHeaderComponent implements OnInit {
  userProfileImage = 'assets/images/default_pfp.jpg';
  isProfileMenuOpen = false;
  isNotificationsOpen = false;
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

  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
