// <- {TITLE}

import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import './AthleteView.css'; // Ensure the CSS is included

interface DynamicHeaderProps {
  title: string;  // This allows the title to be set dynamically
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({ title }) => {
  return (
    <header className="dynamic-header">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />  
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </header>
  );
};

export default DynamicHeader;
