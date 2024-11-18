import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonProgressBar} from '@ionic/react';
import { arrowBackOutline, trashBin, trashBinOutline, trashOutline } from "ionicons/icons";
import { AuthContext } from '../../contexts/AuthContext';
import { ApiService } from '../../../services/api.service';
import NewTabBar from './NewTabBar';
import '../../components/AthleteView/AthleteView.css';


const AthleteUploadMediaPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="new-gradient-header">
          <div className="logo">Upload Media</div>
          </header>
          <div className="menu-icon-container">
              <IonIcon icon={arrowBackOutline} className="arrow-left-icon"/>
            </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Title */}
      <div className="upload-sub-title">Videos/Images Shared</div>
      <div>
        <div className="media-item">
          <img src="/sampleuploadedpage.png" alt="Preview" className="media-image" />
          <a href="#" className="">xxx.png</a>
          <IonButton fill="clear" className="delete-upload-button">
            <IonIcon icon={trashOutline} />
          </IonButton>
        </div>
        <div className="media-item">
          <img src="/sampleuploadedpage.png" alt="Preview" className="media-image" />
          <a href="#" className="">yyy.png</a>
          <IonButton fill="clear" className="delete-upload-button">
            <IonIcon icon={trashOutline} />
          </IonButton>
        </div>
      </div>

        {/* Uploading Section */}
      <div className="uploading">
        <div>Uploading</div>
        <IonProgressBar value={0.3}></IonProgressBar>
      </div>

      {/* Button for Add Media */}
      <div className='button-group'>
        <IonButton expand="block" className="action-button">Add Media</IonButton>
        <IonButton expand="block" className="action-button">Finish Uploading</IonButton>
        
      </div>
      </IonContent>
      <NewTabBar />
    </IonPage>
  );
};

export default AthleteUploadMediaPage;
