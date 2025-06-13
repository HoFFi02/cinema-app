package com.example.cinema.repository;

import com.example.cinema.model.ReservationSeat;
import com.example.cinema.model.ReservationSeatId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReservationSeatRepository extends JpaRepository<ReservationSeat, ReservationSeatId> {
}