import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonContent, IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { AuthContext } from '../../contexts/AuthContext';
import { ApiService } from '../../../services/api.service';
import TabBar2 from './TabBar2';
import defaultImage from '../../../public/Flying Mario.jpeg'; // Adjust the path if necessary
import '../../components/CoachView/ProfileView.css'

const AthleteHome: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  const [athlete, setAthlete] = useState({
    id: '',
    profile_pic_url: '',
    name: '',
    email: '',
    affiliation_name: '',
  });

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        if (!userId) {
          console.log('userId is not available'); // Debug log
          return;
        }

        const athleteData = await ApiService.getAthleteById(userId); // Pass the userId directly as a string
        console.log('Fetched athlete data:', athleteData); // Debug log
        setAthlete({
          ...athleteData,
          profile_pic_url: athleteData.profile_pic_url || defaultImage,
        });
      } catch (error) {
        console.error('Error fetching athlete data:', error);
      }
    };

    fetchAthlete();
  }, [userId]);

  const handleCardClick = () => {
    history.push('/athlete-view-media');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="gradient-header">
            <div className="logo">MY PROFILE</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <IonCard key={athlete.id} onClick={handleCardClick} style={{ position: 'relative', cursor: 'pointer', width: '300px', height: '300px' }}>
            <img 
              src={athlete.profile_pic_url} // Use the athlete's profile picture if available
              alt={athlete.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '5px', textAlign: 'center' }}>
              <IonCardTitle style={{ margin: 0 }}>{athlete.name}</IonCardTitle>
              <IonCardSubtitle style={{ margin: 0 }}>{athlete.affiliation_name}</IonCardSubtitle>
            </div>
          </IonCard>
        </div>
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
};

export default AthleteHome;
