package com.example.cinema.repository;

import com.example.cinema.model.CinemaHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CinemaHallRepository extends JpaRepository<CinemaHall, Long> {
}