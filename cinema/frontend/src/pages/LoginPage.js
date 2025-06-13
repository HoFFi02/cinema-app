import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.js';

function LoginPage() {
    const navigate = useNavigate();

    const handleSuccessfulLogin = () => {
        navigate('/home');
    };

    return (
        <div>
            <LoginForm onSuccess={handleSuccessfulLogin} />
        </div>
    );
}

export default LoginPage;