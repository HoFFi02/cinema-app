package com.example.cinema.dto;

import java.time.LocalDateTime;

public record ScreeningResponse(Long id, Long tmdbMovieId, LocalDateTime screeningTime, Long hallId, String hallName) {}