import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import GradientHeader from '../../components/GradientHeader/GradientHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion2Props {
  onNextClick: () => void; // Define only the method type here
}

const AccountQuestion2: React.FC<AccountQuestion2Props> = ({
  onNextClick,
}) => {
  const history = useHistory(); // Use useHistory inside the component
  const [answer, setAnswer] = useState('');

  const onBackClick = () => {
    history.push('/account-question-1'); // Navigation function
  }

  return (
    <IonPage>
      <GradientHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 2 of 4</div>
          <div className="question">What is your email address?</div>
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="answer-input"
          />

        </div>
      </IonContent>
      <div className="navigation-buttons">
            <button onClick={onBackClick} className="back-button">BACK</button>
            <button 
              onClick={onNextClick} 
              className="next-button"
              disabled={!answer} // Disable button if answer is empty
            >
              NEXT
            </button>
          </div>
    </IonPage>
  );
}

export default AccountQuestion2;
