import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonFooter, IonButton} from '@ionic/react';
import { arrowBackOutline, trashBin, trashBinOutline, trashOutline, checkmarkCircleOutline} from "ionicons/icons";
import { AuthContext } from '../../contexts/AuthContext';
import { ApiService } from '../../../services/api.service';
import NewTabBar from './NewTabBar';
import '../../components/AthleteView/AthletePerformanceResult.css';


const AthletePerformanceResult: React.FC = () => {
  const history = useHistory();

  const diagnosticData = [
    { label: 'Speed', value: '9.5 m/s', personalBest: '9.2 m/s' },
    { label: 'Reaction Time', value: '.15 sec', personalBest: '.13 sec' },
    { label: 'Acceleration', value: '3.2 m/s²', personalBest: '3.6 m/s²' },
    { label: 'Deceleration', value: '-2 m/s²', personalBest: '-2 m/s²' },
    { label: 'Form Efficiency', value: '84%', personalBest: '86%' },
    { label: 'Cadence', value: '190 SPM', personalBest: '191 SPM' },
    { label: 'Knee Lift Height', value: '11 in', personalBest: '11 in' },
    { label: 'Test', value: 'Test only', personalBest:'Test only'},
    { label: 'Test', value: 'Test only', personalBest:'Test only'},
    { label: 'Test', value: 'Test only', personalBest:'Test only'},
    { label: 'Test', value: 'Test only', personalBest:'Test only'}
  ];

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
        <div className="section-title">100m Diagnostic Results</div>

        <IonGrid>
          {diagnosticData.map((item, index) => (
            <IonRow key={index} className="result-row">
              <IonCol size="12" className="result-item">
              <div className="result-combined-label">
              <span className="result-label">{item.label}</span>
            <span className="spacer"></span>
              <span className="result-label">Personal Best</span>
              </div>
              <div className="result-combined-value">
              <span className="result-value">{item.value}</span>
            <span className="spacer"></span>
            <span className="result-value">{item.personalBest}</span>
             </div>
          </IonCol>
            </IonRow>
          ))}
        </IonGrid>

      </IonContent>
      <NewTabBar />
    </IonPage>
  );
};

export default AthletePerformanceResult;
