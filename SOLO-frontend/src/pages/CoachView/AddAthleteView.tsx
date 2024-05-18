import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../components/CoachView/AddAthleteView.css'; // Ensure the path is correct

const AddAthleteView: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phone, setPhone] = useState('');

  const onBackClick = () => {
    history.push('/coach-home'); // Navigation function
  };

  const onAddAthleteClick = () => {
    if (isFormValid) {
      alert('Athlete added successfully!');
      // Clear input fields
      setUsername('');
      setEmailAddress('');
      setPhone('');
      // Navigate to coach-home
      history.push('/coach-home');
    } else {
      alert('Please fill in all fields with valid data.');
    }
  };




  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = username && validateEmail(emailAddress);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="gradient-header">
            <div className="logo">ADD ATHLETE</div>
            <button onClick={onBackClick} className="close-button">X</button>
          </header>
        </IonToolbar>
      </IonHeader>
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
      <div className="add-athlete-button-container">
        <button
          onClick={onAddAthleteClick}
          className="add-athlete-button"
          disabled={!isFormValid} // Disable the button if form is not valid
        >
          Add Athlete
        </button>
      </div>
      </IonContent>

    </IonPage>
  );
};

export default AddAthleteView;
