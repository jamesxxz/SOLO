import React, { useEffect } from 'react';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../components/StartExploring.css';

const SEAthlete: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    console.log('Page loaded');
    if (document.readyState === 'complete') {
      return; // Page is already loaded, no need to reload
    }
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="centered-content">
        <div className="centerSE-container">
          <IonImg src="/Group 1418.png" className="logo-image" />
          <h1 className="main-title">Account Created</h1>

          <div className="button-container">
            <button className="custom-button exploring-button" onClick={() => { history.push('/athlete-view-account'); }}>
              Start Exploring
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SEAthlete;
