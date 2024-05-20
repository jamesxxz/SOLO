import React, { useContext, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory, useLocation } from 'react-router-dom';
import { AccountContext } from '../../contexts/AccountContext';
import '../../components/AccountQuestion.css';

interface AccountQuestion3Props {
  onNextClick: () => void;
  onBackClick: () => void;
}

interface NestedState {
    state: {
        name: string;
        email: string;
    }
}

const AccountQuestion3: React.FC<AccountQuestion3Props> = ({}) => {
  const history = useHistory();
  const location = useLocation<NestedState>();
  const { state } = location;
  const name = state.state.name;
  const email = state.state.email;
  console.log(name, email);


  //const { phoneNumber, setPhoneNumber } = useContext(AccountContext); // Use the context for phone number
  const [answer, setAnswer] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  

  const onBackClick = () => {
    setAnswer('');
    history.push('/account-question-1');
  }

  const onNextClick = () => {
    if (isValidPhoneNumber) {
      console.log('Current phone number before setting account:', answer); // Log current phone number
      //setPhoneNumber(answer); // Set the phone number in the context
      console.log('Account phone number after setting:', answer); // Log updated account phone number
      history.push('/account-question-4',{ state: { name: name, email: email, phoneNumber: answer } }); // Change this based on the route of the next page
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/; // Simplified regex for international phone numbers
    return phoneNumberRegex.test(phoneNumber);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    setAnswer(phoneNumber);
    setIsValidPhoneNumber(validatePhoneNumber(phoneNumber));
    console.log('Phone number input changed:', phoneNumber); // Log value when input changes
  }

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
          onClick={onNextClick} 
          className="next-button"
          disabled={!answer || !isValidPhoneNumber}
        >
          NEXT
        </button>
      </div>
    </IonPage>
  );
}

export default AccountQuestion3;