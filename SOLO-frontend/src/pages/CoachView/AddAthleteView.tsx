import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../components/CoachView/CoachView.css';

const AddAthleteView: React.FC = () => {
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

  const onAddAthleteClick = () => {
    // Handle add athlete functionality
    // This function should navigate to the page where you add an athlete
    // You can replace the alert with the navigation code
    alert('Add Athlete clicked!');
  };

  return (
    <IonPage>
      <header className="gradient-header">
        <div className="logo">ADD ATHLETE</div>
        <button onClick={onBackClick} className="close-button">X</button> {/* Close button */}
      </header>
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
      <div className="add-athlete-button-container">
        <button onClick={onAddAthleteClick} className="add-athlete-button">
          Add Athlete
        </button>
      </div>
    </IonPage>
  );
};

export default AddAthleteView;
