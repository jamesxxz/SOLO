import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';
import { useHistory, useLocation } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion3Props {
  onNextClick: (phoneNumber: string) => void;
  onBackClick: () => void;
}

interface NestedState {
  state: {
    name: string;
    email: string;
  };
}

const AccountQuestion3: React.FC<AccountQuestion3Props> = ({ onNextClick, onBackClick }) => {
  const history = useHistory();
  const location = useLocation<NestedState>();

  const [answer, setAnswer] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const state = location.state?.state;
  if (!state) {
    //console.error('State is undefined');
    //history.push('/home'); // Redirect to a safe page if state is missing
    return null;
  }

  const handleNextClick = () => {
    if (isValidPhoneNumber) {
      console.log('Current phone number before setting account:', answer); // Log current phone number
      onNextClick(answer); // Use the passed prop to handle the next click
      console.log('Account phone number after setting:', answer); // Log updated account phone number
      history.push('/account-question-4', { state: { name, email, phoneNumber: answer } });
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/; // Simplified regex for international phone numbers
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    setAnswer(phoneNumber);
    setIsValidPhoneNumber(validatePhoneNumber(phoneNumber));
    console.log('Phone number input changed:', phoneNumber); // Log value when input changes
  };

  const { name, email } = state;
  
  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 3 of 6</div>
          <div className="question">What is your phone number?</div>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={answer}
            onChange={handleChange}
            className={`answer-input ${isValidPhoneNumber ? '' : 'invalid'}`} // Add a class if the phone number is invalid
          />
          {!isValidPhoneNumber && <div className="error-message">Please enter a valid phone number.</div>}
        </div>
      </IonContent>
      <div className="navigation-buttons">
        <button onClick={onBackClick} className="back-button">BACK</button>
        <button
          onClick={handleNextClick}
          className="next-button"
          disabled={!answer || !isValidPhoneNumber}
        >
          NEXT
        </button>
      </div>
    </IonPage>
  );
};

export default AccountQuestion3;
