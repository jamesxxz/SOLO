import React, { useEffect } from 'react';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../components/StartExploring.css';

const SECoach: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem('coachHasRefreshed');
    if (!hasRefreshed) {
      sessionStorage.setItem('coachHasRefreshed', 'true');
      window.location.reload();
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="centered-content">
        <div className="centerSE-container">
          <IonImg src="/Group 1418.png" className="logo-image" />
          <h1 className="main-title">Account Created</h1>

          <div className="button-container">
            <button className="custom-button exploring-button" onClick={() => { history.push('/coach-home'); }}>
              Start Exploring
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SECoach;
