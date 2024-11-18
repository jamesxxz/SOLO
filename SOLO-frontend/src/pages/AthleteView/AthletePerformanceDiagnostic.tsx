import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonFooter, IonButton} from '@ionic/react';
import { arrowBackOutline, trashBin, trashBinOutline, trashOutline, checkmarkCircleOutline} from "ionicons/icons";
import { AuthContext } from '../../contexts/AuthContext';
import { ApiService } from '../../../services/api.service';
import NewTabBar from './NewTabBar';
import '../../components/AthleteView/AthletePerformanceDiagnostic.css';


const AthletePerformanceDiagnostic: React.FC = () => {
  const history = useHistory();
  const mediaItems = [
    '/7fc50ca6aac7bfdb5d06b56fe0839e4b.png', 
    '/42f11a4a635ef1a10449411ad5d1661a.png',
    '/e5e0942b2ca723a358ade691f11d8e12.png',
    '/f3fd66ee5b7318e7c7fa1e81e9238e7f.png',
    '/c1.png',
    '/c2.png',
    '/c3.png',
    '/c4.png',
  ];
  
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (index) => {
    setSelectedMedia(index);
  }

  const handleRunDiagnostic = () => {
    if (selectedMedia !== null) {
      // Navigate to the new page and pass the selected media as state
      history.push('/athlete-diagnostic-result', { selectedMedia: mediaItems[selectedMedia] });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="new-gradient-header">
          <div className="logo">Performance Diagnostic</div>
          </header>
          <div className="menu-icon-container">
              <IonIcon icon={arrowBackOutline} className="arrow-left-icon"/>
            </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="section-title">Choose media</div>

      {/* Media Grid */}
      <IonGrid>
      <IonRow>
        {mediaItems.map((item, index) => (
          <IonCol size="4" key={index} onClick={() => handleMediaClick(index)}>
            <div className={`media-item ${selectedMedia === index ? 'selected' : ''}`}>
              <img src={item} alt={`Media ${index + 1}`} className="media-image" />
              {selectedMedia === index && (
                <IonIcon icon={checkmarkCircleOutline} className="selected-icon" />
              )}
            </div>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  


      {/* Run Diagnostic Button */}
      <IonButton className="action-button"onClick={handleRunDiagnostic}
          disabled={selectedMedia === null}>
        Run Diagnostic
      </IonButton>

      </IonContent>
      <NewTabBar />
    </IonPage>
  );
};

export default AthletePerformanceDiagnostic;
