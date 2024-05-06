import React from 'react';
import { IonContent, IonHeader, IonPage, IonCard, IonCardTitle, IonCardSubtitle, IonIcon, IonLabel, IonTabBar, IonTabButton, IonRouterOutlet, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, person } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import CoachHomeView from './CoachHome';
import CoachProfile from './AddAthleteView';
import AddAthleteView from './AddAthleteView'; 
const TabBar: React.FC = () => {
  return (
    <IonReactRouter>
        <IonTabs>
        <IonRouterOutlet>
            <Route exact path="/home" component={CoachHomeView} />
            <Route exact path="/profile" component={CoachProfile} />
            <Route exact path="/add-athlete-view" component={AddAthleteView} />
            <Redirect exact from="/tab-bar" to="/home" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default TabBar;
