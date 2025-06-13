package com.example.cinema.dto;

import com.example.cinema.model.CinemaHall;

import java.time.LocalDateTime;

public record ScreeningResponseFull(
        Long id,
        Long tmdbMovieId,
        LocalDateTime screeningTime,
        CinemaHall hall
) {}