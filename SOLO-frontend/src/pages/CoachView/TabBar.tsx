import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, person, walk } from 'ionicons/icons';
import '../../components/AthleteView/TabBar2.css'; // Import the CSS file

const TabBar: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="custom-tab-bar">
      <IonTabButton tab="coachhome" href="/coach-home">
        <IonIcon icon={home} className="tab-icon" />
        <IonLabel className="tab-label">Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="coachprofile" href="/coach-profile-view">
        <IonIcon icon={person} className="tab-icon" />
        <IonLabel className="tab-label">Profile</IonLabel>
      </IonTabButton>

    <IonTabButton tab="coachworkout" href="/coach-workout-builder">
        <IonIcon icon={walk} className="tab-icon" />
        <IonLabel className="tab-label">Workout Builder</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar;