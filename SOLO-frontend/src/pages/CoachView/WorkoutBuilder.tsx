import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonModal, IonLabel, IonItem, IonInput, IonAccordionGroup, IonAccordion, IonSelect, IonSelectOption } from '@ionic/react';
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
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [standardWorkouts, setStandardWorkouts] = useState<Workout[]>([]);
  const [dynamicWorkouts, setDynamicWorkouts] = useState<Workout[]>([]);
  const [competitionWorkouts, setCompetitionWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Workout>({ title: '', intensity: '', time: 0 });

  useEffect(() => {
    // Expand all sections initially
    setExpandedSections(['standard', 'dynamic', 'competition']);
  }, []);

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

  const handleAccordionChange = (value: string | null) => {
    if (value) {
      setExpandedSections((prevSections) =>
        prevSections.includes(value)
          ? prevSections.filter(section => section !== value)
          : [...prevSections, value]
      );
    }
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
        <IonAccordionGroup
          value={expandedSections}
          onIonChange={e => handleAccordionChange(e.detail.value)}
        >
          <IonAccordion class="accordions" value="standard">
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
              <IonButton onClick={() => {
                setSelectedSection('standard');
                setShowModal(true);
              }}>Generate Workout</IonButton>
            </div>
          </IonAccordion>
          </IonAccordionGroup>
          <IonAccordionGroup
          value={expandedSections}
          onIonChange={e => handleAccordionChange(e.detail.value)}
        >
          <IonAccordion class="accordions" value="dynamic">
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
              <IonButton onClick={() => {
                setSelectedSection('dynamic');
                setShowModal(true);
              }}>Generate Workout</IonButton>
            </div>
          </IonAccordion>
          </IonAccordionGroup>
          <IonAccordionGroup
          value={expandedSections}
          onIonChange={e => handleAccordionChange(e.detail.value)}
        >
          <IonAccordion class="accordions" value="competition">
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
              <IonButton onClick={() => {
                setSelectedSection('competition');
                setShowModal(true);
              }}>Generate Workout</IonButton>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="fullscreen-modal">
        <IonHeader>
        <IonToolbar>
          <header className="gradient-header">
            <div className="logo">GENERATE WORKOUT</div>
          </header>
        </IonToolbar>
      </IonHeader>
          <div className="modal-content">
          
          <IonItem className="custom-ion-item">
            <IonInput label="Name" placeholder="Please enter name of the workout" value={newWorkout.title} onIonChange={(e) => setNewWorkout({ ...newWorkout, title: e.detail.value! })}></IonInput>
          </IonItem>

          <IonItem className="custom-ion-item">
            <IonSelect label="Intensity Level" labelPlacement="floating" value={newWorkout.intensity} onIonChange={(e) => setNewWorkout({ ...newWorkout, intensity: e.detail.value! })}>
              <IonSelectOption value="easy">Easy</IonSelectOption>
              <IonSelectOption value="medium">Medium</IonSelectOption>
              <IonSelectOption value="hard">Hard</IonSelectOption>
            </IonSelect>
          </IonItem>

          <div className="custom-card">
            <IonLabel className="custom-card-title">Warm Up</IonLabel>
            <button className="custom-add-button" >Add</button>
          </div>

          <div className="custom-card">
            <IonLabel className="custom-card-title">Core</IonLabel>
            <button className="custom-add-button" >Add</button>
          </div>

          <div className="custom-card">
            <IonLabel className="custom-card-title">Cool Down</IonLabel>
            <button className="custom-add-button" >Add</button>
          </div>
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
