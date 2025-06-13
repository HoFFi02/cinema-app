package com.example.cinema.controller;

import com.example.cinema.dto.ReservationRequest;
import com.example.cinema.model.Reservation;
import com.example.cinema.model.Seat;
import com.example.cinema.security.UserPrincipal;
import com.example.cinema.service.ReservationService;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<String> createReservation(@RequestBody ReservationRequest request, @AuthenticationPrincipal UserPrincipal principal
    ) {
        reservationService.createReservation(principal.getUser(), request);
        return ResponseEntity.ok("Rezerwacja zakończona sukcesem!");
    }

    @GetMapping("/{screeningId}/available-seats")
    public ResponseEntity<List<Seat>> getAvailableSeats(@PathVariable Long screeningId) {
        return ResponseEntity.ok(reservationService.getAvailableSeats(screeningId));
    }

    @GetMapping("/user")
    public List<Reservation> getUserReservations(@AuthenticationPrincipal UserPrincipal principal) {
        return reservationService.getUserReservations(principal.getUser().getId());
    }

    @Transactional
    @DeleteMapping("/{reservationId}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long reservationId) {
        reservationService.deleteReservation(reservationId);
        return ResponseEntity.ok("Rezerwacja usunięta.");
    }

}