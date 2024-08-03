import React, { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonModal, IonLabel, IonItem, IonInput,
  IonAccordionGroup, IonAccordion, IonChip, IonPopover, IonList, IonSearchbar, IonToast,
  IonSelectOption,
  IonSelect
} from '@ionic/react';
import '../../components/CoachView/WorkoutBuilder.css'; // Make sure this path is correct
import TabBar from './TabBar';
import { ApiService } from '../../../services/api.service'; // Make sure this path is correct

interface Workout {
  title: string;
  intensity: string;
  time: number;
  warmUpDrills?: string[];
  warmUpDistance?: string;
  coreDistance?: string;
  coreRep1?: number;
  coreRep2?: number;
  coreRest?: number;
  coolDownDrills?: string[];
  coolDownDistance?: string;
}

const initialDrills = ["A-skip", "B-skip", "C-skip", "High knees", "Side shuffle", "Bounce Bounce Turn", "Running backwards", "Butt kicks", "Frankensteins", "Lunges", "Fast Lunges", "Fast Lunges w/ twist", "Karoke", "Back Hamstring active stretches", "Half sprints", "Knee pulls"];
const initialDistances = ["100m", "200m", "400m", "800m"];

const WorkoutBuilder: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWarmUpModal, setShowWarmUpModal] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(false);
  const [showCoolDownModal, setShowCoolDownModal] = useState(false);

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [standardWorkouts, setStandardWorkouts] = useState<Workout[]>([]);
  const [dynamicWorkouts, setDynamicWorkouts] = useState<Workout[]>([]);
  const [competitionWorkouts, setCompetitionWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Workout>({ title: '', intensity: '', time: 0 });
  const [warmUpDrills, setWarmUpDrills] = useState<string[]>([]);
  const [warmUpDistance, setWarmUpDistance] = useState<string>('');
  const [coreDistance, setCoreDistance] = useState<string>('');
  const [coreRep1, setCoreRep1] = useState<number>();
  const [coreRep2, setCoreRep2] = useState<number>();
  const [coreRest, setCoreRest] = useState<number>();
  const [coolDownDrills, setCoolDownDrills] = useState<string[]>([]);
  const [coolDownDistance, setCoolDownDistance] = useState<string>('');
  const [drillSearch, setDrillSearch] = useState('');
  const [distanceSearch, setDistanceSearch] = useState('');
  const [warmUpSaved, setWarmUpSaved] = useState(false);
  const [coreSaved, setCoreSaved] = useState(false);
  const [coolDownSaved, setCoolDownSaved] = useState(false);

  const [drills, setDrills] = useState(initialDrills);
  const [distances, setDistances] = useState(initialDistances);

  const [showDrillPopover, setShowDrillPopover] = useState(false);
  const [showDistancePopover, setShowDistancePopover] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Expand all sections initially
    setExpandedSections(['standard', 'dynamic', 'competition']);
  }, []);

  const calculateTotalTime = () => {
    return (coreRep1 || 0) + (coreRep2 || 0) + (coreRest || 0);
  };

  const generateWorkout = async () => {
    const workoutWithWarmUp = {
      ...newWorkout,
      time: calculateTotalTime(),
      warmUpDrills,
      warmUpDistance,
      coreDistance,
      coreRep1,
      coreRep2,
      coreRest,
      coolDownDrills,
      coolDownDistance
    };

    try {
      await ApiService.createWorkoutType(workoutWithWarmUp);
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
      setCoreDistance('');
      setCoreRep1(undefined);
      setCoreRep2(undefined);
      setCoreRest(undefined);
      setCoolDownDrills([]);
      setCoolDownDistance('');
      setShowModal(false);
      setWarmUpSaved(false);
      setCoreSaved(false);
      setCoolDownSaved(false);
    } catch (error) {
      console.error('Failed to create workout type:', error);
      // Handle error (e.g., show a notification)
    }
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

  const filteredDrills = filterOptions(drills, drillSearch);
  const filteredDistances = filterOptions(distances, distanceSearch);

  const addCustomDrill = () => {
    if (drillSearch && !drills.includes(drillSearch)) {
      setDrills([...drills, drillSearch]);
      setWarmUpDrills([drillSearch]);
      setShowToast(true);
      setToastMessage(`Added custom drill: ${drillSearch}`);
      // Keep the drillSearch value to show the added custom input
    }
  };

  const addCustomDistance = () => {
    if (distanceSearch && !distances.includes(distanceSearch)) {
      setDistances([...distances, distanceSearch]);
      setWarmUpDistance(distanceSearch);
      setShowToast(true);
      setToastMessage(`Added custom distance: ${distanceSearch}`);
      // Keep the distanceSearch value to show the added custom input
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, addItem: () => void) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  const handleBlur = (addItem: () => void) => {
    addItem();
  };

  const openDrillPopover = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowDrillPopover(true);
  };

  const openDistancePopover = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowDistancePopover(true);
  };

  const selectDrill = (drill: string) => {
    setWarmUpDrills([drill]);
    setDrillSearch(drill);
    setShowDrillPopover(false);
  };

  const selectDistance = (distance: string) => {
    setWarmUpDistance(distance);
    setDistanceSearch(distance);
    setShowDistancePopover(false);
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
              <IonInput placeholder="Please enter name of the workout" value={newWorkout.title} onIonChange={(e) => setNewWorkout({ ...newWorkout, title: e.detail.value! })}></IonInput>
            </IonItem>

            <IonItem className="custom-ion-item">
              <IonSelect placeholder="Intensity Level" value={newWorkout.intensity} onIonChange={(e) => setNewWorkout({ ...newWorkout, intensity: e.detail.value! })}>
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
              <button
                className="custom-add-button"
                style={{ backgroundColor: warmUpSaved ? 'lightblue' : '', color: warmUpSaved ? 'blue' : '', borderColor: warmUpSaved ? 'blue' : '' }}
                onClick={() => setShowWarmUpModal(true)}
              >
                {warmUpSaved ? 'Edit' : 'Add'}
              </button>
            </div>

            <div className="custom-card">
              <IonLabel className="custom-card-title">Core</IonLabel>
              <br />
              {coreDistance && (
                <IonChip color="primary">Distance: {coreDistance}</IonChip>
              )}
              {coreRep1 && (
                <IonChip color="primary">Rep 1: {coreRep1} mins</IonChip>
              )}
              {coreRep2 && (
                <IonChip color="primary">Rep 2: {coreRep2} mins</IonChip>
              )}
              {coreRest && (
                <IonChip color="primary">Rest: {coreRest} mins</IonChip>
              )}
              <button
                className="custom-add-button"
                style={{ backgroundColor: coreSaved ? 'lightblue' : '', color: coreSaved ? 'blue' : '', borderColor: coreSaved ? 'blue' : '' }}
                onClick={() => setShowCoreModal(true)}
              >
                {coreSaved ? 'Edit' : 'Add'}
              </button>
            </div>

            <div className="custom-card">
              <IonLabel className="custom-card-title">Cool Down</IonLabel>
              <br />
              {coolDownDrills.length > 0 && (
                <IonChip color="primary">Drills: {coolDownDrills.join(', ')}</IonChip>
              )}
              {coolDownDistance && (
                <IonChip color="primary">Distance: {coolDownDistance}</IonChip>
              )}
              <button
                className="custom-add-button"
                style={{ backgroundColor: coolDownSaved ? 'lightblue' : '', color: coolDownSaved ? 'blue' : '', borderColor: coolDownSaved ? 'blue' : '' }}
                onClick={() => setShowCoolDownModal(true)}
              >
                {coolDownSaved ? 'Edit' : 'Add'}
              </button>
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
            <IonItem>
              <IonInput
                value={drillSearch}
                placeholder="Search or add custom drill"
                onIonChange={(e) => setDrillSearch(e.detail.value!)}
                onClick={openDrillPopover}
              />
              <IonButton onClick={addCustomDrill}>Add</IonButton>
            </IonItem>
            <IonPopover
              isOpen={showDrillPopover}
              onDidDismiss={() => setShowDrillPopover(false)}
            >
              <IonSearchbar
                value={drillSearch}
                onIonInput={(e) => setDrillSearch(e.detail.value!)}
                placeholder="Search drills"
              />
              <IonList>
                {filteredDrills.map((drill, index) => (
                  <IonItem key={index} button onClick={() => selectDrill(drill)}>
                    {drill}
                  </IonItem>
                ))}
              </IonList>
            </IonPopover>

            <IonItem>
              <IonInput
                value={distanceSearch}
                placeholder="Search or add custom distance"
                onIonChange={(e) => setDistanceSearch(e.detail.value!)}
                onClick={openDistancePopover}
              />
              <IonButton onClick={addCustomDistance}>Add</IonButton>
            </IonItem>
            <IonPopover
              isOpen={showDistancePopover}
              onDidDismiss={() => setShowDistancePopover(false)}
            >
              <IonSearchbar
                value={distanceSearch}
                onIonInput={(e) => setDistanceSearch(e.detail.value!)}
                placeholder="Search distances"
              />
              <IonList>
                {filteredDistances.map((distance, index) => (
                  <IonItem key={index} button onClick={() => selectDistance(distance)}>
                    {distance}
                  </IonItem>
                ))}
              </IonList>
            </IonPopover>

            <IonButton expand="full" style={{ marginTop: '20px' }} onClick={() => {
              setShowWarmUpModal(false);
              setWarmUpSaved(true); // Update warm-up saved state
            }}>
              Save
            </IonButton>
            <IonButton fill="clear" onClick={() => setShowWarmUpModal(false)}>
              Close
            </IonButton>
          </div>
        </IonModal>

        <IonModal isOpen={showCoreModal} onDidDismiss={() => setShowCoreModal(false)} className="fullscreen-modal">
          <IonHeader>
            <IonToolbar>
              <header className="gradient-header">
                <div className="logo">CORE DETAILS</div>
              </header>
            </IonToolbar>
          </IonHeader>
          <div className="modal-content">
            <IonItem>
              <IonInput
                value={coreDistance}
                placeholder="Search or add custom distance"
                onIonChange={(e) => setDistanceSearch(e.detail.value!)}
                onClick={openDistancePopover}
              />
              <IonButton onClick={addCustomDistance}>Add</IonButton>
            </IonItem>
            <IonPopover
              isOpen={showDistancePopover}
              onDidDismiss={() => setShowDistancePopover(false)}
            >
              <IonSearchbar
                value={distanceSearch}
                onIonInput={(e) => setDistanceSearch(e.detail.value!)}
                placeholder="Search distances"
              />
              <IonList>
                {filteredDistances.map((distance, index) => (
                  <IonItem key={index} button onClick={() => selectDistance(distance)}>
                    {distance}
                  </IonItem>
                ))}
              </IonList>
            </IonPopover>

            <IonItem className="custom-ion-item">
              <IonInput
                placeholder="Please enter rep 1 time (mins)"
                type="number"
                value={coreRep1}
                onIonChange={(e) => setCoreRep1(Number(e.detail.value!))}
              ></IonInput>
            </IonItem>
            <IonItem className="custom-ion-item">
              <IonInput
                placeholder="Please enter rep 2 time (mins)"
                type="number"
                value={coreRep2}
                onIonChange={(e) => setCoreRep2(Number(e.detail.value!))}
              ></IonInput>
            </IonItem>
            <IonItem className="custom-ion-item">
              <IonInput
                placeholder="Please enter rest time (mins)"
                type="number"
                value={coreRest}
                onIonChange={(e) => setCoreRest(Number(e.detail.value!))}
              ></IonInput>
            </IonItem>
            <IonButton expand="full" style={{ marginTop: '20px' }} onClick={() => {
              setShowCoreModal(false);
              setCoreSaved(true); // Update core saved state
            }}>
              Save
            </IonButton>
            <IonButton fill="clear" onClick={() => setShowCoreModal(false)}>
              Close
            </IonButton>
          </div>
        </IonModal>

        <IonModal isOpen={showCoolDownModal} onDidDismiss={() => setShowCoolDownModal(false)} className="fullscreen-modal">
          <IonHeader>
            <IonToolbar>
              <header className="gradient-header">
                <div className="logo">COOL DOWN DETAILS</div>
              </header>
            </IonToolbar>
          </IonHeader>
          <div className="modal-content">
            <IonItem>
              <IonInput
                value={drillSearch}
                placeholder="Search or add custom drill"
                onIonChange={(e) => setDrillSearch(e.detail.value!)}
                onClick={openDrillPopover}
              />
              <IonButton onClick={addCustomDrill}>Add</IonButton>
            </IonItem>
            <IonPopover
              isOpen={showDrillPopover}
              onDidDismiss={() => setShowDrillPopover(false)}
            >
              <IonSearchbar
                value={drillSearch}
                onIonInput={(e) => setDrillSearch(e.detail.value!)}
                placeholder="Search drills"
              />
              <IonList>
                {filteredDrills.map((drill, index) => (
                  <IonItem key={index} button onClick={() => selectDrill(drill)}>
                    {drill}
                  </IonItem>
                ))}
              </IonList>
            </IonPopover>

            <IonItem>
              <IonInput
                value={distanceSearch}
                placeholder="Search or add custom distance"
                onIonChange={(e) => setDistanceSearch(e.detail.value!)}
                onClick={openDistancePopover}
              />
              <IonButton onClick={addCustomDistance}>Add</IonButton>
            </IonItem>
            <IonPopover
              isOpen={showDistancePopover}
              onDidDismiss={() => setShowDistancePopover(false)}
            >
              <IonSearchbar
                value={distanceSearch}
                onIonInput={(e) => setDistanceSearch(e.detail.value!)}
                placeholder="Search distances"
              />
              <IonList>
                {filteredDistances.map((distance, index) => (
                  <IonItem key={index} button onClick={() => selectDistance(distance)}>
                    {distance}
                  </IonItem>
                ))}
              </IonList>
            </IonPopover>

            <IonButton expand="full" style={{ marginTop: '20px' }} onClick={() => {
              setShowCoolDownModal(false);
              setCoolDownSaved(true); // Update cool down saved state
            }}>
              Save
            </IonButton>
            <IonButton fill="clear" onClick={() => setShowCoolDownModal(false)}>
              Close
            </IonButton>
          </div>
        </IonModal>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default WorkoutBuilder;
