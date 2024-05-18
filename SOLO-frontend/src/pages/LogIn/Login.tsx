import React, { useState } from 'react';
import { IonContent, IonImg, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../components/Login.css';

const Login: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const onLoginClick = () => {
        if (isValidEmail && isValidPassword && email && password) {
            // Implement login logic here
f
            // Redirect to a different page after login if needed
             history.push('/tab-bar');
        } else {
            alert('Please enter a valid email and password.');
        }
    };
    const onBackClick = () => {
             history.push('/home');
     
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
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
        setIsValidPassword(validatePassword(password));
    };

    return (
        <IonPage>
            <IonContent>
                <div className="login-container">
                    <div className="login-header">
                        <IonImg src="/SOLOLogo.png" className="logo-image" />
                        <h1 className="login-title">SOLO Login</h1>
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
