import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonFooter, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { home, person, arrowBackOutline, list, calendar } from 'ionicons/icons';
import '../../components/AthleteView/AthletePerformancePage.css'; // Adjust the path to your CSS file
import { chevronForwardOutline } from 'ionicons/icons';

const AthletePerformancePage: React.FC = () => {

  const history = useHistory();

  // Navigation functions for buttons
  const navigateToHome = () => {
    history.push('/home'); // Navigate to the Home page
  };

  const navigateToProfile = () => {
    history.push('/athlete-profile'); // Navigate to the Profile page
  };

  const goBack = () => {
    history.goBack(); // Navigate back to the previous page
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="performance-header">
          <div className="back-button" onClick={goBack}>
            <IonIcon icon={arrowBackOutline} style={{ fontSize: '35px'}} />
          </div>
          <h1 className="header-title">Performance Summaries</h1>
        </div>
      </IonHeader>
      <IonContent>
        <div className="overview-header">Overview</div>

        <div className="performance-container">
          <div className="performance-card" onClick={() => history.push('/average-speed')}>
            <span className="performance-title">Average Speed</span>
            <span className="performance-value">13.5 m/s</span>
            <IonIcon icon={chevronForwardOutline} className="arrow-icon" />
          </div>
          <div className="performance-card" onClick={() => history.push('/reaction-time')}>
            <span className="performance-title">Reaction Time</span>
            <span className="performance-value">0.18 sec</span>
            <IonIcon icon={chevronForwardOutline} className="arrow-icon" />
          </div>
          <div className="performance-card" onClick={() => history.push('/acceleration')}>
            <span className="performance-title">Acceleration</span>
            <span className="performance-value">2.5 m/s²</span>
            <IonIcon icon={chevronForwardOutline} className="arrow-icon" />
          </div>
          <div className="performance-card" onClick={() => history.push('/deceleration')}>
            <span className="performance-title">Deceleration</span>
            <span className="performance-value">-2 m/s²</span>
            <IonIcon icon={chevronForwardOutline} className="arrow-icon" />
          </div>
          <div className="performance-card" onClick={() => history.push('/form-efficiency')}>
            <span className="performance-title">Form Efficiency</span>
            <span className="performance-value">85%</span>
            <IonIcon icon={chevronForwardOutline} className="arrow-icon" />
          </div>
          <div className="performance-card" onClick={() => history.push('/cadence')}>
            <span className="performance-title">Cadence</span>
            <span className="performance-value">180 SPM</span>
            <IonIcon icon={chevronForwardOutline} className="arrow-icon" />
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: 'white',
            borderTop: '1px solid #ccc',
          }}
        >
          <IonButton fill="clear" onClick={navigateToHome}>
            <IonIcon icon={home} style={{ fontSize: '20px', marginRight: '8px' }} />
          </IonButton>
          <IonButton fill="clear" onClick={navigateToProfile}>
            <IonIcon icon={list} style={{ fontSize: '20px', marginRight: '8px' }} />
          </IonButton>
          <IonButton fill="clear" onClick={navigateToProfile}>
            <IonIcon icon={person} style={{ fontSize: '20px', marginRight: '8px' }} />
          </IonButton>
          <IonButton fill="clear" onClick={navigateToProfile}>
            <IonIcon icon={calendar} style={{ fontSize: '20px', marginRight: '8px' }} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default AthletePerformancePage;