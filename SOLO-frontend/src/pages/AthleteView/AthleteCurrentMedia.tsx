import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonButton, IonModal } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import DynamicHeader from '../../components/AthleteView/DynamicHeader';  // Import the header component
import MediaSection from '../../components/AthleteView/MediaSection';

const AthleteCurrentMedia: React.FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [currentMedia, setCurrentMedia] = useState([
    { id: '1', name: 'xxx.png', imageUrl: 'path_to_image_xxx.png' },
    { id: '2', name: 'yyy.png', imageUrl: 'path_to_image_yyy.png' }
  ]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      const imageUrl = URL.createObjectURL(file);
      setCurrentMedia(prevMedia => [
        ...prevMedia,
        { id: `id_${prevMedia.length + 1}`, name: file.name, imageUrl: imageUrl }
      ]);
      setShowModal(false);
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

      console.log(image);

      if (image.webPath) {
        // handle image display or storage
      } else {
        console.error('No image path available');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
    setShowModal(false);
  };

  return (
    <IonPage>
      <DynamicHeader title="Your Media" />
      <IonContent>
        <MediaSection title="" mediaItems={currentMedia} onViewMore={() => console.log('View more current media')} />
        <IonButton className="add-media-button" onClick={() => setShowModal(true)}>+ Add Media</IonButton>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <div className="white-modal" style={{ padding: '20px' }}> 
            <h1 className="modal-title">Media Preference</h1>
              <IonButton expand="block" className="my-custom-button" onClick={() => document.getElementById('file-upload')?.click()}>
                Upload Media
              </IonButton>
              <IonButton expand="block" className="cancel-button" onClick={() => setShowModal(false)}>
                Cancel
              </IonButton>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*,video/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AthleteCurrentMedia;