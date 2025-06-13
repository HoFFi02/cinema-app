import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/moviecard.css";

const MovieCard = ({ movie, selectedDate }) => {
    const navigate = useNavigate();

    const handleSelectSeans = (time) => {
        const fullTimestamp = `${selectedDate}T${time}`;
        const screeningId = movie.screeningIds?.[fullTimestamp];
        console.log(`Wybrany seans: ${selectedDate}T${time}, screeningId:`, screeningId);

        if (!screeningId) {
            console.error(`Brak screeningId dla ${fullTimestamp} w filmie ${movie.title}`);
            alert("Nie udało się znaleźć seansu dla tej godziny.");
            return;
        }

        navigate(`/booking?movie=${movie.title}&time=${time}&screeningId=${screeningId}`);
    };

    const showtimesForDate = movie.showtimes?.[selectedDate] || [];

    return (
        <div className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <h3>Godziny seansów:</h3>
            {showtimesForDate.length > 0 ? (
                showtimesForDate.map((time, index) => (
                    <button
                        key={index}
                        className="showtime-button"
                        onClick={() => handleSelectSeans(time)}
                    >
                        {time}
                    </button>
                ))
            ) : (
                <p>Brak seansów w wybranym dniu</p>
            )}
        </div>
    );
};

export default MovieCard;
