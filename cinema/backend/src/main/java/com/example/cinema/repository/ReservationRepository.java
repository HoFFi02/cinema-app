package com.example.cinema.repository;

import com.example.cinema.model.Reservation;
import com.example.cinema.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT rs.seat FROM ReservationSeat rs WHERE rs.reservation.screening.id = :screeningId")
    List<Seat> findReservedSeatsByScreeningId(@Param("screeningId") Long screeningId);
    List<Reservation> findByUserId(Long userId);
    @Modifying
    @Query("DELETE FROM ReservationSeat rs WHERE rs.reservation.id = :reservationId")
    void deleteReservedSeatsByReservation(@Param("reservationId") Long reservationId);
}