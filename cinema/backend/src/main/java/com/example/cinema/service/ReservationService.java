package com.example.cinema.service;

import com.example.cinema.dto.ReservationRequest;
import com.example.cinema.model.*;
import com.example.cinema.repository.ReservationRepository;
import com.example.cinema.repository.ReservationSeatRepository;
import com.example.cinema.repository.ScreeningRepository;
import com.example.cinema.repository.SeatRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final SeatRepository seatRepository;
    private final ScreeningRepository screeningRepository;
    private final ReservationSeatRepository reservationSeatRepository;

    public ReservationService(ReservationRepository reservationRepository, SeatRepository seatRepository,
                              ScreeningRepository screeningRepository, ReservationSeatRepository reservationSeatRepository) {
        this.reservationRepository = reservationRepository;
        this.seatRepository = seatRepository;
        this.screeningRepository = screeningRepository;
        this.reservationSeatRepository = reservationSeatRepository;
    }

    @Transactional
    public void createReservation(User user, ReservationRequest request) {
        Long screeningId = request.getScreeningId();
        List<Long> seatIds = request.getSeatIds();

        Screening screening = screeningRepository.findById(screeningId)
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono seansu"));

        List<Seat> alreadyReserved = reservationRepository.findReservedSeatsByScreeningId(screeningId);
        Set<Long> reservedIds = alreadyReserved.stream()
                .map(Seat::getId)
                .collect(Collectors.toSet());

        for (Long seatId : seatIds) {
            if (reservedIds.contains(seatId)) {
                throw new IllegalStateException("Miejsce o ID " + seatId + " jest już zajęte");
            }
        }

        List<Seat> selectedSeats = seatRepository.findAllById(seatIds);

        Reservation newReservation = new Reservation();
        newReservation.setUser(user);
        newReservation.setScreening(screening);
        newReservation.setReservationTime(LocalDateTime.now());
        newReservation.setStatus("CONFIRMED");

        Reservation savedReservation = reservationRepository.save(newReservation);

        List<ReservationSeat> reservationSeats = selectedSeats.stream()
                .map(seat -> new ReservationSeat(savedReservation, seat))
                .collect(Collectors.toList());

        reservationSeatRepository.saveAll(reservationSeats);

    }


    public List<Seat> getAvailableSeats(Long screeningId) {
        Screening screening = screeningRepository.findById(screeningId)
                .orElseThrow(() -> new RuntimeException("Seans nie istnieje"));

        List<Seat> allSeats = seatRepository.findByHallId(screening.getHall().getId());
        List<Seat> reservedSeats = reservationRepository.findReservedSeatsByScreeningId(screeningId);

        return allSeats.stream()
                .filter(seat -> !reservedSeats.contains(seat))
                .collect(Collectors.toList());
    }
    public void deleteReservation(Long reservationId) {
        reservationRepository.deleteReservedSeatsByReservation(reservationId);
        reservationRepository.deleteById(reservationId);

    }
    public List<Reservation> getUserReservations(Long userId) {
        return reservationRepository.findByUserId(userId);
    }


}