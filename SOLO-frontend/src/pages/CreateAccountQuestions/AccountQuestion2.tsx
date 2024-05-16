import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion2Props {
    onNextClick: () => void;
  }
  
const AccountQuestion2: React.FC<AccountQuestion2Props> = ({}) => {
    const history = useHistory(); // Use useHistory inside the component
    const [answer, setAnswer] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
  
    const onBackClick = () => {
      setAnswer('');
      history.push('/account-question-1');
    }

    const onNextClick = () => {
      if (isValidEmail) {
        history.push('/account-question-3'); // change this based on the route of the next page
      }
    };

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value;
      setAnswer(email);
      setIsValidEmail(validateEmail(email));
    }

    return (
      <IonPage>
        <CreateAccountHeader />
        <IonContent>
          <div className="question-view">
            <div className="step-info">Step 2 of 5</div>   {/* Change this for the step count */}

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
          <button onClick={onBackClick} className="back-button">BACK</button>
          <button 
            onClick={onNextClick} 
            className="next-button"
            disabled={!answer || !isValidEmail} 
          >
            NEXT
          </button>
        </div>
      </IonPage>
    );
}

export default AccountQuestion2;
