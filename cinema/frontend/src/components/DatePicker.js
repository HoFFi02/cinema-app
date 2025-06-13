import React, { useState } from "react";
import "../css/datepicker.css";

const DatePicker = ({ onDateSelect }) => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date.toISOString().split("T")[0];
    });

    const [selectedDate, setSelectedDate] = useState(days[0]);

    const handleClick = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    return (
        <div className="container">
            {days.map((date) => (
                <button className={selectedDate === date ? "selectedButton" : "button"}
                    key={date}
                    onClick={() => handleClick(date)}
                >
                    {date}
                </button>
            ))}
        </div>
    );
};

export default DatePicker;