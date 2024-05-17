import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import '../components/Home.css';
import { useHistory } from 'react-router-dom';


const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="centered-content">
        <div className="center-container">
          <IonImg src="../../public/SOLOLogo.png" className="logo-image" />
          <h1 className="main-title">SOLO</h1>
          <p className="subtitle">Connect, Train, Workout</p>

          <div className="button-container">
            <button className="custom-button login-button" onClick={() => { history.push('/login'); }}>
              Login
            </button>
            <button className="custom-button signup-button" onClick={() => { history.push('/account-question-1'); }}>
              Create an Account
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;


