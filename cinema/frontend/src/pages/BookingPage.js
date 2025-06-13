import React from "react";
import { useLocation } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";

const BookingPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const movieTitle = params.get("movie");
    const time = params.get("time");
    const screeningId = params.get("screeningId");

    return (
        <div>
            <h2>Rezerwacja miejsc na: {movieTitle}</h2>
            <h3>Godzina seansu: {time}</h3>
            <SeatSelection screeningId={screeningId} />

        </div>
    );
};

export default BookingPage;