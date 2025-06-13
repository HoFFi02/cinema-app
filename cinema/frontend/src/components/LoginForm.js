import { useState } from 'react';
import  '../css/login-register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginForm({ onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/auth/`, {
                username,
                password
            }, {
                withCredentials: true
            });
            localStorage.setItem("jwtToken", response.data);
            if (response.status === 200) {
                onSuccess();
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <main className="login-form">
                <h1>Witaj!</h1>
                <p>Zaloguj się aby zarezerwować seans</p>
                <form onSubmit={handleLogin}>
                    <h2>Logowanie</h2>
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
                    <button type="submit">Zaloguj się</button>
                </form>
                <p>Nie masz jeszcze konta? <Link to="/register" className="link"><span>Zarejestruj się</span></Link>.</p>
            </main>
        </div>
    );
}

export default LoginForm;