import React from 'react';
import './GradientHeader.css'; // Ensure to create this CSS file in the same directory
import { IonHeader, IonToolbar } from '@ionic/react';

const GradientHeader: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <header className="gradient-header">
          <div className="logo">ATHLETE INFORMATION</div>
        </header>
      </IonToolbar>
    </IonHeader>
  );
};

export default GradientHeader;