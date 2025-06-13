package com.example.cinema.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "reservation_seats")
@JsonIgnoreProperties({"reservation"})
public class ReservationSeat {

    @EmbeddedId
    private ReservationSeatId id;

    @ManyToOne
    @MapsId("reservationId")
    private Reservation reservation;

    @ManyToOne
    @MapsId("seatId")
    private Seat seat;

    public ReservationSeat() {}

    public ReservationSeat(Reservation reservation, Seat seat) {
        this.id = new ReservationSeatId(reservation.getId(), seat.getId());
        this.reservation = reservation;
        this.seat = seat;
    }


    public ReservationSeatId getId() {
        return id;
    }

    public void setId(ReservationSeatId id) {
        this.id = id;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }
}