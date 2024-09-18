import React, { useState, useEffect, useContext } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import TabBar2 from './TabBar2';
import { AuthContext } from '../../contexts/AuthContext';
import { ApiService } from '../../../services/api.service';

interface MediaItem {
  media_id: string;
  id: string;
  name: string;
  signedUrl: string;
}

interface Task {
  workout_title: string;
  coach_name: string
  intensity: string;
  time: number;
  due_date: string;
  status: 'Incomplete' | 'Complete';
}

const AthleteViewMedia: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  const [currentMedia, setCurrentMedia] = useState<MediaItem[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (userId) {
      fetchCurrentMedia();
      fetchTasks(); // Fetch tasks instead of past media
    }
  }, [userId, refresh, location]);

  const fetchCurrentMedia = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    try {
      const response = await ApiService.getMediaByAthleteId({ athleteId: userId, type: 'current' });
      console.log('Media fetched:', response);
      setCurrentMedia(response.slice(0, 2)); // Slice to get only the two most recent
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await ApiService.getTasksByAthlete(userId); // Fetch tasks for the athlete
      console.log('Tasks fetched:', response);
      setTasks(response); // Set the tasks in state
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (media_id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/media/media/${media_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCurrentMedia(currentMedia.filter(media => media.media_id !== media_id));
        setRefresh(!refresh); // Trigger refresh
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
            <IonBackButton defaultHref="/athlete-view-account" />
          </IonButtons>
          <header style={{ backgroundColor: 'white', marginLeft: '18%' }}>
            <div className="logo">MY MEDIA & TASKS</div>
          </header>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="media-section">
          <h2 className="section-title">Current Media</h2>
          <IonList>
            {currentMedia.map((media) => (
              <IonItem className="media-item" key={media.id}>
                <img src={media.signedUrl} alt={media.name} className="media-image" />
                <IonLabel style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '10px' }}>{media.name}</IonLabel>
                <button style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', marginLeft: '5px' }} onClick={() => handleDelete(media.media_id)}>🗑️</button>
              </IonItem>
            ))}
          </IonList>
          <div className="view-more-container">
            <IonButton routerLink="/athlete-current-media" fill="clear" color="primary">View More</IonButton>
          </div>
        </div>

        <div className="task-section">
          <h2 className="section-title" style={{ marginLeft: '16px' }}>Assigned Tasks</h2>
          <IonList>
            {tasks.map((task, index) => (
              <IonCard key={index} style={{ marginBottom: '16px' }}> {/* Add spacing between tasks */}
                <IonCardContent style={{ paddingBottom: '16px' }}> {/* Padding within the task card */}
                  <h2 style={{ color: 'black', marginBottom: '8px' }}><strong>{task.workout_title || 'No Title Available'}</strong></h2>
                  <p style={{ marginBottom: '4px' }}>Assigned By: {task.coach_name || 'No Coach Provided'}</p>
                  <p style={{ marginBottom: '4px' }}>Intensity: {task.intensity || 'No Intensity Provided'}</p>
                  <p style={{ marginBottom: '4px' }}>Time: {task.time ? `${task.time} mins` : 'No Time Specified'}</p>
                  <p style={{ marginBottom: '8px' }}>Due Date: {task.due_date || 'No Due Date'}</p>
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
      </IonContent>

      <TabBar2 />
    </IonPage>
  );
};

export default AthleteViewMedia;
