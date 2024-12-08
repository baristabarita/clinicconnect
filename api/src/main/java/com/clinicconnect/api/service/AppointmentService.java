package com.clinicconnect.api.service;

import com.clinicconnect.api.dto.AppointmentDTO;
import com.clinicconnect.api.model.Appointment;
import com.clinicconnect.api.model.Doctor;
import com.clinicconnect.api.model.User;
import com.clinicconnect.api.repository.AppointmentRepository;
import com.clinicconnect.api.repository.DoctorRepository;
import com.clinicconnect.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
