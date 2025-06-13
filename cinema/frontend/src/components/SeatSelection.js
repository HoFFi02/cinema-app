import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/seatselection.css';


const SeatSelection = ({ screeningId }) => {
    const [seats, setSeats] = useState([]);
    const [seatsPerRow, setSeatsPerRow] = useState(6);
    const [availableSeatIds, setAvailableSeatIds] = useState(new Set());
    const [selectedSeats, setSelectedSeats] = useState([]);

    const fetchSeatsAndAvailability = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            console.log(token);
            const screeningRes = await axios.get(`http://localhost:8080/screenings/${screeningId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const hall = screeningRes.data.hall;
            setSeatsPerRow(hall.seatsPerRow);

            const availableRes = await axios.get(`http://localhost:8080/reservations/${screeningId}/available-seats`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const availableSeatsData = Object.values(availableRes.data);
            const updatedAvailableSeats = new Map(availableSeatsData.map(seat => [seat.id, seat]));
            setAvailableSeatIds(updatedAvailableSeats);

            const generated = [];
            for (let row = 1; row <= hall.rows; row++) {
                for (let seat = 1; seat <= hall.seatsPerRow; seat++) {
                    const matchingSeat = availableSeatsData.find(s => s.rowNumber === row && s.seatNumber === seat);
                    const id = matchingSeat?.id;
                    generated.push({ id, rowNumber: row, seatNumber: seat });
                }
            }
            setSeats(generated);

            console.log("Nowe dostępne miejsca:", updatedAvailableSeats);


        } catch (error) {
            console.error("Błąd ładowania miejsc:", error);
        }
    };

    useEffect(() => {
        fetchSeatsAndAvailability();
    }, [screeningId]);

    const handleSelectSeat = (seat) => {
        setSelectedSeats((prev) =>
            prev.some(s => s.id === seat.id)
                ? prev.filter(s => s.id !== seat.id)
                : [...prev, seat]
        );
    };


    const handleReservation = async () => {
        try {
            const token = localStorage.getItem("jwtToken");

            const requestBody = {
                screeningId: Number(screeningId),
                seatIds: selectedSeats.map(seat => seat.id)
            };
            console.log("Wybrane miejsca (po poprawce):", selectedSeats);
            console.log("Seat IDs do rezerwacji:", selectedSeats.map(seat => seat.id));

            const response = await axios.post("http://localhost:8080/reservations", requestBody, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            if (response.status === 200) {
                alert("Rezerwacja zakończona sukcesem!");
                setSelectedSeats([]);
                console.log("Przed odświeżeniem:", availableSeatIds);
                await fetchSeatsAndAvailability();
                console.log("Po odświeżeniu:", availableSeatIds);
            }
        } catch (error) {
            console.error("Błąd rezerwacji:", error);
            alert("Nie udało się zarezerwować miejsc.");
        }
    };

    return (
        <div>
            <h3>Wybierz miejsca:</h3>
            <div
                className="seat-container"
                style={{ gridTemplateColumns: `repeat(${seatsPerRow}, 50px)` }}
            >
                {seats.map((seat, index) => {
                    const key = `${seat.rowNumber}-${seat.seatNumber}`;
                    const isAvailable = availableSeatIds.has(seat.id);
                    const isSelected = selectedSeats.some(
                        s => s.rowNumber === seat.rowNumber && s.seatNumber === seat.seatNumber
                    );

                    const classNames = [
                        'seat',
                        isSelected ? 'selected-seat' : isAvailable ? 'available-seat' : 'reserved-seat'
                    ].join(' ');

                    return (
                        <button
                            key={index}
                            className={classNames}
                            disabled={!isAvailable}
                            onClick={() => handleSelectSeat(seat)}
                        >
                            {seat.rowNumber}-{seat.seatNumber}
                        </button>
                    );
                })}
            </div>

            <button className="reserve-button" onClick={handleReservation}>
                Zarezerwuj
            </button>

            <div style={{ marginTop: "20px" }}>
                <p><span className="legend" style={{ backgroundColor: "#00aa00" }} /> dostępne</p>
                <p><span className="legend" style={{ backgroundColor: "#cc0000" }} /> zajęte</p>
                <p><span className="legend" style={{ backgroundColor: "#666666" }} /> wybrane</p>
            </div>
        </div>
    );
};

export default SeatSelection;