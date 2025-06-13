import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <h1 className="logo">🎬 KinoApp</h1>
            <div className="nav-links">
                <Link to="/home" className="nav-link">Strona główna</Link>
                <Link to="/profile" className="nav-link">Profil</Link>
                <button onClick={handleLogout} className="logout-button">Wyloguj</button>
            </div>
        </nav>
    );
};

export default Navbar;
