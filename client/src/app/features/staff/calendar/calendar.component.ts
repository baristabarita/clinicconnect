import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DoctorService } from '../../../core/services/doctor.service';
import { Appointment, Doctor, DoctorAvailability } from '../../../shared/models/types';
import { AppointmentService } from '../../../core/services/appointment.service';
import { EventDetailModalComponent } from '../../../shared/components/modals/event-detail-modal/event-detail-modal.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, EventDetailModalComponent],
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
      eventContent: this.renderEventContent.bind(this),
    };

    renderEventContent(eventInfo: any) {
      const { event } = eventInfo;
      const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      const title = `${startTime} - ${event.title}`; // Include time in the title
      return { html: `<div>${title}</div>` }; // Return the modified title
  }

    doctors: Doctor[] = [];
    availabilities: DoctorAvailability[] = [];
    appointments: any[] = []; //To hold appointments
    isLoading = true;
    error: string | null = null;
    selectedAvailability?: DoctorAvailability;
    selectedAppointment?: Appointment;
    isModalOpen = false;

    constructor(private doctorService: DoctorService, private appointmentService: AppointmentService){}

    ngOnInit(): void {
      this.loadDoctors();
      this.loadAppointments();
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

    loadAppointments() {
      this.appointmentService.getAppointments().subscribe({
        next: (response) => {
          this.appointments = response.data || [];
          this.updateCalendarEvents(); // Update calendar events after loading appointments
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to load appointments';
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
        const doctor = availability.doctor;
        
        const colorMap: Record<DoctorAvailability['availabilityType'], string> = {
          'AVAILABLE': '#10B981',
          'ON_LEAVE': '#EF4444',
          'PARTIALLY_AVAILABLE': '#F59E0B'
        };

        return {
            title: doctor ? `${doctor.fname} ${doctor.lname} - ${availability.availabilityType}` : `Unknown Doctor - ${availability.availabilityType}`,
            start: availability.startDate,
            end: availability.endDate,
            backgroundColor: colorMap[availability.availabilityType],
            extendedProps: {
                availability,
                doctor,
            }
        };
      });

      const appointmentColorMap: Record<string, string> = {
        'SCHEDULED': '#3B82F6', // Blue
        'CONFIRMED': '#10B981', // Green
        'CANCELED': '#EF4444', // Red
        'COMPLETED': '#F59E0B', // Yellow
        'RESCHEDULED': '#6B7280' // Gray
    };

    const appointmentEvents: EventInput[] = this.appointments.map(appointment => {
        const statusColor = appointmentColorMap[appointment.status] || '#3B82F6'; // Default to blue if status is unknown
        return {
            title: `Appointment for Dr. ${appointment.doctor.lname}`,
            start: appointment.visitDate + 'T' + appointment.visitTime,
            end: appointment.visitDate + 'T' + appointment.visitTime,
            backgroundColor: statusColor,
            borderColor: statusColor,
            extendedProps: {
                appointment,
            }
        };
      });

      this.calendarOptions.events = [...events, ...appointmentEvents];
    }


    handleEventClick(info: any){
      console.log('Event clicked:', info);
      const availability = info.event.extendedProps.availability;
      const appointment = info.event.extendedProps.appointment;

      if (availability) {
        this.selectedAvailability = availability;
        this.selectedAppointment = undefined; // Clear appointment
      } else if (appointment) {
        this.selectedAppointment = appointment;
        this.selectedAvailability = undefined; // Clear availability
      }

      this.isModalOpen = true; // Open the modal
    }
}