import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, person } from 'ionicons/icons';
import '../../components/AthleteView/TabBar2.css'; // Import the CSS file

const TabBar2: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="custom-tab-bar">
      <IonTabButton tab="athleteprofile" href="/athlete-view-account">
        <IonIcon icon={home} className="tab-icon" />
        <IonLabel className="tab-label">Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="athleteeditprofile" href="/athlete-profile">
        <IonIcon icon={person} className="tab-icon" />
        <IonLabel className="tab-label">Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar2;