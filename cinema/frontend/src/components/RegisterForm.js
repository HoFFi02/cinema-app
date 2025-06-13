import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login-register.css';
import { Link } from 'react-router-dom';
const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/auth/register`, {
                username,
                password,
                email
            });
            console.log('Registration successful:', response.data);
            navigate('/');
        } catch (error) {
            setError('Registration error: ' + error.message);
            console.error('Registration error:', error);
        }
    };

    return (
        <div className='register-container'>
            <main className='register-form'>
                <h1>Stwórz konto</h1>
                <form onSubmit={handleRegister}>
                    <div className="input-container">
                        <ion-icon name="person-outline"></ion-icon>
                        <input
                            type="text"
                            placeholder='nazwa użytkownika'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input
                            type="password"
                            placeholder='hasło'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input
                            type="email"
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Zarejestruj się</button>
                    {error && <p>{error}</p>}
                </form>
                <p>Masz już konto? <Link to="/" className="link"><span>Zaloguj się</span></Link>.</p>
            </main>
        </div>
    );
};

export default RegisterForm;
