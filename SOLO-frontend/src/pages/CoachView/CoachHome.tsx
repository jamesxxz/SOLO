import React from 'react';
import { IonContent, IonHeader, IonPage, IonCard, IonCardTitle, IonCardSubtitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';  // Import useHistory from react-router-dom
import { athletes } from '../../data/athletes';
import TabBar from './TabBar';

const CoachHome: React.FC = () => {
  const history = useHistory();  // Initialize useHistory hook for navigation

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
          {athletes.map((athlete, index) => (
            <IonCard key={index} style={{ position: 'relative' }}>
              <img src={athlete.imagePath} alt={athlete.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '10px' }}>
                <IonCardTitle style={{ color: 'white' }}>{athlete.name}</IonCardTitle>
                <IonCardSubtitle style={{ color: 'white' }}>{athlete.location}</IonCardSubtitle>
              </div>
            </IonCard>
          ))}
        </div>
        <button
          onClick={navigateToAddAthleteView}
          style={{
            position: 'fixed',
            right: '0.75rem',
            bottom: '4.75rem', // Adjusted bottom margin to ensure visibility above the tab bar
            backgroundImage: 'linear-gradient(to right, #3499CD 0%, #3485CD 29%, #354DCD 59%, #26256C 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            zIndex: 1000, // Ensure the button is above the tab bar
          }}
        >
          + Add Athlete
        </button>
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default CoachHome;
