import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonBaseComponent } from '../skeleton-base/skeleton-base.component';

@Component({
  selector: 'app-dashboard-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonBaseComponent],
  templateUrl: './dashboard-skeleton.component.html',
})
export class DashboardSkeletonComponent {

}
