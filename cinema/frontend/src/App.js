import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import BookingPage from "./pages/BookingPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={<MainPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
