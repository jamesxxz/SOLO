import React, { useState, useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonInput, IonButton, IonTextarea, IonSelect, IonSelectOption } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { ApiService } from '../../services/api.service';
import { AuthContext } from '../contexts/AuthContext';

const UploadMedia: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { userId } = authContext!;
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'current' | 'past'>('current');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !description || !userId) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('athlete_id', userId);

    try {
      const response = await ApiService.uploadMedia(formData);
      console.log('Media uploaded:', response);
      history.push('/athlete-view-media');
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Error uploading media. Please try again.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload Media</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <IonInput
            placeholder="Title"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
          <IonSelect value={type} placeholder="Select Type" onIonChange={(e) => setType(e.detail.value!)}>
            <IonSelectOption value="current">Current</IonSelectOption>
            <IonSelectOption value="past">Past</IonSelectOption>
          </IonSelect>
          <IonTextarea
            placeholder="Description"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
          <input type="file" onChange={handleFileChange} />
          <IonButton onClick={handleUpload}>Upload</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UploadMedia;
