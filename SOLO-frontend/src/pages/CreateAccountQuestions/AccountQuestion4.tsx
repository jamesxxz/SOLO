import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';
import { useHistory, useLocation } from 'react-router-dom';
import '../../components/AccountQuestion.css';

const shift = 5; // Example shift value for the encryption function

interface AccountQuestion4Props {
  onNextClick: (password: string) => void;
  onBackClick: () => void;
}

interface NestedState {
  state: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

const AccountQuestion4: React.FC<AccountQuestion4Props> = ({ onNextClick, onBackClick }) => {
  const history = useHistory();
  const location = useLocation<NestedState>();
  
  const [answer, setAnswer] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  const state = location.state?.state;
  if (!state) {
    //console.error('State is undefined');
    //history.push('/home'); // Redirect to a safe page if state is missing
    return null;
  }


  const handleNextClick = () => {
    if (isValidPassword) {
      const encryptedPassword = simpleEncrypt(answer, shift);
      console.log('Encrypted password:', encryptedPassword);
      onNextClick(encryptedPassword); // Use the passed prop to handle the next click
      history.push('/account-question-5', { state: { name, email, phoneNumber, password: encryptedPassword } });
    } else {
      alert('Please ensure your password meets all the criteria.');
    }
  };

  const simpleEncrypt = (text: string, shift: number) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i) + shift;
      result += String.fromCharCode(charCode);
    }
    return result;
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
  };

  // if (!state) {
  //   return null; // Prevent rendering if state is undefined
  // }

  const { name, email, phoneNumber } = state;

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 4 of 6</div>
          <div className="question">Please create a password</div>
          <input
            type="password"
            placeholder="Enter your password"
            value={answer}
            onChange={handleChange}
            className={`answer-input ${isValidPassword ? '' : 'invalid'}`}
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
          onClick={handleNextClick}
          className="next-button"
          disabled={!answer || !isValidPassword}
        >
          NEXT
        </button>
      </div>
    </IonPage>
  );
};

export default AccountQuestion4;
