import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonBackButton, IonCardTitle, IonCardSubtitle, IonButton, IonModal } from '@ionic/react';
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

const CurrentAthleteView: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const athleteId = searchParams.get('athleteId');
  const coachId = searchParams.get('coachId');

  const [currentAthlete, setCurrentAthlete] = useState<AthleteInfo | null>(null);
  const [currentMedia, setCurrentMedia] = useState<MediaItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>("");

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
      <IonButton
        className="add-media-button"
        style={{ position: 'fixed', bottom: '66px', right: '16px', zIndex: 1000 }}
        onClick={() => setShowModal(true)}
      >
        + Add Media
      </IonButton>
      <TabBar />
    </IonPage>
  );
};

export default CurrentAthleteView;
