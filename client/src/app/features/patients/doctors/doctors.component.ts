import { Component } from '@angular/core';
import { DoctorCarouselComponent } from './doctor-carousel/doctor-carousel.component'; // Correct import
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [DoctorCarouselComponent, ReservationModalComponent],  // Ensure DoctorCarouselComponent is listed here
  templateUrl: './doctors.component.html',
  // styleUrl: './doctors.component.css'
})
export class DoctorsComponent {

}
