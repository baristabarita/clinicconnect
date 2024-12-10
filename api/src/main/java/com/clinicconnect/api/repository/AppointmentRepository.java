package com.clinicconnect.api.repository;

import com.clinicconnect.api.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    List<Appointment> findByUserUserIDAndIsDeletedFalse(Integer userID);
    List<Appointment> findByDoctorDoctorID(Integer doctorID);

    //For recent appointments sorting
    List<Appointment> findByIsDeletedFalseOrderByVisitDateDescVisitTimeDesc();

    //For filtering appointments by status
    List<Appointment> findByStatusAndIsDeletedFalse(Appointment.AppointmentStatus status);

    //For filtering appointments by date range
    List<Appointment> findByVisitDateBetweenAndIsDeletedFalse(LocalDate startDate, LocalDate endDate);

    //Combined filters
    List<Appointment> findByStatusAndVisitDateBetweenAndIsDeletedFalse(
            Appointment.AppointmentStatus status,
            LocalDate startDate,
            LocalDate endDate
    );

    // Gets appointments per month
    @Query("SELECT MONTHNAME(a.visitDate), COUNT(a) " +
            "FROM Appointment a GROUP BY MONTH(a.visitDate) " +
            "ORDER BY MONTH(a.visitDate)")
    List<Object[]> findAppointmentsPerMonth();

    // Gets appointment status
    @Query("SELECT a.status, COUNT(a) " +
            "FROM Appointment a " +
            "GROUP BY a.status")
    List<Object[]> findPendingAppointments();
}
