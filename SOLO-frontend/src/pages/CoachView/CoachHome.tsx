import React from 'react';
import { IonContent, IonHeader, IonPage, IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';  // Import useHistory from react-router-dom
import { athletes } from '../../data/athletes';

const CoachHome: React.FC = () => {
  const history = useHistory();  // Initialize useHistory hook for navigation

  const navigateToAddAthleteView = () => {
    console.log('Attempting to navigate to /add-athlete-view');
    history.push('/add-athlete-view');
};


  return (
    <IonPage>
      <IonHeader className="gradient-header">
        <div className="logo">MY CURRENT ATHLETES</div>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
          {athletes.map((athlete, index) => (
            <IonCard key={index} style={{ position: 'relative' }}>
              <img src={athlete.imagePath} alt={athlete.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '10px'}}>
                <IonCardTitle style={{ color: 'white' }}>{athlete.name}</IonCardTitle>
                <IonCardSubtitle style={{ color: 'white' }}>{athlete.location}</IonCardSubtitle>
              </div>
            </IonCard>
          ))}
        </div>
        <button onClick={navigateToAddAthleteView} style={{
          position: 'fixed',
          right: '0.75rem',
          bottom: '0.75rem',
          backgroundImage: 'linear-gradient(to right, #3499CD 0%, #3485CD 29%, #354DCD 59%, #26256C 100%)',  // Use backgroundImage and correct the property name
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          + Add Athlete
        </button>
      </IonContent>
    </IonPage>
  );
};

export default CoachHome;
