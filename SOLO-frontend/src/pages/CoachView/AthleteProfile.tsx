import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonBackButton, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonModal, IonCard, IonCardContent, IonList, IonSelect, IonSelectOption, IonDatetime, IonToast,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import MediaSection from './MediaSection';
import TabBar from './TabBar';
import { ApiService } from '../../../services/api.service';
import defaultImage from '../../../public/Flying Mario.jpeg'; // Adjust the path if necessary

interface AthleteInfo {
  name: string;
  profile_pic_url: string;
  email: string;
  affiliation_name: string;
  phone_number: string;
}

interface MediaItem {
  media_id: string;
  type: string;
  id: string;
  name: string;
  signedUrl: string;
}

interface Task {
  title: string;
  intensity: string;
  time: number;
  due_date: string;
  status: 'Incomplete' | 'Complete';
}

const CurrentAthleteView: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const athleteId = searchParams.get('athleteId');
  const coachId = searchParams.get('coachId');

  const [currentAthlete, setCurrentAthlete] = useState<AthleteInfo | null>(null);
  const [currentMedia, setCurrentMedia] = useState<MediaItem[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Task[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    const fetchAthlete = async () => {
      if (athleteId) {
        try {
          const athleteData = await ApiService.getAthleteById(athleteId);
          setCurrentAthlete(athleteData);
        } catch (error) {
          console.error('Error fetching athlete data:', error);
        }
      }
    };

    const fetchMedia = async () => {
      if (athleteId && coachId) {
        try {
          const response = await ApiService.getMediaByAthleteIdAndCoachId(athleteId, coachId, 'current');
          setCurrentMedia(response);
        } catch (error) {
          console.error('Error fetching media:', error);
        }
      }
    };

    const fetchTasks = async () => {
      if (coachId && athleteId) {
        try {
          const response = await ApiService.getTasksByCoachAndAthlete(coachId, athleteId);
          setTasks(response);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
    };

    fetchAthlete();
    fetchMedia();
    fetchTasks();
  }, [athleteId, coachId]);

  const handleAssignWorkout = async () => {
    if (!selectedWorkoutType || !selectedWorkout || !dueDate) {
      setValidationMessage("Workout type, workout, and due date are required.");
      return;
    }

    const selectedWorkoutData = workouts.find(workout => workout.title === selectedWorkout);

    if (!selectedWorkoutData) {
      setValidationMessage("Selected workout not found.");
      return;
    }

    const taskData: Task = {
      title: selectedWorkoutData.title,
      intensity: selectedWorkoutData.intensity,
      time: selectedWorkoutData.time,
      status: 'Incomplete',
      due_date: new Date(dueDate).toISOString()
    };

    try {
      const response = await ApiService.assignTask({
        coach_id: coachId!,
        athlete_id: athleteId!,
        title: taskData.title,
        intensity: taskData.intensity,
        due_date: taskData.due_date,
        status: taskData.status,
        time: taskData.time,
        type_id: selectedWorkoutData.workoutType_id
      });

      if (response && response.message === 'Task assigned successfully!') {
        console.log('Task assigned:', response.id);
        window.location.reload(); // This will refresh the entire page
      } else {
        console.error('Failed to assign task:', response);
      }
    } catch (error) {
      console.error('Error assigning task:', error);
    }

    setShowTaskModal(false);
    setSelectedWorkoutType(null);
    setSelectedWorkout(null);
    setDueDate("");
    setValidationMessage("");
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      const fileName = file.name;

      const imageUrl = URL.createObjectURL(file);
      const newMedia: MediaItem = {
        media_id: `id_${currentMedia.length + 1}`,
        type: 'image',
        id: `id_${currentMedia.length + 1}`,
        name: fileName,
        signedUrl: imageUrl
      };

      setCurrentMedia(prevMedia => [...prevMedia, newMedia]);

      await storeMediaInTable(file, fileName, athleteId);

      setShowMediaModal(false);
      setValidationMessage("");
    }
  };

  const storeMediaInTable = async (file: File, title: string, athleteId: string | null) => {
    if (!athleteId) {
      console.error('Athlete ID is not available');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('athlete_id', athleteId);

    try {
      const response = await fetch('http://localhost:3000/media/media-upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Media stored successfully:', jsonResponse);
        fetchMedia(); 
      } else {
        console.error('Media upload failed');
      }
    } catch (error) {
      console.error('Error storing media:', error);
    }
  };

  const deleteMedia = async (mediaId: string) => {
    if (!mediaId) {
      console.error('Media ID is not available');
      return;
    }

    console.log('Deleting media with ID:', mediaId); 

    try {
      const response = await fetch(`http://localhost:3000/media/media/${mediaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Media deleted successfully');
        setCurrentMedia(prevMedia => prevMedia.filter(media => media.id !== mediaId));
      } else {
        console.error('Failed to delete media');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const toggleTaskStatus = (index: number) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, status: task.status === 'Incomplete' ? 'Complete' : 'Incomplete' };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/coach-home" />
          </IonButtons>
          <header style={{ backgroundColor: 'white', paddingLeft: '23%' }}>
            <div className="logo">{currentAthlete?.name}</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="profile-content">
          <img
            src={currentAthlete?.profile_pic_url || defaultImage}
            alt="Banner"
            className="banner-image"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '0 0 10px 10px',
              marginBottom: '0'
            }}
          />
        </div>

        <IonAccordionGroup value={['media', 'tasks']} multiple={true}>
          <IonAccordion value="media">
            <IonItem slot="header" color="light">
              <IonLabel>Current Media</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <MediaSection
                title="Current Media"
                mediaItems={currentMedia}
                onViewMore={() => console.log('View more current media')}
                onDelete={deleteMedia}
              />
            </div>
          </IonAccordion>

          <IonAccordion value="tasks">
            <IonItem slot="header" color="light">
              <IonLabel>Tasks</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <IonList>
                {tasks.map((task, index) => (
                  <IonCard key={index}>
                    <IonCardContent>
                      <h3>{task.title}</h3>
                      <p>Intensity: {task.intensity}</p>
                      <p>Time: {task.time} mins</p>
                      <p>Due Date: {task.due_date}</p>
                      <IonButton
                        color={task.status === 'Complete' ? 'success' : 'primary'}
                        onClick={() => toggleTaskStatus(index)}
                      >
                        {task.status === 'Complete' ? 'Mark Incomplete' : 'Mark Complete'}
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonList>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        {/* Assign Workout Modal */}
        <IonModal isOpen={showTaskModal} onDidDismiss={() => setShowTaskModal(false)}>
          <div className="modal-content">
            <h1>Assign Workout</h1>
            <IonItem>
              <IonLabel>Workout Type</IonLabel>
              <IonSelect
                value={selectedWorkoutType}
                placeholder="Select workout type"
                onIonChange={(e) => setSelectedWorkoutType(e.detail.value)}
              >
                <IonSelectOption value="standard">Standard</IonSelectOption>
                <IonSelectOption value="dynamic">Dynamic</IonSelectOption>
                <IonSelectOption value="competition">Competition</IonSelectOption>
              </IonSelect>
            </IonItem>
            {selectedWorkoutType && (
              <>
                <IonItem>
                  <IonLabel>Workout</IonLabel>
                  <IonSelect
                    value={selectedWorkout}
                    placeholder="Select workout"
                    onIonChange={(e) => setSelectedWorkout(e.detail.value)}
                  >
                    {workouts.map((workout, index) => (
                      <IonSelectOption key={index} value={workout.title}>
                        {workout.title}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Due Date</IonLabel>
                  <IonDatetime
                    displayFormat="MMM DD, YYYY"
                    min="2023-01-01"
                    max="2030-12-31"
                    value={dueDate}
                    onIonChange={e => setDueDate(e.detail.value!)}
                  />
                </IonItem>
              </>
            )}
            {validationMessage && <div className="error-message">{validationMessage}</div>}
            <IonButton expand="block" onClick={handleAssignWorkout}>Assign Workout</IonButton>
            <IonButton expand="block" fill="clear" onClick={() => setShowTaskModal(false)}>Cancel</IonButton>
          </div>
        </IonModal>

        {/* Add Media Modal */}
        <IonModal isOpen={showMediaModal} onDidDismiss={() => setShowMediaModal(false)}>
          <div className="modal-content">
            <h1>Add Media</h1>
            <IonButton expand="block" onClick={() => document.getElementById('file-upload')?.click()}>Upload Media</IonButton>
            <IonButton expand="block" fill="clear" onClick={() => setShowMediaModal(false)}>Cancel</IonButton>
          </div>
          <input
            id="file-upload"
            type="file"
            accept="*/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </IonModal>
      </IonContent>

      {/* Buttons for Assigning Workout and Adding Media */}
      <IonButton
        className="add-media-button"
        style={{ position: 'fixed', bottom: '135px', right: '16px', zIndex: 1000 }}
        onClick={() => setShowTaskModal(true)}
      >
        + Assign Workout
      </IonButton>

      <IonButton
        className="add-media-button"
        style={{ position: 'fixed', bottom: '66px', right: '16px', zIndex: 1000 }}
        onClick={() => setShowMediaModal(true)}
      >
        + Add Media
      </IonButton>

      <TabBar />
    </IonPage>
  );
};

export default CurrentAthleteView;
