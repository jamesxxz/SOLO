import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonDatetime,
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import '../../components/CoachView/ProfileView.css';
import TabBar from './TabBar';
import { ApiService } from '../../../services/api.service';
import { AuthContext } from '../../contexts/AuthContext';
import MediaSection from './MediaSection';
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

interface Workout {
  name: string;
  workoutType: string;
}

interface Task {
  title: string;
  intensity: string;
  time: number;
  status: 'Incomplete' | 'Complete';
}

const CurrentAthleteView: React.FC = () => {
  const history = useHistory();
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
  const [workouts, setWorkouts] = useState<Workout[]>([]);
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

    fetchAthlete();
    fetchMedia();
  }, [athleteId, coachId]);

  useEffect(() => {
    if (selectedWorkoutType) {
      fetchWorkoutsByType(selectedWorkoutType);
    }
  }, [selectedWorkoutType, athleteId]);

  const fetchWorkoutsByType = async (workoutType: string) => {
    try {
      const workouts = await ApiService.getWorkoutsByUserAndType(coachId, workoutType);
      setWorkouts(workouts);
    } catch (error) {
      console.error(`Failed to fetch ${workoutType} workouts:`, error);
    }
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

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      if (image.webPath) {
        const newMedia: MediaItem = {
          media_id: `id_${currentMedia.length + 1}`,
          type: 'image',
          id: `id_${currentMedia.length + 1}`,
          name: 'Photo',
          signedUrl: image.webPath
        };

        setCurrentMedia(prevMedia => [...prevMedia, newMedia]);

        await storeMediaInTable(new File([image.webPath], 'photo.jpg'), 'Photo', athleteId);

        setValidationMessage("");
      } else {
        console.error('No image path available');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
    setShowMediaModal(false);
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
      } else {
        console.error('Media upload failed');
      }
    } catch (error) {
      console.error('Error storing media:', error);
    }
  };

  const downloadMedia = (signedUrl: string) => {
    const link = document.createElement('a');
    link.href = signedUrl;
    link.download = signedUrl.substring(signedUrl.lastIndexOf('/') + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAssignWorkout = async () => {
    if (!selectedWorkoutType || !selectedWorkout || !dueDate) {
      setValidationMessage("Workout type, workout, and due date are required.");
      return;
    }

    // Add workout assignment logic here
    console.log('Assigned workout:', selectedWorkoutType, selectedWorkout, dueDate);

    setTasks([...tasks, {
      title: selectedWorkout!,
      intensity: selectedWorkoutType!,
      time: new Date(dueDate).getTime(), // example for time, it should be actual workout time
      status: 'Incomplete'
    }]);

    setShowTaskModal(false);
    setSelectedWorkoutType(null);
    setSelectedWorkout(null);
    setDueDate("");
    setValidationMessage("");
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

  if (!currentAthlete) {
    return <div>Loading...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/coach-home" />
          </IonButtons>
          <header style={{ backgroundColor: 'white', paddingLeft: '23%' }}>
            <div className="logo">{currentAthlete.name}</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-content">
          <img
            src={currentAthlete.profile_pic_url || defaultImage}
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
          <div style={{ padding: '10px 20px 0', textAlign: 'center' }}>
            <IonCardTitle style={{ fontSize: '24px', fontWeight: 'bold' }}>{currentAthlete.name}</IonCardTitle>
            <IonCardSubtitle style={{ fontSize: '18px' }}>{currentAthlete.email}</IonCardSubtitle>
          </div>
          {/* Add additional athlete details here */}
        </div>
        <MediaSection
          title="Current Media"
          mediaItems={currentMedia}
          onViewMore={() => console.log('View more current media')}
          onDownload={downloadMedia} // Pass the download function
        />
        <div style={{ padding: '10px 20px' }}>
        <h1>Tasks</h1>

          <IonCardTitle style={{ fontSize: '24px', fontWeight: 'bold' }}>Task</IonCardTitle>
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <div className="task-info">
                <p>Title: {task.title}</p>
                <p>Intensity Level: {task.intensity}</p>
                <p>Time: {task.time} mins</p>
              </div>
              <button
                className={`complete-button ${task.status === 'Complete' ? 'complete' : ''}`}
                onClick={() => toggleTaskStatus(index)}
              >
                {task.status}
              </button>
            </div>
          ))}
        </div>
        <IonModal isOpen={showMediaModal} onDidDismiss={() => setShowMediaModal(false)} className="fullscreen-modal">
          <div className="modal-content">
            <h1 className="modal-title">Media Preference</h1>
            <IonButton expand="block" className="my-custom-button" onClick={() => document.getElementById('file-upload')?.click()}>
              Upload Media
            </IonButton>
            <IonButton expand="block" className="my-custom-button" onClick={takePhoto}>
              Take Photo
            </IonButton>
            <IonButton expand="block" className="cancel-button" onClick={() => setShowMediaModal(false)}>
              Cancel
            </IonButton>
          </div>
          <input
            id="file-upload"
            type="file"
            accept="*/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </IonModal>
        <IonModal isOpen={showTaskModal} onDidDismiss={() => setShowTaskModal(false)} className="fullscreen-modal">
          <div className="modal-content">
            <h1 className="modal-title">Assign Workout</h1>
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
              <IonItem>
                <IonLabel>Workout</IonLabel>
                <IonSelect
                  value={selectedWorkout}
                  placeholder="Select workout"
                  onIonChange={(e) => setSelectedWorkout(e.detail.value)}
                >
                  {workouts.map((workout, index) => (
                    <IonSelectOption key={index} value={workout.name}>
                      {workout.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
            {selectedWorkoutType && (
              <IonItem>
                <IonLabel>Due Date</IonLabel>
                <IonDatetime
                  displayFormat="MMM DD, YYYY"
                  min="2023-01-01"
                  max="2030-12-31"
                  value={dueDate}
                  onIonChange={e => setDueDate(e.detail.value!)}
                  presentation="date"
                />
              </IonItem>
            )}
            {validationMessage && <div className="error-message">{validationMessage}</div>}
            <IonButton expand="block" className="my-custom-button" onClick={handleAssignWorkout}>
              Assign workout
            </IonButton>
            <IonButton expand="block" className="cancel-button" onClick={() => setShowTaskModal(false)}>
              Cancel
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
      <IonButton
        className="add-media-button"
        style={{ position: 'fixed', bottom: '135px', right: '16px', zIndex: 1000 }}
        onClick={() => setShowTaskModal(true)}
      >
        + Assign workout
      </IonButton>
      <IonButton
        className="add-media-button"
        style={{ position: 'fixed', bottom: '66px', right: '16px', zIndex: 1000 }}
        onClick={() => setShowMediaModal(true)}
      >
        + Add media
      </IonButton>
      <TabBar />
    </IonPage>
  );
};

export default CurrentAthleteView;
