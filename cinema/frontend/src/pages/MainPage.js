import React from "react";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";

const MainPage = () => {
    return (
        <div>
            <Navbar />
            <h2 style={{ textAlign: "center" }}>🎥 Aktualne Seanse w Kinie</h2>
            <MovieList />
        </div>
    );
};

export default MainPage;