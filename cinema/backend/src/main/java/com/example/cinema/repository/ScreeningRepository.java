package com.example.cinema.repository;

import com.example.cinema.model.CinemaHall;
import com.example.cinema.model.Screening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface ScreeningRepository extends JpaRepository<Screening, Long> {
    List<Screening> findByScreeningTimeBetween(LocalDateTime start, LocalDateTime end);
    @Query("SELECT DISTINCT s.tmdbMovieId FROM Screening s WHERE s.screeningTime BETWEEN :start AND :end")
    List<Long> findTmdbMovieIdsBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    boolean existsByScreeningTimeAndHall(LocalDateTime screeningTime, CinemaHall hall);
}