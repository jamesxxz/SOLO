import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonProgressBar, IonList, IonLabel, IonItem, IonThumbnail} from '@ionic/react';
import { arrowBackOutline, trashBin, trashBinOutline, trashOutline } from "ionicons/icons";
import { AuthContext } from '../../contexts/AuthContext';
import { ApiService } from '../../../services/api.service';
import NewTabBar from './NewTabBar';
import '../../components/AthleteView/AthleteView.css';


const AthleteUploadMediaPage: React.FC = () => {
  const history = useHistory();

  const navigateToCameraPage = () =>{
    history.push('/athlete-upload-media-camera');
  }

  const navigateToHomePage = () =>{
    history.push('/home')
  }

  const [files, setFiles] = useState<{ name: string; image: string; uploading: boolean }[]>([
    { name: 'xxx.png', image:'/sampleuploadedpage.png', uploading: false },
    { name: 'yyy.png', image:'/sampleuploadedpage.png', uploading: false },
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const handleAddMedia = () => {
    setFiles([...files, { name: `new-file-${files.length}.png`,image:'', uploading: true }]);
    setIsUploading(true);

    setTimeout(() => {
      setFiles((prevFiles) =>
        prevFiles.map((file, index) =>
          index === prevFiles.length - 1 ? { ...file, uploading: false } : file
        )
      );
      setIsUploading(false);
    }, 3000); // Simulate upload time
  };

  const handleDeleteMedia = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <header className="new-gradient-header">
          <div className="logo">Upload Media</div>
          </header>
          <div className="menu-icon-container">
              <IonIcon icon={arrowBackOutline} className="arrow-left-icon"/>
            </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Title */}
      <div className="">
      <div className="upload-sub-title">Videos/Images Shared</div>
      </div>
      <div>
      <IonList className='Ion-list'>
          {files.map((file, index) => (
            <IonItem key={index} className="custom-media-list-item" lines="none">
              <IonThumbnail slot="start">
                <img src={file.image} alt={file.name} />
              </IonThumbnail>
              <IonLabel>{file.name}</IonLabel>
              {file.uploading && (
                <IonProgressBar type="indeterminate" slot="end"></IonProgressBar>
              )}
              <IonIcon
                icon={trashOutline}
                slot="end"
                onClick={() => handleDeleteMedia(index)}
                style={{fontSize: '14px', width: '14px', height: '14px', cursor: 'pointer', color:'#707070'}}
              />
            </IonItem>
          ))}
        </IonList>
      </div>

        {/* Uploading Section */}
      <div className="uploading">
        <div>Uploading</div>
        <IonProgressBar value={0.3}></IonProgressBar>
      </div>

      {/* Button for Add Media */}
      <div>
      {/* onClick={handleAddMedia} holds the code for handling uploading*/}
        <IonButton onClick={navigateToCameraPage} className="action-button-1">Add Media</IonButton>
        <IonButton onClick={navigateToHomePage} className="action-button-2">Finish Uploading</IonButton>
      </div>

      </IonContent>
      <NewTabBar />
    </IonPage>
  );
};

export default AthleteUploadMediaPage;
