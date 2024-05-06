import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import '../../components/StartExploring.css';
import { useHistory } from 'react-router-dom';


const SEAthlete: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="centered-content">
        <div className="centerSE-container">
          <IonImg src="../../../public/Group 1418.png" className="logo-image" />
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


