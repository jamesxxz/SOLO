import React, { useContext, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';
import { AccountContext } from '../../contexts/AccountContext'; // Correct import path
import '../../components/UploadProfilePic.css';

interface AccountQuestion1Props {
  onNextClick: () => void;
}

const AccountQuestion1: React.FC<AccountQuestion1Props> = ({
}) => {
  const history = useHistory();
  const { name, setName } = useContext(AccountContext); // Use the individual properties
  const [answer, setAnswer] = useState(name || '');

  const onBackClick = () => {
    setAnswer('');
    history.push('/home');
  };

  const onNextClick = () => {
    console.log('Current answer before setting account:', answer); // Log current answer
    setName(answer); // Directly set the name in the context
    console.log('Account name after setting:', answer); // Log updated account name
    history.push('/account-question-2');
  };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 1 of 5</div>
          <div className="question">What is your name?</div>
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => {
              console.log('Answer input changed:', e.target.value); // Log value when input changes
              setAnswer(e.target.value);
            }}
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

export default AccountQuestion1;
