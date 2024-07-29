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
  coreDistance?: string;
  coreRep1?: number;
  coreRep2?: number;
  coreRest?: number;
  coolDownDrills?: string[];
  coolDownDistance?: string;
}

const allDrills = ["A-skip",
  "B-skip",
  "C-skip",
  "High knees",
  "Side shuffle",
  "Bounce Bounce Turn",
  "Running backwards",
  "Butt kicks",
  "Frankensteins",
  "Lunges",
  "Fast Lunges",
  "Fast Lunges w/ twist",
  "Karoke",
  "Back Hamstring active stretches",
  "Half sprints",
  "Knee pulls"];
const allDistances = ["100m", "200m", "400m", "800m"];

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

  useEffect(() => {
    // Expand all sections initially
    setExpandedSections(['standard', 'dynamic', 'competition']);
  }, []);

  const calculateTotalTime = () => {
    return (coreRep1) + (coreRep2) + (coreRest);
  };

  const generateWorkout = () => {
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
            <FuzzySearch
              list={allDrills.map(drill => ({ id: drill, title: drill }))}
              keys={['title']}
              width={430}
              onSelect={(selectedItem) => {
                setWarmUpDrills([selectedItem.title]); // Restrict to one drill
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
            <IonButton expand="full" onClick={() => {
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
            <FuzzySearch
              list={allDistances.map(distance => ({ id: distance, title: distance }))}
              keys={['title']}
              width={430}
              onSelect={(selectedItem: { title: React.SetStateAction<string>; }) => setCoreDistance(selectedItem.title)}
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
            <IonItem className="custom-ion-item">
              <IonInput placeholder="Please enter rep 1 time (mins)" type="number" value={coreRep1} onIonChange={(e) => setCoreRep1(Number(e.detail.value!))}></IonInput>
            </IonItem>
            <IonItem className="custom-ion-item">
              <IonInput placeholder="Please enter rep 2 time (mins)" type="number" value={coreRep2} onIonChange={(e) => setCoreRep2(Number(e.detail.value!))}></IonInput>
            </IonItem>
            <IonItem className="custom-ion-item">
              <IonInput placeholder="Please enter rest time (mins)" type="number" value={coreRest} onIonChange={(e) => setCoreRest(Number(e.detail.value!))}></IonInput>
            </IonItem>
            <IonButton expand="full" onClick={() => {
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
            <FuzzySearch
              list={allDrills.map(drill => ({ id: drill, title: drill }))}
              keys={['title']}
              width={430}
              onSelect={(selectedItem) => {
                setCoolDownDrills([selectedItem.title]); // Restrict to one drill
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
              onSelect={(selectedItem: { title: React.SetStateAction<string>; }) => setCoolDownDistance(selectedItem.title)}
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
            <IonButton expand="full" onClick={() => {
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
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default WorkoutBuilder;
