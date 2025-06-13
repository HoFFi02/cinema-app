package com.example.cinema.service;

import com.example.cinema.model.*;
import com.example.cinema.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final RestTemplate restTemplate;

    private static final String TMDB_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=${api}";

    public MovieService(MovieRepository movieRepository, RestTemplate restTemplate) {
        this.movieRepository = movieRepository;
        this.restTemplate = restTemplate;
    }
    @Scheduled(cron = "0 0 4 * * *")
    public void autoFetchMovies() {
        fetchAndSaveMovies();
    }

    public void fetchAndSaveMovies() {
        ResponseEntity<Map> response = restTemplate.getForEntity(TMDB_URL, Map.class);
        List<Map<String, Object>> movies = (List<Map<String, Object>>) response.getBody().get("results");

        for (Map<String, Object> movieData : movies) {
            Long tmdbId = Long.valueOf(movieData.get("id").toString());
            if (movieRepository.findByTmdbMovieId(tmdbId).isPresent()) continue;

            Movie movie = new Movie();
            movie.setTmdbMovieId(tmdbId);
            movie.setTitle(movieData.get("title").toString());
            movie.setOverview(movieData.get("overview").toString());
            movie.setPosterUrl(movieData.get("poster_path").toString());
            movie.setReleaseDate(LocalDate.parse(movieData.get("release_date").toString()));

            movieRepository.save(movie);
        }
    }
}