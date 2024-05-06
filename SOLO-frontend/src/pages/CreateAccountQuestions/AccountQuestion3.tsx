import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion3Props {
    onNextClick: () => void;
  }
  
  const AccountQuestion3: React.FC<AccountQuestion3Props> = ({
  }) => {
    const history = useHistory(); // Use useHistory inside the component
    const [answer, setAnswer] = useState('');
  
    const onBackClick = () => {
      history.push('/account-question-2'); // change this based on the route of the previous page
    }
    const onNextClick = () => {
      history.push('/account-question-4'); // change this based on the route of the next page
    };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 3 of 4</div>   {/* Change this for the step count */}

          <div className="question">Upload profile photo</div> {/* Change this based on current question */}

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

export default AccountQuestion3;
