import React, { useState, useEffect, useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { ApiService } from '../../../services/api.service'; // Ensure this path is correct
import { AuthContext } from '../../contexts/AuthContext'; // Ensure this path is correct
import '../../components/CoachView/AddAthleteView.css';

interface Affiliation {
  affiliation_id: string;
  name: string;
}

const AddAthleteView: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [affiliationId, setAffiliationId] = useState('');
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const response = await ApiService.getAffiliations();
        setAffiliations(response);
      } catch (error) {
        console.error('Error fetching affiliations:', error);
      }
    };
    fetchAffiliations();
  }, []);

  const onBackClick = () => {
    history.push('/coach-home');
  };

  const onAddAthleteClick = async () => {
    if (isFormValid) {
      try {
        const athleteData = await ApiService.getAthleteByEmailAndPhoneAndAffiliation({
          email: emailAddress,
          phone_number: phone,
          affiliation_id: affiliationId,
        });

        console.log('Athlete data:', athleteData);

        if (athleteData && athleteData.athlete_id) {
          console.log('Athlete ID:', athleteData.athlete_id);

          // Link athlete to coach
          await ApiService.linkAthleteToCoach({
            coach_id: parseInt(userId!, 10), // Convert userId to integer
            athlete_id: athleteData.athlete_id,
          });

          alert('Athlete found and added successfully!');

          // Navigate back to coach home
          history.push('/coach-home');

        } else {
          alert('No matching athlete found.');
        }
      } catch (error) {
        console.error('Error fetching athlete data:', error);
        alert('Error fetching athlete data.');
      }
    } else {
      alert('Please fill in all fields with valid data.');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = username && validateEmail(emailAddress) && phone && affiliationId;

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
          <div className="question">Affiliation</div>
          <select
            name="affiliationId"
            value={affiliationId}
            onChange={(e) => setAffiliationId(e.target.value)}
            className="answer-input"
          >
            <option value="">Select your affiliation</option>
            {affiliations.map((affiliation) => (
              <option key={affiliation.affiliation_id} value={affiliation.affiliation_id}>
                {affiliation.name}
              </option>
            ))}
          </select>
        </div>
        <div className="add-athlete-button-container">
          <button
            onClick={onAddAthleteClick}
            className="add-athlete-button"
            disabled={!isFormValid}
          >
            Add Athlete
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddAthleteView;