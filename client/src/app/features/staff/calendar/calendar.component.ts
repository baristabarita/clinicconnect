import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DoctorService } from '../../../core/services/doctor.service';
import { Doctor, DoctorAvailability } from '../../../shared/models/types';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  // styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
    calendarOptions: CalendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [],
      eventClick: this.handleEventClick.bind(this),
      editable: false,
      selectable: true,
    };

    doctors: Doctor[] = [];
    availabilities: DoctorAvailability[] = [];
    isLoading = true;
    error: string | null = null;
    
    constructor(private doctorService: DoctorService){}

    ngOnInit(): void {
      this.loadDoctors();
    }

    loadDoctors() {
      this.doctorService.getDoctors().subscribe({
        next: (response) => {
          this.doctors = response.data || [];
          console.log('Loaded doctors:', this.doctors);
          if (this.doctors.length > 0) {
            this.loadAllAvailabilities();
          } else {
            this.error = 'No doctors found';
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to load doctors';
          this.isLoading = false;
        }
      });
    }

    async loadAllAvailabilities() {
      const availabilityPromises = this.doctors.map(doctor =>
        firstValueFrom(this.doctorService.getDoctorAvailability(doctor.doctorID!))
      );

      try {
        const responses = await Promise.all(availabilityPromises);
        this.availabilities = responses.flatMap(response => response.data || []);
        this.updateCalendarEvents();
        this.isLoading = false;
      } catch (error) {
        this.error = 'Failed to load availabilities';
        this.isLoading = false;
      }
    }

    updateCalendarEvents() {
      const events: EventInput[] = this.availabilities.map(availability => {
        // Use the doctor from the nested doctor property
        const doctor = availability.doctor;
        
        const colorMap: Record<DoctorAvailability['availabilityType'], string> = {
          'AVAILABLE': '#10B981',
          'ON_LEAVE': '#EF4444',
          'PARTIALLY_AVAILABLE': '#F59E0B'
        };

        const title = doctor 
          ? `${doctor.fname} ${doctor.lname} - ${availability.availabilityType}`
          : `Unknown Doctor - ${availability.availabilityType}`;

        return {
          title,
          start: availability.startDate,
          end: availability.endDate,
          backgroundColor: colorMap[availability.availabilityType],
          extendedProps: {
            doctor,
            availability,
          }
        };
      });

      this.calendarOptions.events = events;
    }

    handleEventClick(info: any){
      const availability = info.event.extendedProps.availability;
      const doctor = info.event.extendedProps.doctor;
      console.log('Event clicked:', {availability, doctor});
    }
}