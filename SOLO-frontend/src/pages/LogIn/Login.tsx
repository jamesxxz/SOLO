import React, { useContext, useState } from 'react';
import { IonContent, IonImg, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../components/Login.css';
import { ApiService } from '../../../services/api.service';
import { AuthContext } from '../../contexts/AuthContext';

const shift = 5; // Example shift value for the encryption function

const Login: React.FC = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login } = authContext as { login: (userId: string) => void }; // Update the type of authContext

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'coach' | 'athlete'>('coach');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const onLoginClick = async () => {
        if (isValidEmail && isValidPassword && email && password) {
            const encryptedPassword = simpleEncrypt(password, shift);
            console.log('Encrypted password on frontend:', encryptedPassword);
            try {
                let response;
                if (role === 'coach') {
                    response = await ApiService.loginCoach(email, encryptedPassword);
                } else {
                    response = await ApiService.loginAthlete(email, encryptedPassword);
                }
                console.log('Login response:', response);

                // Ensure proper response handling
                const userId = role === 'coach' ? response.coach.coach_id : response.athlete.athlete_id;
                console.log('User ID:', userId);

                if (userId) {
                    login(userId); // Save the user ID in context
                    history.push('/tab-bar');
                } else {
                    throw new Error('Invalid response structure');
                }
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed. Please check your credentials and try again.');
            }
        } else {
            alert('Please enter a valid email and password.');
        }
    };

    const onBackClick = () => {
        history.push('/home');
    };

    const simpleEncrypt = (text: string, shift: number) => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i) + shift;
            result += String.fromCharCode(charCode);
        }
        return result;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        setIsValidEmail(validateEmail(email));
        console.log('Email input changed:', email);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
        setIsValidPassword(validatePassword(password));
        console.log('Password input changed:', password);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = e.target.value as 'coach' | 'athlete';
        setRole(selectedRole);
        console.log('Role selected:', selectedRole);
    };

    return (
        <IonPage>
            <IonContent>
                <div className="login-container">
                    <div className="login-header">
                        <IonImg src="/SOLOLogo.png" className="logo-image" />
                        <h1 className="login-title">Login</h1>
                    </div>
                    <div className="login-form">
                        <div className="input-group">
                            <h3>Email Address</h3>
                            <input
                                type="email"
                                placeholder="User Email Address"
                                value={email}
                                onChange={handleEmailChange}
                                className={`answer-input ${isValidEmail ? '' : 'invalid'}`}
                            />
                            {!isValidEmail && <div className="error-message">Please enter a valid email address.</div>}
                        </div>
                        <div className="input-group">
                            <h3>Password</h3>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`answer-input ${isValidPassword ? '' : 'invalid'}`}
                            />
                            {!isValidPassword && <div className="error-message">Password must be at least 8 characters long.</div>}
                        </div>
                        <div className="input-group">
                            <h3>Role</h3>
                            <select value={role} onChange={handleRoleChange} className="answer-input">
                                <option value="coach">Coach</option>
                                <option value="athlete">Athlete</option>
                            </select>
                        </div>
                        <button onClick={onLoginClick} className="login-button" disabled={!isValidEmail || !isValidPassword}>
                            Login
                        </button>
                        <button onClick={onBackClick} className="login-back-button">
                            Back
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
