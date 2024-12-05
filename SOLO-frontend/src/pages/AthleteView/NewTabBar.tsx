import React from "react";
import { IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { home, list, person, calendar } from "ionicons/icons";
import "../../components/AthleteView/NewTabBar.css"; // Import the CSS file

const NewTabBar: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="custom-tab-bar">
      <IonTabButton tab="athleteprofile" href="/athlete-view-account">
        <IonIcon icon={home} className="tab-icon" />
      </IonTabButton>
      <IonTabButton tab="tasklist" href="/task-list">
        <IonIcon icon={list} className="tab-icon" />
      </IonTabButton>
      <IonTabButton tab="athleteeditprofile" href="/athlete-profile">
        <IonIcon icon={person} className="tab-icon" />
      </IonTabButton>

      <IonTabButton tab="calendar" href="/calendar">
        <IonIcon icon={calendar} className="tab-icon" />
      </IonTabButton>
    </IonTabBar>
  );
};

export default NewTabBar;
