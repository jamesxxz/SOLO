import { IonCard, IonCardContent, IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import React from 'react';
import { Athlete } from '../types/Athlete';

interface Props {
  athletes: Athlete[];
}

const DynamicImageGrid: React.FC<Props> = ({ athletes }) => {
  return (
    <IonGrid>
      <IonRow>
        {athletes.map((athlete, index) => (
          <IonCol key={index} size='6' size-md='6'>
            <IonCard>
              <IonCardContent>
                <IonImg src={athlete.imagePath} />
                <div style={{ padding: '10px' }}>
                  <h2>{athlete.name}</h2>
                  <p>{athlete.location}</p>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default DynamicImageGrid;