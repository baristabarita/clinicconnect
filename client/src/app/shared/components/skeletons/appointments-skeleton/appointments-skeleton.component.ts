import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonBaseComponent } from '../skeleton-base/skeleton-base.component';

@Component({
  selector: 'app-appointments-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonBaseComponent],
  templateUrl: './appointments-skeleton.component.html',
})
export class AppointmentsSkeletonComponent {

}
