import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';

const AccountQuestion3: React.FC = () => {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [validationMessages, setValidationMessages] = useState<string[]>([]);

    const onBackClick = () => {
        setPassword('');
        history.push('/account-question-2');
    };

    const onNextClick = () => {
        if (isValidPassword) {
            history.push('/account-question-4'); // change this based on the route of the next page
        } else {
            alert('Please ensure your password meets all the criteria.');
        }
    };

    const validatePassword = (password: string) => {
        const messages = [];
        if (password.length < 8) {
            messages.push('Be at least 8 characters long');
        }
        if (!/[a-z]/.test(password)) {
            messages.push('Contain at least one lowercase letter');
        }
        if (!/[A-Z]/.test(password)) {
            messages.push('Contain at least one uppercase letter');
        }
        if (!/\d/.test(password)) {
            messages.push('Contain at least one number');
        }
        if (!/[@$!%*?&]/.test(password)) {
            messages.push('Contain at least one special character');
        }
        setValidationMessages(messages);
        return messages.length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
        setIsValidPassword(validatePassword(password));
    };

    return (
        <IonPage>
            <CreateAccountHeader />
            <IonContent>
                <div className="question-view">
                    <div className="step-info">Step 2 of 5</div>   {/* Change this for the step count */}
                    <div className="question">Please create a password</div> {/* Change this based on current question */}
                    <input
                        type="password" // Changed input type to password
                        placeholder="Enter your password"
                        value={password}
                        onChange={handleChange}
                        className={`answer-input ${isValidPassword ? '' : 'invalid'}`} // Add a class if the password is invalid
                    />
                    {!isValidPassword && (
                        <div className="error-message">
                            Password must:
                            <ul>
                                {validationMessages.map((msg, index) => (
                                    <li key={index}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </IonContent>
            <div className="navigation-buttons">
                <button onClick={onBackClick} className="back-button">BACK</button>
                <button 
                    onClick={onNextClick} 
                    className="next-button"
                    disabled={!password || !isValidPassword} 
                >
                    NEXT
                </button>
            </div>
        </IonPage>
    );
};

export default AccountQuestion3;
