package com.example.cinema.model;
import java.io.Serializable;
import jakarta.persistence.*;

@Embeddable
public class ReservationSeatId implements Serializable {
    private Long reservationId;
    private Long seatId;

    public ReservationSeatId() {}

    public ReservationSeatId(Long reservationId, Long seatId) {
        this.reservationId = reservationId;
        this.seatId = seatId;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public Long getSeatId() {
        return seatId;
    }

    public void setSeatId(Long seatId) {
        this.seatId = seatId;
    }
}