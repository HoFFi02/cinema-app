package com.example.cinema.controller;

import com.example.cinema.dto.ScreeningResponse;
import com.example.cinema.dto.ScreeningResponseFull;
import com.example.cinema.model.Screening;
import com.example.cinema.repository.ScreeningRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.cinema.service.ScreeningService;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/screenings")
public class ScreeningController {
    private final ScreeningService screeningService;
    private final ScreeningRepository screeningRepository;


    public ScreeningController(ScreeningService screeningService, ScreeningRepository screeningRepository) {
        this.screeningService = screeningService;
        this.screeningRepository = screeningRepository;
    }
    @GetMapping
    public ResponseEntity<List<ScreeningResponse>> getAllScreenings() {
        List<ScreeningResponse> screenings = screeningRepository.findAll()
                .stream()
                .map(screening -> new ScreeningResponse(
                        screening.getId(),
                        screening.getTmdbMovieId(),
                        screening.getScreeningTime(),
                        screening.getHall().getId(),
                        screening.getHall().getName()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(screenings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScreeningResponseFull> getScreening(@PathVariable Long id) {
        Screening screening = screeningRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Screening not found"));

        return ResponseEntity.ok(new ScreeningResponseFull(
                screening.getId(),
                screening.getTmdbMovieId(),
                screening.getScreeningTime(),
                screening.getHall()
        ));
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateScreenings() {
        screeningService.createNextDayScreenings();
        return ResponseEntity.ok("Seanse dodane.");
    }

}