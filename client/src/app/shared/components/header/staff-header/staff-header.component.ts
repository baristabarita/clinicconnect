import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'app-staff-header',
  standalone: true,
  imports: [CommonModule, NotificationsComponent],
  templateUrl: './staff-header.component.html',
  // styleUrl: './staff-header.component.css'
})
export class StaffHeaderComponent {
  userProfileImage = 'assets/images/default_pfp.jpg';
  isNotificationsOpen = false;

  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}
