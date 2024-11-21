import { Component } from '@angular/core';
import { PublicHeaderComponent } from '../../shared/components/header/public-header/public-header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    PublicHeaderComponent,
    FooterComponent,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './public-layout.component.html',
  // styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {

}
