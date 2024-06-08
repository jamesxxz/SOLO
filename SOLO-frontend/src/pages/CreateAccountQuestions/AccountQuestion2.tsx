import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';
import { useHistory, useLocation } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion2Props {
  onNextClick: (email: string) => void;
  onBackClick: () => void;
}

interface NestedState {
  state: {
    name: string;
  };
}

const AccountQuestion2: React.FC<AccountQuestion2Props> = ({ onNextClick, onBackClick }) => {
  const history = useHistory();
  const location = useLocation<NestedState>();
  const [answer, setAnswer] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);

  const state = location.state?.state;
  if (!state) {
    //console.error('State is undefined');
    //history.push('/home'); // Redirect to a safe page if state is missing
    return null;
  }

  const handleNextClick = () => {
    if (isValidEmail) {
      console.log('Current email before setting account:', answer); // Log current email
      onNextClick(answer); // Use the passed prop to handle the next click
      history.push('/account-question-3', { state: { name: name, email: answer } });
    }
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setAnswer(email);
    setIsValidEmail(validateEmail(email));
    console.log('Email input changed:', email); // Log value when input changes
  };

  // if (!state) {
  //   return null; // Prevent rendering if state is undefined
  // }

  const name = state.name;

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 2 of 6</div> {/* Change this for the step count */}
          <div className="question">What is your email address?</div> {/* Change this based on current question */}
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={handleChange}
            className={`answer-input ${isValidEmail ? '' : 'invalid'}`} // Add a class if the email is invalid
          />
          {!isValidEmail && <div className="error-message">Please enter a valid email address.</div>}
        </div>
      </IonContent>
      <div className="navigation-buttons">
        <button onClick={handleBackClick} className="back-button">BACK</button>
        <button
          onClick={handleNextClick}
          className="next-button"
          disabled={!answer || !isValidEmail}
        >
          NEXT
        </button>
      </div>
    </IonPage>
  );
};

export default AccountQuestion2;
