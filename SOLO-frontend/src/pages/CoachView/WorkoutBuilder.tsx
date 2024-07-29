import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonModal, IonLabel, IonItem, IonInput,
  IonAccordionGroup, IonAccordion, IonSelect, IonSelectOption, IonChip
} from '@ionic/react';
import FuzzySearch from 'react-fuzzy';
import '../../components/CoachView/WorkoutBuilder.css'; // Make sure this path is correct
import TabBar from './TabBar';


interface Workout {
  title: string;
  intensity: string;
  time: number;
  warmUpDrills?: string[];
  warmUpDistance?: string;
}

const allDrills = ["drill1", "drill2", "drill3", "drill4", "drill5"];
const allDistances = ["100m", "200m", "400m", "800m"];

const WorkoutBuilder: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWarmUpModal, setShowWarmUpModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [standardWorkouts, setStandardWorkouts] = useState<Workout[]>([]);
  const [dynamicWorkouts, setDynamicWorkouts] = useState<Workout[]>([]);
  const [competitionWorkouts, setCompetitionWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Workout>({ title: '', intensity: '', time: 0 });
  const [warmUpDrills, setWarmUpDrills] = useState<string[]>([]);
  const [warmUpDistance, setWarmUpDistance] = useState<string>('');

  const [drillSearch, setDrillSearch] = useState('');
  const [distanceSearch, setDistanceSearch] = useState('');

  useEffect(() => {
    // Expand all sections initially
    setExpandedSections(['standard', 'dynamic', 'competition']);
  }, []);

  const generateWorkout = () => {
    const workoutWithWarmUp = {
      ...newWorkout,
      warmUpDrills,
      warmUpDistance
    };

    if (selectedSection === 'standard') {
      setStandardWorkouts([...standardWorkouts, workoutWithWarmUp]);
    } else if (selectedSection === 'dynamic') {
      setDynamicWorkouts([...dynamicWorkouts, workoutWithWarmUp]);
    } else if (selectedSection === 'competition') {
      setCompetitionWorkouts([...competitionWorkouts, workoutWithWarmUp]);
    }
    setNewWorkout({ title: '', intensity: '', time: 0 });
    setWarmUpDrills([]);
    setWarmUpDistance('');
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

  const filterOptions = (options: string[], query: string) => {
    return options.filter(option => option.toLowerCase().includes(query.toLowerCase()));
  };

  const filteredDrills = filterOptions(allDrills, drillSearch);
  const filteredDistances = filterOptions(allDistances, distanceSearch);

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
              <br />
              {warmUpDrills.length > 0 && (
                <IonChip color="primary">Drills: {warmUpDrills.join(', ')}</IonChip>
              )}
              {warmUpDistance && (
                <IonChip color="primary">Distance: {warmUpDistance}</IonChip>
              )}
              <button className="custom-add-button" onClick={() => setShowWarmUpModal(true)}>Add</button>
            </div>

            <div className="custom-card">
              <IonLabel className="custom-card-title">Core</IonLabel>
              <button className="custom-add-button">Add</button>
            </div>

            <div className="custom-card">
              <IonLabel className="custom-card-title">Cool Down</IonLabel>
              <button className="custom-add-button">Add</button>
            </div>

            <IonButton expand="full" onClick={generateWorkout}>
              Generate
            </IonButton>
            <IonButton fill="clear" onClick={() => setShowModal(false)}>
              Close
            </IonButton>
          </div>
        </IonModal>

        <IonModal isOpen={showWarmUpModal} onDidDismiss={() => setShowWarmUpModal(false)} className="fullscreen-modal">
          <IonHeader>
            <IonToolbar>
              <header className="gradient-header">
                <div className="logo">WARM UP DETAILS</div>
              </header>
            </IonToolbar>
          </IonHeader>
          <div className="modal-content">
          <FuzzySearch
              list={allDrills.map(drill => ({ id: drill, title: drill }))}
              keys={['title']}
              width={430}
              onSelect={(selectedItem) => {
                if (!warmUpDrills.includes(selectedItem.title)) {
                  setWarmUpDrills([...warmUpDrills, selectedItem.title]);
                }
              }}
              placeholder="Search drills"
              resultsTemplate={(props, state, styles, clickHandler) => {
                return state.results.map((val, i) => {
                  const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                  return (
                    <div
                      key={i}
                      style={style}
                      onClick={() => clickHandler(i)}
                    >
                      {val.title}
                    </div>
                  );
                });
              }}
            />

            <FuzzySearch
              list={allDistances.map(distance => ({ id: distance, title: distance }))}
              keys={['title']}
              width={430}
              onSelect={(selectedItem: { title: React.SetStateAction<string>; }) => setWarmUpDistance(selectedItem.title)}
              placeholder="Search distances"
              resultsTemplate={(props, state, styles, clickHandler) => {
                return state.results.map((val, i) => {
                  const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                  return (
                    <div
                      key={i}
                      style={style}
                      onClick={() => clickHandler(i)}
                    >
                      {val.title}
                    </div>
                  );
                });
              }}
            />
            <IonButton expand="full" onClick={() => setShowWarmUpModal(false)}>
              Save
            </IonButton>
            <IonButton fill="clear" onClick={() => setShowWarmUpModal(false)}>
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
