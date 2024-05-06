import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import DynamicHeader from '../../components/AthleteView/DynamicHeader';  // Import the header component
import MediaSection from '../../components/AthleteView/MediaSection';

interface AthleteViewProps {
    onNextClick: () => void; // Define only the method type here
}

const AthleteCurrentMedia: React.FC = (AthleteViewProps) => {
    const history = useHistory(); // Use useHistory inside the component
    const [name, setName] = useState(''); // Renamed state variable
  
    const onBackClick = () => {
      history.push('/home'); // Navigation function
    };
    const onNextClick = () => {
      history.push('/account-question-2'); // Assuming route needs update
    };

    const currentMedia = [
      { id: '1', name: 'xxx.png', imageUrl: 'path_to_image_xxx.png' },
      { id: '2', name: 'yyy.png', imageUrl: 'path_to_image_yyy.png' }
    ];
  
  
    return (
      <IonPage>
        <DynamicHeader title="Media Name" />
        <IonContent>
          <MediaSection title="" mediaItems={currentMedia} onViewMore={() => console.log('View more current media')} />
        </IonContent>
        
        <div className="navigation-buttons">
            <button onClick={onBackClick} className="back-button">HOME</button> 
            <button 
                onClick={onNextClick} 
                className="next-button"
                disabled={!name} // Disable button if name is empty; REPLACE WITH ICONS
                >
                PROFILE
            </button>
        </div>
      </IonPage>
    );
  };
  
  export default AthleteCurrentMedia;