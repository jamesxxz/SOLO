import React, { useContext, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory, useLocation } from 'react-router-dom';
import { AccountContext } from '../../contexts/AccountContext';
import '../../components/AccountQuestion.css';

interface AccountQuestion2Props {
  onNextClick: () => void;
  onBackClick: ()  => void;
}
interface NestedState {
  state: {
      name: string;
  }
}

const AccountQuestion2: React.FC<AccountQuestion2Props> = ({}) => {
  const history = useHistory();
  const location = useLocation<NestedState>();

  //const { email, setEmail } = useContext(AccountContext); // Use the context
  const [answer, setAnswer] = useState('');
  const { state } = location;
  const name = state.state.name;


  const [isValidEmail, setIsValidEmail] = useState(true);

  const onBackClick = () => {
    setAnswer('');
    history.push('/account-question-1');
  }

  const onNextClick = () => {
    if (isValidEmail) {
      console.log('Current email before setting account:', answer); // Log current email
      //setEmail(answer); // Set the email in the context
      console.log('Account email after setting:', answer); // Log updated account email
      history.push('/account-question-3', { state: { name: name, email: answer } } ); // Change this based on the route of the next page
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
    console.log('Email input changed:', email); // Log value when input changes
  }

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
