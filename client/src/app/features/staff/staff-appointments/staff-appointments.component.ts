import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentWithUser, UserType } from '../../../shared/models/types';
import { AppointmentService } from '../../../core/services/appointment.service';
import { UserService } from '../../../core/services/user.service';
import { ViewStaffAppointmentModalComponent } from '../../../shared/components/modals/view-staff-appointment-modal/view-staff-appointment-modal.component';
import { EditAppointmentModalComponent } from '../../../shared/components/modals/edit-appointment-modal/edit-appointment-modal.component';
import { DeleteConfirmationModalComponent } from '../../../shared/components/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { forkJoin, of, catchError, map } from 'rxjs';
@Component({
  selector: 'app-staff-appointments',
  standalone: true,
  imports: [CommonModule, 
            ReactiveFormsModule, 
            ViewStaffAppointmentModalComponent, 
            EditAppointmentModalComponent,
            DeleteConfirmationModalComponent
          ],
  templateUrl: './staff-appointments.component.html'
})
export class StaffAppointmentsComponent implements OnInit {
  appointments: AppointmentWithUser[] = [];
  filteredAppointments: AppointmentWithUser[] = [];
  selectedAppointment: AppointmentWithUser | null = null;
  isEditModalOpen = false;
  isViewModalOpen = false;
  isDeleteModalOpen = false;
  appointmentToDelete: AppointmentWithUser | null = null;
  isLoading = false;
  error: string | null = null;

  filterForm = new FormGroup({
    status: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    this.error = null;

    this.appointmentService.getAppointments().subscribe({
      next: (response) => {
        console.log('Appointments loaded:', response.data);
        this.appointments = response.data || [];
        this.filteredAppointments = [...this.appointments];
        this.loadUserDetails();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load appointments:', error);
        this.error = 'Failed to load appointments: ' + error.message;
        this.isLoading = false;
      }
    });
  }

  private loadUserDetails() {
    this.appointments = this.appointments.map(appointment => ({
      ...appointment,
      userID: (appointment as any).user?.userID,
      userDetails: (appointment as any).user
    } as AppointmentWithUser));
    
    this.filteredAppointments = [...this.appointments];
  }

  applyFilters() {
    const filters = this.filterForm.value;
    
    // Start with the original list of appointments
    this.filteredAppointments = [...this.appointments];
    
    // Apply filters if they exist
    this.filteredAppointments = this.filteredAppointments.filter(appointment => {
      let matches = true;
      
      if (filters.status && filters.status !== '') {
        matches = matches && appointment.status === filters.status;
      }
      
      if (filters.startDate && filters.startDate !== '') {
        const startDate = new Date(filters.startDate);
        const appointmentDate = new Date(appointment.visitDate);
        startDate.setHours(0, 0, 0, 0);
        appointmentDate.setHours(0, 0, 0, 0);
        matches = matches && appointmentDate >= startDate;
      }
      
      if (filters.endDate && filters.endDate !== '') {
        const endDate = new Date(filters.endDate);
        const appointmentDate = new Date(appointment.visitDate);
        endDate.setHours(23, 59, 59, 999);
        appointmentDate.setHours(23, 59, 59, 999);
        matches = matches && appointmentDate <= endDate;
      }
      
      return matches;
    });
  }

  confirmDelete() {
    if (this.appointmentToDelete) {
      this.appointmentService.deleteAppointment(this.appointmentToDelete.aptID!)
        .subscribe({
          next: () => {
            this.loadAppointments();
            this.closeDeleteModal();
          },
          error: (error) => {
            console.error('Error deleting appointment:', error);
            // Handle error (could add error message display)
          }
        });
    }
  }

  // View Appointment Modal Methods
  viewAppointment(appointment: AppointmentWithUser) {
    this.selectedAppointment = appointment;
    this.isViewModalOpen = true;
  }

  closeViewModal() {
    this.isViewModalOpen = false;
    this.selectedAppointment = null;
  }
  
  //Edit Appointment Modal Methods
  openEditModal(appointment: AppointmentWithUser) {
    this.selectedAppointment = appointment;
    this.isEditModalOpen = true;
  }
  
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedAppointment = null;
  }

  onAppointmentUpdated() {
    this.loadAppointments();
    this.closeEditModal();
  }

  //Delete Appointment Modal Methods
  openDeleteModal(appointment: AppointmentWithUser) {
    this.appointmentToDelete = appointment;
    this.isDeleteModalOpen = true;
  }
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.appointmentToDelete = null;
  }

}