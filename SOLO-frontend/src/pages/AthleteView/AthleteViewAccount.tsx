import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonToolbar, IonPage, IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { athletes } from '../../data/athletes';
import TabBar2 from './TabBar2';

const AthleteHome: React.FC = () => {
  const history = useHistory(); // Use useHistory inside the component
  const [name, setName] = useState(''); // Renamed state variable

  const handleCardClick = () => {
    history.push('/athlete-view-media'); // for the card
  };

  const navigateToAddAthleteView = () => {
    console.log('Attempting to navigate to /add-athlete-view');
    history.push('/add-athlete-view');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="gradient-header">
          <div className="logo">MY CURRENT ATHLETES</div>
          </header>
        </IonToolbar>
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
      </IonContent>
      <TabBar2 />

    </IonPage>
  );
};

export default AthleteHome;
