import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, person, barbell, calendar } from 'ionicons/icons';
import '../../components/AthleteView/TabBar2.css'; // Import the CSS file

const TabBar: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="custom-tab-bar">
      <IonTabButton tab="coachhome" href="/coach-home">
        <IonIcon icon={home} className="tab-icon" />
      </IonTabButton>

      <IonTabButton tab="coachprofile" href="/coach-profile-view">
        <IonIcon icon={person} className="tab-icon" />
      </IonTabButton>
      
    <IonTabButton tab="coachworkout" href="/coach-workout-builder">
        <IonIcon icon={barbell} className="tab-icon" />
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar;