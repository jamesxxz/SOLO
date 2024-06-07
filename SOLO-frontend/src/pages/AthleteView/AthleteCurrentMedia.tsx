import React, { useState, useEffect, useContext } from 'react';
import { IonPage, IonHeader, IonContent, IonButton, IonModal, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import MediaSection from '../../components/AthleteView/MediaSection';
import TabBar2 from './TabBar2';
import { ApiService } from '../../../services/api.service';
import { AuthContext } from '../../contexts/AuthContext';

interface MediaItem {
  media_id: string;
  type: string;
  id: string;
  name: string;
  signedUrl: string;
}

const AthleteCurrentMedia: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  const [showModal, setShowModal] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MediaItem[]>([]);
  const [validationMessage, setValidationMessage] = useState<string>("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      const fileName = file.name;

      const imageUrl = URL.createObjectURL(file);
      const newMedia = { id: `id_${currentMedia.length + 1}`, name: fileName, signedUrl: imageUrl };

      setCurrentMedia(prevMedia => [...prevMedia, newMedia]);

      await storeMediaInTable(file, fileName, userId);

      setShowModal(false);
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
        const newMedia = { id: `id_${currentMedia.length + 1}`, name: 'Photo', signedUrl: image.webPath };

        setCurrentMedia(prevMedia => [...prevMedia, newMedia]);

        await storeMediaInTable(new File([image.webPath], 'photo.jpg'), 'Photo', userId);

        setValidationMessage("");
      } else {
        console.error('No image path available');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
    setShowModal(false);
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

  const fetchMedia = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    try {
      const response = await ApiService.getMediaByAthleteId({ athleteId: userId, type: 'current' });
      console.log('Media fetched:', response);
      setCurrentMedia(response);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [userId]);

  useEffect(() => {
    console.log('Current Media:', currentMedia);
  }, [currentMedia]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/athlete-view-media" />
          </IonButtons>
          <header style={{ backgroundColor: 'white' }}>
            <div className="logo">MY CURRENT MEDIA</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MediaSection title="Current Media" mediaItems={currentMedia} onViewMore={() => console.log('View more current media')} onDelete={deleteMedia} />
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <div className="white-modal" style={{ padding: '20px' }}>
            <h1 className="modal-title">Media Preference</h1>
            <IonButton expand="block" className="my-custom-button" onClick={() => document.getElementById('file-upload')?.click()}>
              Upload Media
            </IonButton>
            <IonButton expand="block" className="my-custom-button" onClick={takePhoto}>
              Take Photo
            </IonButton>
            <IonButton expand="block" className="cancel-button" onClick={() => setShowModal(false)}>
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
        {validationMessage && <div className="error-message">{validationMessage}</div>}
      </IonContent>
      <IonButton className="add-media-button" style={{ position: 'fixed', bottom: '56px', right: '16px', zIndex: 1000 }} onClick={() => setShowModal(true)}>+ Add Media</IonButton>
      <TabBar2 />
    </IonPage>
  );
};

export default AthleteCurrentMedia;
