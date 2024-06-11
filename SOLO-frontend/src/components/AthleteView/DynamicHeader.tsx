// <- {TITLE}

import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import './AthleteView.css'; // Ensure the CSS is included

interface DynamicHeaderProps {
  title: string;  // This allows the title to be set dynamically
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({ title }) => {
  return (
    <IonHeader className="custom-header">
      <IonToolbar className="custom-toolbar">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" text="" className="custom-back-button" />
        </IonButtons>
        <IonTitle className="custom-title">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default DynamicHeader;
