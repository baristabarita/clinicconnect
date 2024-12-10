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

    List<Appointment> findByVisitDateAndIsDeletedFalse(LocalDate date);

    // Gets appointments per month
    @Query(value = "SELECT DATE_FORMAT(visit_date, '%Y-%m') as month, COUNT(*) as count " +
            "FROM appointment " +
            "WHERE YEAR(visit_date) = YEAR(CURRENT_DATE) " +
            "GROUP BY DATE_FORMAT(visit_date, '%Y-%m') " +
            "ORDER BY DATE_FORMAT(visit_date, '%Y-%m')", nativeQuery = true)
    List<Object[]> findAppointmentsPerMonth();

    @Query(value = "SELECT status, COUNT(*) as count " +
            "FROM appointment " +
            "WHERE status IN ('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED') " +
            "GROUP BY status", nativeQuery = true)
    List<Object[]> findPendingAppointments();
}
