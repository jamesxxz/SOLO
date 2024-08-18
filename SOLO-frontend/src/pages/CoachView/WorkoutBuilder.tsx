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
  coreDrills?: { distance: string; reps?: { repTime?: number; restTime?: number }[] }[];
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
  const [coreDrills, setCoreDrills] = useState<{ distance: string; reps?: { repTime?: number; restTime?: number }[] }[]>([]);
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
  const [tempCoreDrills, setTempCoreDrills] = useState<{ distance: string; reps?: { repTime?: number; restTime?: number }[] }[]>([]);
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
    return coreDrills.reduce((total, drill) => {
      return total + (drill.reps ? drill.reps.reduce((repTotal, rep) => repTotal + (rep.repTime || 0) + (rep.restTime || 0), 0) : 0);
    }, 0);
  };

  const generateWorkout = async () => {
    const workoutWithDetails = {
      ...newWorkout,
      time: calculateTotalTime(),
      warmUpDrills,
      coreDrills,
      coolDownDrills,
      workoutType: selectedSection!,
      userId: userId // Ensure userId is included
    };
  
    console.log('Sending values:', workoutWithDetails);
  
    try {
      if (editingWorkout) {
        await ApiService.updateWorkoutType(editingWorkout.id!, workoutWithDetails);
        setToastMessage('Workout updated successfully!');
      } else {
        await ApiService.createWorkoutType(workoutWithDetails);
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
    setCoreDrills(workout.coreDrills || []);
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

  const openDistancePopover = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setShowDistancePopover(true);
    setDistanceSearch(tempCoreDrills[index]?.distance || '');
  };

  const selectDrill = (drill: string) => {
    const newWarmUpDrills = [...tempWarmUpDrills];
    newWarmUpDrills[newWarmUpDrills.length - 1].name = drill;
    setTempWarmUpDrills(newWarmUpDrills);
    setShowDrillPopover(false);
    setDrillSearch('');
  };

  const selectDistance = (distance: string) => {
    const newCoreDrills = [...tempCoreDrills];
    newCoreDrills[newCoreDrills.length - 1].distance = distance;
    setTempCoreDrills(newCoreDrills);
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

  const addWarmUpDrill = () => {
    setTempWarmUpDrills([...tempWarmUpDrills, { name: '', distance: '' }]);
  };

  const addCoreDrill = () => {
    setTempCoreDrills([...tempCoreDrills, { distance: '', reps: [{ repTime: undefined, restTime: undefined }] }]);
  };

  const addCoreRep = (drillIndex: number) => {
    const newCoreDrills = [...tempCoreDrills];
    newCoreDrills[drillIndex].reps = [...(newCoreDrills[drillIndex].reps || []), { repTime: undefined, restTime: undefined }];
    setTempCoreDrills(newCoreDrills);
  };

  const updateCoreRepTime = (time: number | undefined, drillIndex: number, repIndex: number) => {
    const newCoreDrills = [...tempCoreDrills];
    if (newCoreDrills[drillIndex].reps) {
      newCoreDrills[drillIndex].reps![repIndex].repTime = time;
      setTempCoreDrills(newCoreDrills);
    }
  };

  const updateCoreRestTime = (time: number | undefined, drillIndex: number, repIndex: number) => {
    const newCoreDrills = [...tempCoreDrills];
    if (newCoreDrills[drillIndex].reps) {
      newCoreDrills[drillIndex].reps![repIndex].restTime = time;
      setTempCoreDrills(newCoreDrills);
    }
  };

  // Warm-Up Section Update

const selectWarmUpDrill = (drill: string, index: number) => {
  const newWarmUpDrills = [...tempWarmUpDrills];
  newWarmUpDrills[index].name = drill;
  setTempWarmUpDrills(newWarmUpDrills);
  setShowDrillPopover(false);
  setDrillSearch('');
};

const selectWarmUpDistance = (distance: string, index: number) => {
  const newWarmUpDrills = [...tempWarmUpDrills];
  newWarmUpDrills[index].distance = distance;
  setTempWarmUpDrills(newWarmUpDrills);
  setShowDistancePopover(false);
  setDistanceSearch('');
};

// Saving the warm-up drills
const saveWarmUp = () => {
  setWarmUpDrills(tempWarmUpDrills);
  setWarmUpSaved(true);
  setShowWarmUpModal(false);
};


  const addCoolDownDrill = () => {
    setTempCoolDownDrills([...tempCoolDownDrills, { name: '', distance: '' }]);
  };

  const clearWarmUpFields = () => {
    setWarmUpDrills([]);
    setDrillSearch('');
    setDistanceSearch('');
  };

  const clearCoreFields = () => {
    setCoreDrills([]);
    setDrillSearch('');
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


  const saveCore = () => {
    setCoreDrills(tempCoreDrills);
    setCoreSaved(true);
    setShowCoreModal(false);
  };

  const saveCoolDown = () => {
    setCoolDownDrills(tempCoolDownDrills);
    setCoolDownSaved(true);
    setShowCoolDownModal(false);
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
                {coreDrills.map((drill, drillIndex) => (
                  <div key={drillIndex}>
                    <IonChip color="primary">Distance: {drill.distance}</IonChip>
                    {drill.reps?.map((rep, repIndex) => (
                      <div key={repIndex}>
                        <IonChip color="primary">Rep {repIndex + 1}: {rep.repTime} mins</IonChip>
                        <IonChip color="secondary">Rest: {rep.restTime} mins</IonChip>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <button
                className="custom-add-button"
                style={{ backgroundColor: coreSaved ? 'lightblue' : '', color: coreSaved ? 'blue' : '', borderColor: coreSaved ? 'blue' : '' }}
                onClick={() => {
                  setTempCoreDrills(coreDrills);
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
                <IonItem key={drillIndex} button onClick={() => selectWarmUpDrill(drillOption, index)}>
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
                <IonItem key={distanceIndex} button onClick={() => selectWarmUpDistance(distanceOption, index)}>
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
            {tempCoreDrills.map((drill, drillIndex) => (
              <IonCard key={drillIndex}>
                <IonCardContent>
                  <IonItem>
                    <IonInput
                      value={drill.distance}
                      placeholder="Search or add custom distance"
                      onIonChange={(e) => {
                        const newCoreDrills = [...tempCoreDrills];
                        newCoreDrills[drillIndex].distance = e.detail.value!;
                        setTempCoreDrills(newCoreDrills);
                      }}
                      onClick={(event) => openDistancePopover(event, drillIndex)}
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

                  {drill.reps?.map((rep, repIndex) => (
                    <div key={repIndex}>
                      <IonItem>
                        <IonInput
                          placeholder={`Please enter rep ${repIndex + 1} time (mins)`}
                          type="number"
                          value={rep.repTime}
                          onIonChange={(e) => updateCoreRepTime(Number(e.detail.value!), drillIndex, repIndex)}
                        ></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonInput
                          placeholder={`Please enter rest time after rep ${repIndex + 1} (mins)`}
                          type="number"
                          value={rep.restTime}
                          onIonChange={(e) => updateCoreRestTime(Number(e.detail.value!), drillIndex, repIndex)}
                        ></IonInput>
                      </IonItem>
                    </div>
                  ))}
                  <IonButton onClick={() => addCoreRep(drillIndex)}>Add Rep</IonButton>
                </IonCardContent>
              </IonCard>
            ))}
            <IonButton onClick={addCoreDrill}>Add Drill</IonButton>
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


