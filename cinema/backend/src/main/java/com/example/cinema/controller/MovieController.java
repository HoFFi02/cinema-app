package com.example.cinema.controller;

import com.example.cinema.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/fetch")
    public ResponseEntity<?> fetchMovies() {
        movieService.fetchAndSaveMovies();
        return ResponseEntity.ok("Filmy pobrane i zapisane.");
    }
}