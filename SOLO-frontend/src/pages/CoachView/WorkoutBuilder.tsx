import React, { useState, useEffect, useContext } from 'react';
import {
  IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonModal, IonLabel, IonItem, IonInput,
  IonAccordionGroup, IonAccordion, IonChip, IonPopover, IonList, IonSearchbar, IonToast,
  IonSelectOption, IonSelect, IonAlert, IonCard, IonCardContent
} from '@ionic/react';
import '../../components/CoachView/WorkoutBuilder.css';
import TabBar from './TabBar';
import { ApiService } from '../../../services/api.service';
import { AuthContext } from '../../contexts/AuthContext';

interface Drill {
  name: string;
  distance: string;
}

interface Workout {
  title: string;
  intensity: string;
  time: number;
  warmUpDrills?: Drill[];
  coreDistance?: string;
  coreReps?: { repTime?: number }[];
  coreRest?: number;
  coolDownDrills?: Drill[];
  workoutType: string;
  userId: string;
}

const initialDrills = ["A-skip", "B-skip", "C-skip", "High knees", "Side shuffle", "Bounce Bounce Turn", "Running backwards", "Butt kicks", "Frankensteins", "Lunges", "Fast Lunges", "Fast Lunges w/ twist", "Karoke", "Back Hamstring active stretches", "Half sprints", "Knee pulls"];
const initialDistances = ["100m", "200m", "400m", "800m"];

