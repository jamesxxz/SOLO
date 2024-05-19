import React, { useContext, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory } from 'react-router-dom';
import { AccountContext } from '../../contexts/AccountContext';
import '../../components/AccountQuestion.css';

interface AccountQuestion3Props {
  onNextClick: () => void;
  onBackClick: () => void;
}

const AccountQuestion3: React.FC<AccountQuestion3Props> = ({}) => {
  const history = useHistory();
  const { password, setPassword } = useContext(AccountContext); // Use the context
  const [answer, setAnswer] = useState(password || '');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  const onBackClick = () => {
    setAnswer('');
    history.push('/account-question-2');
  };

  const onNextClick = () => {
    if (isValidPassword) {
      console.log('Current password before setting account:', answer); // Log current password
      setPassword(answer); // Set the password in the context
      console.log('Account password after setting:', answer); // Log updated account password
      history.push('/account-question-4'); // Change this based on the route of the next page
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
    setAnswer(password);
    setIsValidPassword(validatePassword(password));
    console.log('Password input changed:', password); // Log value when input changes
  };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 3 of 5</div>   {/* Change this for the step count */}
          <div className="question">Please create a password</div> {/* Change this based on current question */}
          <input
            type="password" // Changed input type to password
            placeholder="Enter your password"
            value={answer}
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
          disabled={!answer || !isValidPassword}
        >
          NEXT
        </button>
      </div>
    </IonPage>
  );
}

export default AccountQuestion3;
