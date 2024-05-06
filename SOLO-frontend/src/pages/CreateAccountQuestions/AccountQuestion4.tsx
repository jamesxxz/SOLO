import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import GradientHeader from '../../components/GradientHeader/GradientHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion4Props {
    onNextClick: () => void;
  }
  
  const AccountQuestion4: React.FC<AccountQuestion4Props> = ({
  }) => {
    const history = useHistory();
    const [answer, setAnswer] = useState('');
  
    const onBackClick = () => {
      history.push('/account-question-3'); 
    }
    const onNextClick = () => {
      history.push('/account-question-1'); // change this based on the route of the next page based on role
    };

  return (
    <IonPage>
      <GradientHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 4 of 4</div>   {/* Change this for the step count */}

          <div className="question">Which role best describes you?</div> {/* Change this based on current question */}

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

export default AccountQuestion4;
