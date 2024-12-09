package com.clinicconnect.api.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinicconnect.api.dto.AppointmentDTO;
import com.clinicconnect.api.model.Appointment;
import com.clinicconnect.api.model.Doctor;
import com.clinicconnect.api.model.User;
import com.clinicconnect.api.repository.AppointmentRepository;
import com.clinicconnect.api.repository.DoctorRepository;
import com.clinicconnect.api.repository.UserRepository;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    @Autowired
    public AppointmentService(
            AppointmentRepository appointmentRepository, AppointmentRepository appointmentRepository1,
            UserRepository userRepository,
            DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
    }

    // Get Recent Appointments
    public List<Appointment> getRecentAppointments(){
        return appointmentRepository.findByOrderByVisitDateDescVisitTimeDesc();
    }

    // Get Appointments by Filter
    public List<Appointment> getFilteredAppointments(
            Appointment.AppointmentStatus status,
            LocalDate startDate,
            LocalDate endDate) {
        if(status != null && startDate != null && endDate != null){
            return appointmentRepository.findByStatusAndVisitDateBetween(status, startDate, endDate);
        } else if (status != null) {
            return appointmentRepository.findByStatus(status);
        } else if (startDate != null && endDate != null) {
            return appointmentRepository.findByVisitDateBetween(startDate, endDate);
        }
        return getRecentAppointments();
    }

    //Get full Appointment details
    public Appointment getAppointmentDetails(Integer aptID){
        return appointmentRepository.findById(aptID)
                .orElseThrow(()->new RuntimeException("Appointment not found"));
    }

    // Create Appointments
    public Appointment createAppointment(AppointmentDTO appointmentDTO){
        User user = userRepository.findById(appointmentDTO.getUserID().longValue())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Doctor doctor = doctorRepository.findById((int) appointmentDTO.getDoctorID().longValue())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setDoctor(doctor);
        appointment.setVisitDate(appointmentDTO.getVisitDate());  // Changed from getVisit_date
        appointment.setVisitTime(appointmentDTO.getVisitTime());  // Changed from getVisit_time
        appointment.setPurpose(appointmentDTO.getPurpose());
        appointment.setStatus(Appointment.AppointmentStatus.valueOf(appointmentDTO.getStatus()));
        appointment.setDeleted(appointmentDTO.isDeleted());  // Changed from setIs_deleted

        return appointmentRepository.save(appointment);
    }

    //Update appointment
    public Appointment updateAppointment(Integer aptID, AppointmentDTO updateDTO){
        Appointment appointment = getAppointmentDetails(aptID);

        if(updateDTO.getVisitDate() != null){
            appointment.setVisitDate(updateDTO.getVisitDate());
        }
        if(updateDTO.getVisitTime() != null){
            appointment.setVisitTime(updateDTO.getVisitTime());
        }
        if(updateDTO.getPurpose() != null){
            appointment.setPurpose(updateDTO.getPurpose());
        }
        if(updateDTO.getStatus() != null){
            appointment.setStatus(Appointment.AppointmentStatus.valueOf(updateDTO.getStatus()));
        }

        return appointmentRepository.save(appointment);
    }

    //Delete Appointment
    public void deleteAppointment(Integer aptID){
        Appointment appointment = getAppointmentDetails(aptID);
        appointment.setIsDeleted(true);
        appointmentRepository.save(appointment);
    }
}
