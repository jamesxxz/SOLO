import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion2Props {
    onNextClick: () => void;
  }
  
  const AccountQuestion2: React.FC<AccountQuestion2Props> = ({
  }) => {
    const history = useHistory(); // Use useHistory inside the component
    const [answer, setAnswer] = useState('');
  
    const onBackClick = () => {
      setAnswer('');
      history.push('/account-question-1');
    }
    const onNextClick = () => {
      history.push('/account-question-3'); // change this based on the route of the next page
    };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 2 of 4</div>   {/* Change this for the step count */}

          <div className="question">What is your email address?</div> {/* Change this based on current question */}

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
              disabled={!answer} 
            >
              NEXT
            </button>
          </div>
    </IonPage>
  );
}

export default AccountQuestion2;
