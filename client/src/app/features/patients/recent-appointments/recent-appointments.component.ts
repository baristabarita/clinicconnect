import { Component, OnInit } from '@angular/core';

interface Appointment {
  id: number;
  title: string;
  date: Date;
  doctor: string;
}

@Component({
  selector: 'app-recent-appointments',
  templateUrl: './recent-appointments.component.html',
})
export class RecentAppointmentsComponent implements OnInit {
  recentAppointments: Appointment[] = [
    { id: 1, title: 'Dental Checkup', date: new Date('2024-12-01'), doctor: 'Dr. Smith' },
    { id: 2, title: 'Eye Test', date: new Date('2024-11-15'), doctor: 'Dr. Johnson' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onFilterChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    // Add logic to filter appointments based on the selected date
  }
}
