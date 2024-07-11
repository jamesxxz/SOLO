import React, { useState, useContext, useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonCard, IonCardTitle, IonCardSubtitle, IonToolbar, IonButton, IonModal, IonLabel, IonItem, IonSelect, IonSelectOption, IonDatetime } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { ApiService } from '../../../services/api.service'; // Ensure this path is correct
import { AuthContext } from '../../contexts/AuthContext'; // Ensure this path is correct
import TabBar from './TabBar';
import '../../components/CoachView/WorkoutBuilder.css'; // Make sure this path is correct
import CalendarBar from './CalendarBar'; // Import the new CalendarBar component
import defaultImage from '../../../public/Flying Mario.jpeg'; // Adjust the path if necessary
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

interface Athlete {
  athlete_id: string;
  profile_pic_url: string;
  name: string;
  email: string;
  affiliation_name: string;
}

const WorkoutBuilder: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);
  const [selectedBuild, setSelectedBuild] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string>('');
  const [demonstration, setDemonstration] = useState<File | null>(null);

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
    setShowModal(true);
  };

  const handleGenerate = () => {
    // Logic to handle generating a workout
    setShowModal(false);
    alert('Workout generated!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setDemonstration(file);
  };

  const buildOptions = [
    { label: 'Warm-Up', value: 'warm-up' },
    { label: 'Core', value: 'core' },
    { label: 'Cool Down', value: 'cool-down' },
  ];

  const typeOptions = {
    'warm-up': [
      { label: 'Standard (Demonstration: Runs, Stretches, Drills)', value: 'standard' },
      { label: 'Dynamic (Demonstration: Runs, Stretches, Drills)', value: 'dynamic' },
      { label: 'Competition (Demonstration: Runs, Stretches, Drills)', value: 'competition' },
      { label: 'Custom (Search/Add - Runs, Stretches, Drills)', value: 'custom' },
    ],
    'core': [
      { label: 'Drills (Demonstration – Type, Distance, Recovery, Reps)', value: 'drills' },
      { label: 'Runs (Demonstration - Distance(s), Time(s), Recovery, Reps)', value: 'runs' },
      { label: 'Lifts (Demonstration – Type, Weight, Reps, Recovery)', value: 'lifts' },
    ],
    'cool-down': [
      { label: 'Slow Runs (Demonstration – Type, Distance, Recovery, Reps)', value: 'slow-runs' },
      { label: 'Standard + Dynamic Stretches (Demonstration – Type, Reps)', value: 'stretches' },
    ],
  };

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      console.log('Generate workout modal dismissed with confirm'); // Debug log
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="gradient-header">
            <div className="logo">WORKOUT BUILDER</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CalendarBar />
        <div className="workout-builder-content">
          <h2 className="assigned-workouts-title">Assigned Workouts</h2>
          <div className="athlete-list">
            {athletes.map((athlete) => (
              <IonCard key={athlete.athlete_id} className="athlete-card" onClick={() => navigateToAthleteProfile(athlete.athlete_id)}>
                <div className="athlete-info">
                  <IonCardTitle className="athlete-name">{athlete.name}</IonCardTitle>
                  <IonCardSubtitle className="athlete-affiliation">{athlete.affiliation_name}</IonCardSubtitle>
                </div>
              </IonCard>
            ))}
          </div>
          <IonButton expand="full" onClick={generateWorkout} className="generate-workout-button">
            Generate Workout
          </IonButton>
        </div>
        <IonModal isOpen={showModal} onWillDismiss={(ev) => onWillDismiss(ev)} className="fullscreen-modal">
          <div className="modal-content">
            <h2>Generate Workout</h2>
            <IonItem>
              <IonLabel>Select Athlete:</IonLabel>
              <IonSelect value={selectedAthlete} onIonChange={(e) => setSelectedAthlete(e.detail.value)}>
                {athletes.map((athlete) => (
                  <IonSelectOption key={athlete.athlete_id} value={athlete.athlete_id}>
                    {athlete.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {selectedAthlete && (
              <IonItem>
                <IonLabel>Select Build:</IonLabel>
                <IonSelect value={selectedBuild} onIonChange={(e) => setSelectedBuild(e.detail.value)}>
                  {buildOptions.map((option) => (
                    <IonSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
            {selectedBuild && (
              <IonItem>
                <IonLabel>Select Type:</IonLabel>
                <IonSelect value={selectedType} onIonChange={(e) => setSelectedType(e.detail.value)}>
                  {typeOptions[selectedBuild].map((option) => (
                    <IonSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
            {selectedType && (
              <IonItem>
                <IonLabel>Assign Due Date:</IonLabel>
                <IonDatetime value={dueDate} onIonChange={(e) => setDueDate(e.detail.value)} />
              </IonItem>
            )}
            <IonButton expand="full" onClick={handleGenerate} disabled={!selectedType || !dueDate}>
              Generate
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default WorkoutBuilder;
