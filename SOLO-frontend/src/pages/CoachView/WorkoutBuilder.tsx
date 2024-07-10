import React, { useState, useContext, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonCard, IonCardTitle, IonCardSubtitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { ApiService } from '../../../services/api.service'; // Ensure this path is correct
import { AuthContext } from '../../contexts/AuthContext'; // Ensure this path is correct
import TabBar from './TabBar';
import '../../components/CoachView/CoachHome.css'; // Make sure this path is correct
import defaultImage from '../../../public/Flying Mario.jpeg'; // Adjust the path if necessary

interface Athlete {
  athlete_id: string;
  profile_pic_url: string;
  name: string;
  email: string;
  affiliation_name: string;
}

const WorkoutBuilder: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  const fetchAthletes = async () => {
    try {
      if (!userId) {
        console.log('userId is not available'); // Debug log
        return;
      }

      const coachId = parseInt(userId, 10); // Convert userId to integer
      console.log('Fetching athletes for coachId:', coachId); // Debug log
      const linkedAthletes = await ApiService.getLinkedAthletes(coachId);
      console.log('Linked athletes:', linkedAthletes); // Debug log

      // Map through the linked athletes and ensure the profile_pic_url is correctly set
      const athletesWithProfilePic = await Promise.all(linkedAthletes.map(async (athlete: any) => {
        if (athlete.profile_pic) {
          const response = await fetch(`http://localhost:3001/file-url?key=${athlete.profile_pic}`);
          const data = await response.json();
          return {
            ...athlete,
            profile_pic_url: data.url || defaultImage,
          };
        } else {
          return {
            ...athlete,
            profile_pic_url: defaultImage,
          };
        }
      }));

      setAthletes(athletesWithProfilePic);
    } catch (error) {
      console.error('Error fetching linked athletes:', error);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, [userId]);

  const navigateToAthleteProfile = (athleteId: string) => {
    console.log('Navigating to athlete profile:', athleteId); // Debug log
    history.push(`/current-athlete-view?athleteId=${athleteId}&coachId=${userId}`);
  };

  const generateWorkout = () => {
    // Function to generate a new workout
    alert('New workout generated!');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/coach-home" />
          </IonButtons>
          <header className="gradient-header">
            <div className="logo">WORKOUT BUILDER</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="workout-builder-content">
          <h2>Assigned Workouts</h2>
          {athletes.map((athlete) => (
            <IonCard key={athlete.athlete_id} style={{ position: 'relative' }} onClick={() => navigateToAthleteProfile(athlete.athlete_id)}>
              <div style={{ padding: '10px' }}>
                <IonCardTitle style={{ color: 'black' }}>{athlete.name}</IonCardTitle>
                <IonCardSubtitle style={{ color: 'grey' }}>{athlete.affiliation_name}</IonCardSubtitle>
              </div>
            </IonCard>
          ))}
          <IonButton expand="full" onClick={generateWorkout} className="generate-workout-button">
            Generate Workout
          </IonButton>
        </div>
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default WorkoutBuilder;
