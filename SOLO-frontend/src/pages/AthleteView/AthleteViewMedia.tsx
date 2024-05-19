import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import DynamicHeader from '../../components/AthleteView/DynamicHeader'; 
import TabBar2 from './TabBar2';

const AthleteViewMedia: React.FC = () => {
  const currentMedia = [
    { id: 1, name: 'xxx.png', url: '/path/to/image1.png' },
    { id: 2, name: 'yyy.png', url: '/path/to/image2.png' },
  ];

  const pastMedia = [
    { id: 1, name: 'xxx.png', url: '/path/to/image3.png' },
    { id: 2, name: 'yyy.png', url: '/path/to/image4.png' },
  ];

  return (
    <IonPage>
      <DynamicHeader title="My Media" />

      <IonContent fullscreen>
        <div className="media-section">
          <h2 className="section-title">Current Media</h2>
          <IonList>
            {currentMedia.map((media) => (
              <IonItem className="media-item" key={media.id}>
                <img src={media.url} alt={media.name} className="media-image" />
                <IonLabel>{media.name}</IonLabel>
                <button className="delete-button">🗑️</button>
              </IonItem>
            ))}
          </IonList>
          <div className="view-more-container">
            <IonButton routerLink="/athlete-current-media" fill="clear" color="primary">View More</IonButton>
          </div>
        </div>

        <div className="media-section">
          <h2 className="section-title">Past Media</h2>
          <IonList>
            {pastMedia.map((media) => (  
              <IonItem className="media-item" key={media.id}>
                <img src={media.url} alt={media.name} className="media-image" />
                <IonLabel>{media.name}</IonLabel>
                <button className="delete-button">🗑️</button>
              </IonItem>
            ))}
          </IonList>
          <div className="view-more-container">
            <IonButton routerLink="/athlete-past-media" fill="clear" color="primary">View More</IonButton>
          </div>
        </div>
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
};

export default AthleteViewMedia;