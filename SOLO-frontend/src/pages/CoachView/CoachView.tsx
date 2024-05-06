import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; // Assuming you have a similar header component
import { useHistory } from 'react-router-dom';
import '../../components/CoachView/CoachView.css';

const CoachView: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phone, setPhone] = useState('');

  const onBackClick = () => {
    history.push('/home'); // Navigation function
  };

  const onNextClick = () => {
    // Validation logic can be added here
    // For example, checking if username, emailAddress, and phone are not empty
    if (username && emailAddress && phone) {
      // Navigate to the next question or page
      history.push('/account-question-2');
    } else {
      // Show an error message or handle validation error
      alert('Please fill in all fields.');
    }
  };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="question">Name</div>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="answer-input"
          />
          <div className="question">Email Address</div>
          <input
            type="email"
            placeholder="User Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="answer-input"
          />
          <div className="question">Phone Number</div>
          <input
            type="tel"
            placeholder="User Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="answer-input"
          />
        </div>
      </IonContent>
      <div className="navigation-buttons">
        <button onClick={onBackClick} className="back-button">BACK</button>
        <button
          onClick={onNextClick}
          className="next-button"
          disabled={!username || !emailAddress || !phone} // Disable button if any field is empty
        >
          NEXT
        </button>
      </div>
    </IonPage>
  );
};

export default CoachView;
