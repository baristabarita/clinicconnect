import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


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

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
    this.sidebarToggled.emit(this.isCollapsed());
  }

  logout() {
    // Implement logout logic here
    console.log('Logging out');
  }
}