const WorkoutBuilder: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  
  const [showModal, setShowModal] = useState(false);
  const [showWarmUpModal, setShowWarmUpModal] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(false);
  const [showCoolDownModal, setShowCoolDownModal] = useState(false);

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [standardWorkouts, setStandardWorkouts] = useState<Workout[]>([]);
  const [dynamicWorkouts, setDynamicWorkouts] = useState<Workout[]>([]);
  const [competitionWorkouts, setCompetitionWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Workout>({ title: '', intensity: '', time: 0, workoutType: '', userId: userId });
  const [warmUpDrills, setWarmUpDrills] = useState<Drill[]>([]);
  const [coreDistance, setCoreDistance] = useState<string>('');
  const [coreReps, setCoreReps] = useState<{ repTime?: number }[]>([]);
  const [coreRest, setCoreRest] = useState<number>();
  const [coolDownDrills, setCoolDownDrills] = useState<Drill[]>([]);
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  const [tempWarmUpDrills, setTempWarmUpDrills] = useState<Drill[]>([]);
  const [tempCoreDistance, setTempCoreDistance] = useState<string>('');
  const [tempCoreReps, setTempCoreReps] = useState<{ repTime?: number }[]>([]);
  const [tempCoreRest, setTempCoreRest] = useState<number>();
  const [tempCoolDownDrills, setTempCoolDownDrills] = useState<Drill[]>([]);

  useEffect(() => {
    fetchWorkoutsByType('standard');
    fetchWorkoutsByType('dynamic');
    fetchWorkoutsByType('competition');
    setExpandedSections(['standard', 'dynamic', 'competition']);
  }, [userId]);

  const fetchWorkoutsByType = async (workoutType: string) => {
    try {
      const workouts = await ApiService.getWorkoutsByUserAndType(userId, workoutType);
      const mappedWorkouts = workouts.map((workout: any) => ({
        ...workout,
        title: workout.name, // Map name to title
      }));

      if (workoutType === 'standard') {
        setStandardWorkouts(mappedWorkouts);
      } else if (workoutType === 'dynamic') {
        setDynamicWorkouts(mappedWorkouts);
      } else if (workoutType === 'competition') {
        setCompetitionWorkouts(mappedWorkouts);
      }
    } catch (error) {
      console.error(`Failed to fetch ${workoutType} workouts:`, error);
    }
  };

  const calculateTotalTime = () => {
    return coreReps.reduce((total, rep) => total + (rep.repTime || 0), 0) + (coreRest || 0);
  };

  const generateWorkout = async () => {
    const workoutWithWarmUp = {
      ...newWorkout,
      time: calculateTotalTime(),
      warmUpDrills,
      coreDistance,
      coreReps,
      coreRest,
      coolDownDrills,
      workoutType: selectedSection!,
      userId: userId // Ensure userId is included
    };
  
    console.log('Sending values:', workoutWithWarmUp);
  
    try {
      if (editingWorkout) {
        await ApiService.updateWorkoutType(editingWorkout.id!, workoutWithWarmUp);
        setToastMessage('Workout updated successfully!');
      } else {
        await ApiService.createWorkoutType(workoutWithWarmUp);
        setToastMessage('Workout generated successfully!');
      }
      fetchWorkoutsByType(selectedSection!); 
      setNewWorkout({ title: '', intensity: '', time: 0, workoutType: '', userId: userId });
      clearWarmUpFields();
      clearCoreFields();
      clearCoolDownFields();
      setShowModal(false);
      setWarmUpSaved(false);
      setCoreSaved(false);
      setCoolDownSaved(false);
      setEditingWorkout(null);
      setShowToast(true);
    } catch (error) {
      console.error('Failed to create or update workout:', error);
      setToastMessage('Failed to create or update workout. Please try again later.');
      setShowToast(true);
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

  const handleEditWorkout = (workout: Workout) => {
    setNewWorkout({
      ...workout,
      title: workout.name, // Map name to title
    });
    setWarmUpDrills(workout.warmUpDrills || []);
    setCoreDistance(workout.coreDistance || '');
    setCoreReps(workout.coreReps || []);
    setCoreRest(workout.coreRest);
    setCoolDownDrills(workout.coolDownDrills || []);
    setEditingWorkout(workout);
    setShowModal(true);
  };

  const filterOptions = (options: string[], query: string) => {
    return options.filter(option => option.toLowerCase().includes(query.toLowerCase()));
  };

  const filteredDrills = filterOptions(drills, drillSearch);
  const filteredDistances = filterOptions(distances, distanceSearch);

  const addCustomDrill = () => {
    if (drillSearch && !drills.includes(drillSearch)) {
      setDrills([...drills, drillSearch]);
      setShowToast(true);
      setToastMessage(`Added custom drill: ${drillSearch}`);
    }
  };

  const addCustomDistance = () => {
    if (distanceSearch && !distances.includes(distanceSearch)) {
      setDistances([...distances, distanceSearch]);
      setShowToast(true);
      setToastMessage(`Added custom distance: ${distanceSearch}`);
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

  const openDrillPopover = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setShowDrillPopover(true);
    setDrillSearch(tempWarmUpDrills[index]?.name || '');
  };

  const openDistancePopover = (event: React.MouseEvent, index: number, forCore: boolean = false) => {
    event.preventDefault();
    setShowDistancePopover(true);
    setDistanceSearch(forCore ? tempCoreDistance : tempWarmUpDrills[index]?.distance || '');
  };

  const selectDrill = (drill: string) => {
    const newWarmUpDrills = [...tempWarmUpDrills];
    newWarmUpDrills[newWarmUpDrills.length - 1].name = drill;
    setTempWarmUpDrills(newWarmUpDrills);
    setShowDrillPopover(false);
    setDrillSearch('');
  };

  const selectDistance = (distance: string, forCore: boolean = false) => {
    if (forCore) {
      setTempCoreDistance(distance);
    } else {
      const newWarmUpDrills = [...tempWarmUpDrills];
      newWarmUpDrills[newWarmUpDrills.length - 1].distance = distance;
      setTempWarmUpDrills(newWarmUpDrills);
    }
    setShowDistancePopover(false);
    setDistanceSearch('');
  };

  const selectDrillForCoolDown = (drill: string, index: number) => {
    const newCoolDownDrills = [...tempCoolDownDrills];
    newCoolDownDrills[index].name = drill;
    setTempCoolDownDrills(newCoolDownDrills);
    setShowDrillPopover(false);
    setDrillSearch('');
  };
  
  const selectDistanceForCoolDown = (distance: string, index: number) => {
    const newCoolDownDrills = [...tempCoolDownDrills];
    newCoolDownDrills[index].distance = distance;
    setTempCoolDownDrills(newCoolDownDrills);
    setShowDistancePopover(false);
    setDistanceSearch('');
  };
  
  const confirmActionWithAlert = (action: () => void, message: string) => {
    setConfirmAction(() => action);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const clearWarmUpFields = () => {
    setWarmUpDrills([]);
    setDrillSearch('');
    setDistanceSearch('');
  };

  const clearCoreFields = () => {
    setCoreDistance('');
    setCoreReps([]);
    setCoreRest(undefined);
    setDistanceSearch('');
  };

  const clearCoolDownFields = () => {
    setCoolDownDrills([]);
    setDrillSearch('');
    setDistanceSearch('');
  };

  const closeWarmUpModal = () => {
    setShowWarmUpModal(false);
  };

  const closeCoreModal = () => {
    setShowCoreModal(false);
  };

  const closeCoolDownModal = () => {
    setShowCoolDownModal(false);
  };

  const closeMainModal = () => {
    setShowModal(false);
    clearWarmUpFields();
    clearCoreFields();
    clearCoolDownFields();
    setEditingWorkout(null);
  };

  const saveWarmUp = () => {
    confirmActionWithAlert(() => {
      setWarmUpDrills(tempWarmUpDrills);
      setWarmUpSaved(true);
      setShowWarmUpModal(false);
    }, 'Are you sure the Warm Up details are correct?');
  };

  const saveCore = () => {
    confirmActionWithAlert(() => {
      setCoreDistance(tempCoreDistance);
      setCoreReps(tempCoreReps);
      setCoreRest(tempCoreRest);
      setCoreSaved(true);
      setShowCoreModal(false);
    }, 'Are you sure the Core details are correct?');
  };

  const saveCoolDown = () => {
    confirmActionWithAlert(() => {
      setCoolDownDrills(tempCoolDownDrills);
      setCoolDownSaved(true);
      setShowCoolDownModal(false);
    }, 'Are you sure the Cool Down details are correct?');
  };

  const addWarmUpDrill = () => {
    setTempWarmUpDrills([...tempWarmUpDrills, { name: '', distance: '' }]);
  };

  const addCoreRep = () => {
    setTempCoreReps([...tempCoreReps, { repTime: undefined }]);
  };

  const updateCoreRepTime = (time: number | undefined, index: number) => {
    const newCoreReps = [...tempCoreReps];
    newCoreReps[index].repTime = time;
    setTempCoreReps(newCoreReps);
  };

  const addCoolDownDrill = () => {
    setTempCoolDownDrills([...tempCoolDownDrills, { name: '', distance: '' }]);
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
                  <button className="edit-button" onClick={() => handleEditWorkout(workout)}>Edit Workout</button>
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
                  <button className="edit-button" onClick={() => handleEditWorkout(workout)}>Edit Workout</button>
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
                  <button className="edit-button" onClick={() => handleEditWorkout(workout)}>Edit Workout</button>
                </div>
              ))}
              <IonButton onClick={() => {
                setSelectedSection('competition');
                setShowModal(true);
              }}>Generate Workout</IonButton>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        <IonModal isOpen={showModal} onDidDismiss={closeMainModal} className="fullscreen-modal">
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
              <div className="custom-card-content">
                {warmUpDrills.length > 0 && (
                  warmUpDrills.map((drill, index) => (
                    <IonChip key={index} color="primary">{drill.name} - {drill.distance}</IonChip>
                  ))
                )}
              </div>
              <button
                className="custom-add-button"
                style={{ backgroundColor: warmUpSaved ? 'lightblue' : '', color: warmUpSaved ? 'blue' : '', borderColor: warmUpSaved ? 'blue' : '' }}
                onClick={() => {
                  setTempWarmUpDrills(warmUpDrills);
                  setShowWarmUpModal(true);
                }}
              >
                {warmUpSaved ? 'Edit' : 'Add'}
              </button>
            </div>

            <div className="custom-card">
              <IonLabel className="custom-card-title">Running Circuit</IonLabel>
              <br />
              <div className="custom-card-content">
                {coreDistance && (
                  <IonChip color="primary">Distance: {coreDistance}</IonChip>
                )}
                {coreReps.map((rep, index) => (
                  <IonChip key={index} color="primary">Rep {index + 1}: {rep.repTime} mins</IonChip>
                ))}
                {coreRest && (
                  <IonChip color="primary">Rest: {coreRest} mins</IonChip>
                )}
              </div>
              <button
                className="custom-add-button"
                style={{ backgroundColor: coreSaved ? 'lightblue' : '', color: coreSaved ? 'blue' : '', borderColor: coreSaved ? 'blue' : '' }}
                onClick={() => {
                  setTempCoreDistance(coreDistance);
                  setTempCoreReps(coreReps);
                  setTempCoreRest(coreRest);
                  setShowCoreModal(true);
                }}
              >
                {coreSaved ? 'Edit' : 'Add'}
              </button>
            </div>

            <div className="custom-card">
              <IonLabel className="custom-card-title">Cool Down</IonLabel>
              <br />
              <div className="custom-card-content">
                {coolDownDrills.length > 0 && (
                  coolDownDrills.map((drill, index) => (
                    <IonChip key={index} color="primary">{drill.name} - {drill.distance}</IonChip>
                  ))
                )}
              </div>
              <button
                className="custom-add-button"
                style={{ backgroundColor: coolDownSaved ? 'lightblue' : '', color: coolDownSaved ? 'blue' : '', borderColor: coolDownSaved ? 'blue' : '' }}
                onClick={() => {
                  setTempCoolDownDrills(coolDownDrills);
                  setShowCoolDownModal(true);
                }}
              >
                {coolDownSaved ? 'Edit' : 'Add'}
              </button>
            </div>

            <IonButton expand="full" onClick={generateWorkout}>
              Generate
            </IonButton>
            <IonButton fill="clear" onClick={closeMainModal}>
              Close
            </IonButton>
          </div>
        </IonModal>

        <IonModal isOpen={showWarmUpModal} onDidDismiss={closeWarmUpModal} className="fullscreen-modal">
          <IonHeader>
            <IonToolbar>
              <header className="gradient-header">
                <div className="logo">WARM UP DETAILS</div>
              </header>
            </IonToolbar>
          </IonHeader>
          <div className="modal-content">
            {tempWarmUpDrills.map((drill, index) => (
              <IonCard key={index}>
                <IonCardContent>
                  <IonItem>
                    <IonInput
                      value={drill.name}
                      placeholder="Search or add custom drill"
                      onIonChange={(e) => {
                        const newWarmUpDrills = [...tempWarmUpDrills];
                        newWarmUpDrills[index].name = e.detail.value!;
                        setTempWarmUpDrills(newWarmUpDrills);
                      }}
                      onClick={(event) => openDrillPopover(event, index)}
                      onKeyDown={(e) => handleKeyDown(e, addCustomDrill)}
                      onBlur={() => handleBlur(addCustomDrill)}
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
                      {filteredDrills.map((drillOption, drillIndex) => (
                        <IonItem key={drillIndex} button onClick={() => selectDrill(drillOption)}>
                          {drillOption}
                        </IonItem>
                      ))}
                    </IonList>
                  </IonPopover>

                  <IonItem>
                    <IonInput
                      value={drill.distance}
                      placeholder="Search or add custom distance"
                      onIonChange={(e) => {
                        const newWarmUpDrills = [...tempWarmUpDrills];
                        newWarmUpDrills[index].distance = e.detail.value!;
                        setTempWarmUpDrills(newWarmUpDrills);
                      }}
                      onClick={(event) => openDistancePopover(event, index)}
                      onKeyDown={(e) => handleKeyDown(e, addCustomDistance)}
                      onBlur={() => handleBlur(addCustomDistance)}
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
                      {filteredDistances.map((distanceOption, distanceIndex) => (
                        <IonItem key={distanceIndex} button onClick={() => selectDistance(distanceOption)}>
                          {distanceOption}
                        </IonItem>
                      ))}
                    </IonList>
                  </IonPopover>
                </IonCardContent>
              </IonCard>
            ))}
            <IonButton onClick={addWarmUpDrill}>Add Warm Up</IonButton>
            <IonButton expand="full" style={{ marginTop: '20px' }} onClick={saveWarmUp}>
              Save
            </IonButton>
            <IonButton fill="clear" onClick={closeWarmUpModal}>
              Close
            </IonButton>
          </div>
        </IonModal>

        <IonModal isOpen={showCoreModal} onDidDismiss={closeCoreModal} className="fullscreen-modal">
          <IonHeader>
            <IonToolbar>
              <header className="gradient-header">
                <div className="logo">RUNNING CIRCUIT DETAILS</div>
              </header>
            </IonToolbar>
          </IonHeader>
          <div className="modal-content">
            <IonItem>
              <IonInput
                value={tempCoreDistance}
                placeholder="Search or add custom distance"
                onIonChange={(e) => setTempCoreDistance(e.detail.value!)}
                onClick={(event) => openDistancePopover(event, 0, true)}
                onKeyDown={(e) => handleKeyDown(e, addCustomDistance)}
                onBlur={() => handleBlur(addCustomDistance)}
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
                  <IonItem key={index} button onClick={() => selectDistance(distance, true)}>
                    {distance}
                  </IonItem>
                ))}
              </IonList>
            </IonPopover>

            {tempCoreReps.map((rep, index) => (
              <IonItem key={index}>
                <IonInput
                  placeholder={`Please enter rep ${index + 1} time (mins)`}
                  type="number"
                  value={rep.repTime}
                  onIonChange={(e) => updateCoreRepTime(Number(e.detail.value!), index)}
                ></IonInput>
              </IonItem>
            ))}
            <IonButton onClick={addCoreRep}>Add Rep</IonButton>
            <IonItem className="custom-ion-item">
              <IonInput
                placeholder="Please enter rest time (mins)"
                type="number"
                value={tempCoreRest}
                onIonChange={(e) => setTempCoreRest(Number(e.detail.value!))}
              ></IonInput>
            </IonItem>
            <IonButton expand="full" style={{ marginTop: '20px' }} onClick={saveCore}>
              Save
            </IonButton>
            <IonButton fill="clear" onClick={closeCoreModal}>
              Close
            </IonButton>
          </div>
        </IonModal>

        <IonModal isOpen={showCoolDownModal} onDidDismiss={closeCoolDownModal} className="fullscreen-modal">
          <IonHeader>
            <IonToolbar>
              <header className="gradient-header">
                <div className="logo">COOL DOWN DETAILS</div>
              </header>
            </IonToolbar>
          </IonHeader>
          <div className="modal-content">
            {tempCoolDownDrills.map((drill, index) => (
              <IonCard key={index}>
                <IonCardContent>
                  <IonItem>
                    <IonInput
                      value={drill.name}
                      placeholder="Search or add custom drill"
                      onIonChange={(e) => {
                        const newCoolDownDrills = [...tempCoolDownDrills];
                        newCoolDownDrills[index].name = e.detail.value!;
                        setTempCoolDownDrills(newCoolDownDrills);
                      }}
                      onClick={(event) => openDrillPopover(event, index)}
                      onKeyDown={(e) => handleKeyDown(e, addCustomDrill)}
                      onBlur={() => handleBlur(addCustomDrill)}
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
                      {filteredDrills.map((drillOption, drillIndex) => (
                        <IonItem key={drillIndex} button onClick={() => selectDrillForCoolDown(drillOption, index)}>
                          {drillOption}
                        </IonItem>
                      ))}
                    </IonList>
                  </IonPopover>

                  <IonItem>
                    <IonInput
                      value={drill.distance}
                      placeholder="Search or add custom distance"
                      onIonChange={(e) => {
                        const newCoolDownDrills = [...tempCoolDownDrills];
                        newCoolDownDrills[index].distance = e.detail.value!;
                        setTempCoolDownDrills(newCoolDownDrills);
                      }}
                      onClick={(event) => openDistancePopover(event, index)}
                      onKeyDown={(e) => handleKeyDown(e, addCustomDistance)}
                      onBlur={() => handleBlur(addCustomDistance)}
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
                      {filteredDistances.map((distanceOption, distanceIndex) => (
                        <IonItem key={distanceIndex} button onClick={() => selectDistanceForCoolDown(distanceOption, index)}>
                          {distanceOption}
                        </IonItem>
                      ))}
                    </IonList>
                  </IonPopover>
                </IonCardContent>
              </IonCard>
            ))}
            <IonButton onClick={addCoolDownDrill}>Add Cool Down</IonButton>
            <IonButton expand="full" style={{ marginTop: '20px' }} onClick={saveCoolDown}>
              Save
            </IonButton>
            <IonButton fill="clear" onClick={closeCoolDownModal}>
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
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={alertMessage}
          buttons={[
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                setConfirmAction(null);
              }
            },
            {
              text: 'Yes',
              handler: () => {
                if (confirmAction) confirmAction();
                setConfirmAction(null);
              }
            }
          ]}
        />
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default WorkoutBuilder;
