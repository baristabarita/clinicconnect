import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  // styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = signal(false);
  
  @Output() sidebarToggled = new EventEmitter<boolean>();
  
  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
    this.sidebarToggled.emit(this.isCollapsed());
  }

  logout() {
    // Implement logout logic here
    this.authService.logout();
  }
}
