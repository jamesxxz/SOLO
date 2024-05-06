import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/AthleteView/ProfileHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AthleteView/AthleteView.css';

interface AthleteViewProps {
  onNextClick: () => void; // Define only the method type here
}

const AthleteView: React.FC<AthleteViewProps> = ({
}) => {
  const history = useHistory(); // Use useHistory inside the component
  const [name, setName] = useState(''); // Renamed state variable

  const onBackClick = () => {
    history.push('/home'); // Navigation function
  };
  const onNextClick = () => {
    history.push('/account-question-2'); // Assuming route needs update
  };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
      <div className="question-view">
          <div className="user-card">
            <img src="path_to_image.jpg" alt="User" className="user-image"/>
            <div className="user-info">
              <div className="user-name">Samantha</div>
              <div className="user-location">Los Angeles, CA</div>
            </div>
          </div>
        </div>
      </IonContent>
    
      <div className="navigation-buttons">
        <button onClick={onBackClick} className="back-button">HOME</button> 
        <button 
          onClick={onNextClick} 
          className="next-button"
          disabled={!name} // Disable button if name is empty; REPLACE WITH ICONS
        >
          PROFILE
        </button>
      </div>
    </IonPage>
  );
}

export default AthleteView;