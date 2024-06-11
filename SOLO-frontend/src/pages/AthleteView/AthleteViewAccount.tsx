import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonContent, IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { AuthContext } from '../../contexts/AuthContext';
import { ApiService } from '../../../services/api.service';
import TabBar2 from './TabBar2';
import defaultImage from '../../../public/Flying Mario.jpeg'; // Adjust the path if necessary
import '../../components/CoachView/ProfileView.css';

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
            <div className="logo">MY ACCOUNT</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '20px' }}>
          <IonCard 
            key={athlete.id} 
            onClick={handleCardClick} 
            style={{ 
              position: 'relative', 
              cursor: 'pointer', 
              width: '180px', 
              height: '200px', 
              marginLeft: '0' 
            }}
          >
            <img 
              src={athlete.profile_pic_url} 
              alt={athlete.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '10px' 
              }} 
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '0', 
              left: '0', 
              width: '100%', 
              padding: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.6)', 
              backdropFilter: 'blur(1px)', 
              WebkitBackdropFilter: 'blur(10px)', 
              textAlign: 'center' 
            }}>
              <IonCardTitle style={{ 
                margin: '0', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: 'black' 
              }}>{athlete.name}</IonCardTitle>
              <IonCardSubtitle style={{ 
                margin: '0', 
                fontSize: '14px', 
                color: 'black' 
              }}>{athlete.affiliation_name}</IonCardSubtitle>
            </div>
          </IonCard>
        </div>
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
};

export default AthleteHome;
