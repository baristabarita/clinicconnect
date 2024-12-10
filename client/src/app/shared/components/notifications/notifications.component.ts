import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Notification } from '../../models/types';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  @Input() isOpen = false;
  @Input() userType: 'patient' | 'staff' = 'patient';

  notifications: Notification[] = this.getNotifications();

  ngOnInit() {
    // Initialize notifications based on userType
    this.notifications = this.getNotifications();
  }


  private getNotifications(): Notification[] {
    return this.userType === 'patient' ? this.getPatientNotifications() : this.getStaffNotifications();
  }

  private getPatientNotifications(): Notification[] {
    return [
      {
        id: 1,
        title: 'Appointment Confirmed',
        message: 'Your appointment with Dr. Smith has been confirmed for tomorrow at 2:00 PM',
        type: 'appointment',
        isRead: false,
        timestamp: new Date(),
        link: '/patient/appointments'
      },
      {
        id: 2,
        title: 'Appointment Reminder',
        message: 'Don\'t forget your appointment with Dr. Johnson in 2 hours',
        type: 'reminder',
        isRead: true,
        timestamp: new Date(Date.now() - 86400000),
        link: '/patient/appointments'
      }
    ];
  }

  private getStaffNotifications(): Notification[] {
    return [
      {
        id: 1,
        title: 'New Appointment Request',
        message: 'New appointment request from John Doe for Dr. Smith',
        type: 'appointment',
        isRead: false,
        timestamp: new Date(),
        link: '/staff/appointments'
      },
      {
        id: 2,
        title: 'Schedule Update',
        message: 'Dr. Johnson updated their availability for next week',
        type: 'system',
        isRead: false,
        timestamp: new Date(Date.now() - 3600000),
        link: '/staff/doctors'
      }
    ];
  }

  markAsRead(notification: Notification) {
    notification.isRead = true;
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }
}
