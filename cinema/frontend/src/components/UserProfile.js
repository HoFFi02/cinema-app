import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/userprofile.css';

const UserProfile = () => {
    const [reservations, setReservations] = useState([]);
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/reservations/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Dane rezerwacji z backendu:", response.data);

                setReservations(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Błąd pobierania rezerwacji:", error);
            }
        };

        fetchReservations();
    }, []);

    const handleDeleteReservation = async (reservationId) => {
        try {
            console.log(reservationId);
            await axios.delete(`http://localhost:8080/reservations/${reservationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReservations(reservations.filter((res) => res.id !== reservationId));
        } catch (error) {
            console.error("Błąd usuwania rezerwacji:", error);
        }
    };

    return (
        <div className="user-profile-container">
            <h2>Twój profil</h2>
            <h3>Twoje rezerwacje:</h3>
            {reservations.length > 0 ? (
                <ul className="reservation-list">
                    {reservations.map((res) => (
                        <li key={res.id} className="reservation-item">
                            🎟️ <strong>Seans:</strong> {res.screening.tmdbMovieId}<br />
                            🏠 <strong>Sala:</strong> {res.screening.hall.name}<br />
                            📅 <strong>Data rezerwacji:</strong> {new Date(res.reservationTime).toLocaleString()}<br />
                            ⏰ <strong>Czas seansu:</strong> {new Date(res.screening.screeningTime).toLocaleString()}<br />
                            ✅ <strong>Status:</strong> {res.status}<br />
                            🪑 <strong>Miejsca:</strong> {res.reservedSeats.map(seat => `${seat.seat.rowNumber}-${seat.seat.seatNumber}`).join(", ")}

                            <button className="delete-button" onClick={() => handleDeleteReservation(res.id)}>
                                Usuń ❌
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak aktywnych rezerwacji.</p>
            )}
        </div>
    );
};

export default UserProfile;