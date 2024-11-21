import { Component } from '@angular/core';
import { StaffHeaderComponent } from '../../shared/components/header/staff-header/staff-header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-staff-layout',
  standalone: true,
  imports: [
    StaffHeaderComponent,
    SidebarComponent,
    FooterComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './staff-layout.component.html',
  // styleUrl: './staff-layout.component.css'
})
export class StaffLayoutComponent {
  isCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }
}
