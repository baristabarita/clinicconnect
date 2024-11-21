import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './public-header.component.html',
  // styleUrl: './public-header.component.css'
})
export class PublicHeaderComponent {

}
