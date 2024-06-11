import React, { useState, useEffect, useContext } from 'react';
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
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

const AthletePastMedia: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  const [pastMedia, setPastMedia] = useState<MediaItem[]>([]);

  const fetchPastMedia = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    try {
      const response = await ApiService.getMediaByAthleteId({ athleteId: userId, type: 'past' });
      console.log('Media fetched:', response);
      setPastMedia(response);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  useEffect(() => {
    fetchPastMedia();
  }, [userId]);

  useEffect(() => {
    console.log('Past Media:', pastMedia);
  }, [pastMedia]);

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
        setPastMedia(prevMedia => prevMedia.filter(media => media.id !== mediaId));
      } else {
        console.error('Failed to delete media');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/athlete-view-media" />
          </IonButtons>
          <header style={{ backgroundColor: 'white', paddingLeft:'9%' }}>
            <div className="logo">MY PAST MEDIA</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MediaSection
          title="Past Media"
          mediaItems={pastMedia}
          onViewMore={() => console.log('View more past media')}
          onDelete={deleteMedia} // Pass deleteMedia to MediaSection
        />
      </IonContent>
      <TabBar2 />
    </IonPage>
  );
};

export default AthletePastMedia;
