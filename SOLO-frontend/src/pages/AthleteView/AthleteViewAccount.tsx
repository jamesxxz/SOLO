import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { athletes } from '../../data/athletes';

const AthleteHome: React.FC = () => {
  const history = useHistory(); // Use useHistory inside the component
  const [name, setName] = useState(''); // Renamed state variable

  const onBackClick = () => {
    history.push('/athlete-view-account'); // TODO: CHange
  };
  const onNextClick = () => {
    history.push('/account-question-2'); // TODO: CHANGE
  };

  const handleCardClick = () => {
    history.push('/athlete-view-media'); // for the card
  };

  const navigateToAddAthleteView = () => {
    console.log('Attempting to navigate to /add-athlete-view');
    history.push('/add-athlete-view');
};


  return (
    <IonPage>
      <IonHeader className="gradient-header">
        <div className="logo">MY ACCOUNT</div>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
          <IonCard key={0} onClick={handleCardClick} style={{ position: 'relative', cursor: 'pointer' }}>
            <img src={athletes[0].imagePath} alt={athletes[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '10px' }}>
              <IonCardTitle style={{ color: 'white' }}>{athletes[0].name}</IonCardTitle>
              <IonCardSubtitle style={{ color: 'white' }}>{athletes[0].location}</IonCardSubtitle>
            </div>
          </IonCard>
        </div>

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
      </IonContent>

    </IonPage>
  );
};

export default AthleteHome;
