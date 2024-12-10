import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-base.component.html',
})
export class SkeletonBaseComponent {
  @Input() class: string = '';
  @Input() width: string = '100%';
  @Input() height: string = '20px';
}
