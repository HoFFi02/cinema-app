import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "./DatePicker";
import MovieCard from "./MovieCard";
import "../css/movielist.css";

const API_KEY = process.env.REACT_APP_API;
const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

const MovieList = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                console.log(token);
                const tmdbResponse = await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
                const screeningsResponse = await axios.get("http://localhost:8080/screenings", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const moviesFromTmdb = tmdbResponse.data.results;
                const screeningsFromBackend = screeningsResponse.data;

                const groupedMovies = {};

                screeningsFromBackend.forEach(screening => {
                    const id = screening.tmdbMovieId;
                    const screeningDate = screening.screeningTime.slice(0, 10);
                    const screeningTime = screening.screeningTime.slice(11, 16);

                    if (!groupedMovies[id]) {
                        const tmdbMovie = moviesFromTmdb.find(m => m.id === id);
                        if (tmdbMovie) {
                            groupedMovies[id] = {
                                id: id,
                                title: tmdbMovie.title,
                                overview: tmdbMovie.overview,
                                poster_path: tmdbMovie.poster_path,
                                showtimes: {},
                                screeningIds: {}
                            };
                        }
                    }

                    if (groupedMovies[id]) {
                        if (!groupedMovies[id].showtimes[screeningDate]) {
                            groupedMovies[id].showtimes[screeningDate] = [];
                        }
                        groupedMovies[id].showtimes[screeningDate].push(screeningTime);
                        groupedMovies[id].screeningIds[`${screeningDate}T${screeningTime}`] = screening.id;
                    }
                });
                console.log("screeningIds dla filmów:", groupedMovies);

                setMovies(Object.values(groupedMovies));
            } catch (error) {
                console.error("Błąd pobierania filmów/seansów:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <DatePicker onDateSelect={setSelectedDate} />
            <div className="movie-list-container">
                {movies.length > 0 ? (
                    movies
                        .filter(movie => movie.showtimes?.[selectedDate]?.length > 0)
                        .map((movie) => (
                            <MovieCard key={movie.id} movie={movie} selectedDate={selectedDate} />
                        ))
                ) : (
                    <p>Brak dostępnych filmów.</p>
                )}
            </div>

        </div>
    );
};


export default MovieList;