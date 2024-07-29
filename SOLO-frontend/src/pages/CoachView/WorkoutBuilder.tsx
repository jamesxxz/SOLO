import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonModal, IonLabel, IonItem, IonInput, IonAccordionGroup, IonAccordion } from '@ionic/react';
import '../../components/CoachView/WorkoutBuilder.css'; // Make sure this path is correct
import TabBar from './TabBar';

interface Workout {
  title: string;
  intensity: string;
  time: number;
}

const WorkoutBuilder: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [standardWorkouts, setStandardWorkouts] = useState<Workout[]>([]);
  const [dynamicWorkouts, setDynamicWorkouts] = useState<Workout[]>([]);
  const [competitionWorkouts, setCompetitionWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Workout>({ title: '', intensity: '', time: 0 });

  const generateWorkout = () => {
    if (selectedSection === 'standard') {
      setStandardWorkouts([...standardWorkouts, newWorkout]);
    } else if (selectedSection === 'dynamic') {
      setDynamicWorkouts([...dynamicWorkouts, newWorkout]);
    } else if (selectedSection === 'competition') {
      setCompetitionWorkouts([...competitionWorkouts, newWorkout]);
    }
    setNewWorkout({ title: '', intensity: '', time: 0 });
    setShowModal(false);
  };

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
        <IonAccordionGroup expand="inset">
          <IonAccordion value="standard">
            <IonItem slot="header" color="light" onClick={() => setSelectedSection('standard')}>
              <IonLabel>Standard Workouts</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              {standardWorkouts.map((workout, index) => (
                <div key={index} className="workout-item">
                  <div className="workout-info">
                    <p>Title: {workout.title}</p>
                    <p>Intensity Level: {workout.intensity}</p>
                    <p>Time: {workout.time} mins</p>
                  </div>
                  <button className="edit-button">Edit Workout</button>
                </div>
              ))}
              <IonButton onClick={() => setShowModal(true)}>Generate Workout</IonButton>
            </div>
          </IonAccordion>
          <IonAccordion value="dynamic">
            <IonItem slot="header" color="light" onClick={() => setSelectedSection('dynamic')}>
              <IonLabel>Dynamic Workouts</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              {dynamicWorkouts.map((workout, index) => (
                <div key={index} className="workout-item">
                  <div className="workout-info">
                    <p>Title: {workout.title}</p>
                    <p>Intensity Level: {workout.intensity}</p>
                    <p>Time: {workout.time} mins</p>
                  </div>
                  <button className="edit-button">Edit Workout</button>
                </div>
              ))}
              <IonButton onClick={() => setShowModal(true)}>Generate Workout</IonButton>
            </div>
          </IonAccordion>
          <IonAccordion value="competition">
            <IonItem slot="header" color="light" onClick={() => setSelectedSection('competition')}>
              <IonLabel>Competition Workouts</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              {competitionWorkouts.map((workout, index) => (
                <div key={index} className="workout-item">
                  <div className="workout-info">
                    <p>Title: {workout.title}</p>
                    <p>Intensity Level: {workout.intensity}</p>
                    <p>Time: {workout.time} mins</p>
                  </div>
                  <button className="edit-button">Edit Workout</button>
                </div>
              ))}
              <IonButton onClick={() => setShowModal(true)}>Generate Workout</IonButton>
            </div>
          </IonAccordion>
        </IonAccordionGroup>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <div className="modal-content">
            <h2>Generate Workout</h2>
            <IonItem>
              <IonLabel position="floating">Title:</IonLabel>
              <IonInput value={newWorkout.title} onIonChange={(e) => setNewWorkout({ ...newWorkout, title: e.detail.value! })} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Intensity Level:</IonLabel>
              <IonInput value={newWorkout.intensity} onIonChange={(e) => setNewWorkout({ ...newWorkout, intensity: e.detail.value! })} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Time (mins):</IonLabel>
              <IonInput type="number" value={newWorkout.time} onIonChange={(e) => setNewWorkout({ ...newWorkout, time: parseInt(e.detail.value!, 10) })} />
            </IonItem>
            <IonButton expand="full" onClick={generateWorkout}>
              Generate
            </IonButton>
            <IonButton fill="clear" onClick={() => setShowModal(false)}>
              Close
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default WorkoutBuilder;
