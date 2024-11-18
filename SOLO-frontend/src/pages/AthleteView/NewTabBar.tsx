import React from "react";
import { IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { home, person, calendar, homeOutline, personOutline, calendarOutline } from "ionicons/icons";
import "../../components/AthleteView/NewTabBar.css"; // Import the CSS file

const NewTabBar: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="custom-tab-bar">
      <IonTabButton tab="athleteprofile" href="/athlete-view-account">
        {/*change the home to homeOutline*/}
        <IonIcon icon={homeOutline} className="tab-icon" />
      </IonTabButton>

      <IonTabButton tab="athleteeditprofile" href="/athlete-profile">
        {/*change the person to personOutline*/}
        <IonIcon icon={personOutline} className="tab-icon" />
      </IonTabButton>

      <IonTabButton tab="calendar" href="/calendar">
        {/*change the calendar to calendarOutline*/}
        <IonIcon icon={calendarOutline} className="tab-icon" />
      </IonTabButton>
    </IonTabBar>
  );
};

export default NewTabBar;
