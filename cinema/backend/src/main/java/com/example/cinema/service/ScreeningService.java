package com.example.cinema.service;

import com.example.cinema.model.CinemaHall;
import com.example.cinema.model.Movie;
import com.example.cinema.model.Screening;
import com.example.cinema.repository.CinemaHallRepository;
import com.example.cinema.repository.MovieRepository;
import com.example.cinema.repository.ScreeningRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScreeningService {
    private final ScreeningRepository screeningRepository;
    private final MovieRepository movieRepository;
    private final CinemaHallRepository cinemaHallRepository;

    public ScreeningService(
            ScreeningRepository screeningRepository,
            MovieRepository movieRepository,
            CinemaHallRepository cinemaHallRepository) {
        this.screeningRepository = screeningRepository;
        this.movieRepository = movieRepository;
        this.cinemaHallRepository = cinemaHallRepository;
    }

    @Scheduled(cron = "0 0 3 * * *")
    public void createNextDayScreenings() {
        LocalDate screeningDate = LocalDate.now().plusDays(7);
        List<String> hours = List.of("10:00", "12:30", "15:00", "18:00", "20:30");
        List<CinemaHall> halls = cinemaHallRepository.findAll();
        List<Movie> movies = movieRepository.findAll();

        for (Movie movie : movies) {
            for (String hour : hours) {
                LocalDateTime screeningTime = LocalDateTime.parse(screeningDate + "T" + hour);

                boolean scheduled = false;

                for (CinemaHall hall : halls) {
                    boolean exists = screeningRepository.existsByScreeningTimeAndHall(screeningTime, hall);
                    if (!exists) {
                        Screening screening = new Screening();
                        screening.setTmdbMovieId(movie.getTmdbMovieId());
                        screening.setHall(hall);
                        screening.setScreeningTime(screeningTime);
                        screeningRepository.save(screening);
                        scheduled = true;
                        break;
                    }
                }

                if (!scheduled) {
                    System.out.println("Brak dostępnej sali na " + screeningTime + " dla filmu " + movie.getTitle());
                }
            }
        }
    }
}