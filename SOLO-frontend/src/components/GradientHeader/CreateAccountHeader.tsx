import React from 'react';
import { useHistory } from 'react-router-dom'; 
import './GradientHeader.css'; 
import { IonHeader, IonToolbar } from '@ionic/react';

const GradientHeader: React.FC = () => {
  const history = useHistory(); 

  const redirectToHome = () => {
    history.push('/home'); 
  };

  return (
    <IonHeader>
    <IonToolbar>
      <header className="gradient-header">
        <div className="logo">CREATE ACCOUNT</div>
        <button onClick={redirectToHome} className="close-button">X</button> {/* Close button */}
      </header>
    </IonToolbar>
    </IonHeader>
  );
};

export default GradientHeader;
