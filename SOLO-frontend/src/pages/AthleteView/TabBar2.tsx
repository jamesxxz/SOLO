import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabs } from '@ionic/react';
import { home, person, camera } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import AthleteViewAccount from './AthleteViewAccount';
import AthleteProfile from './AthleteProfile';
import AthleteViewMedia from './AthleteViewMedia';
const TabBar2: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/athlete-view-account" component={AthleteViewAccount} />
          <Route exact path="/athlete-view-media" component={AthleteViewMedia} />
          <Route exact path="/tab-bar2" component={AthleteViewAccount} />
          <Route exact path="/athlete-profile" component={AthleteProfile} />
          <Redirect exact from="/" to="/athlete-view-account" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="athlete-view-account" href="/athlete-view-account">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="athlete-view-media" href="/athlete-view-media">
            <IonIcon icon={camera} />
            <IonLabel>Media</IonLabel>
          </IonTabButton>
          <IonTabButton tab="athlete-profile" href="/athlete-profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default TabBar2;