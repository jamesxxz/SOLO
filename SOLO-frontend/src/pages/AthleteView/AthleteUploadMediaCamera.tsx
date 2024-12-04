import React, { useEffect } from 'react';
import { IonPage, IonHeader, IonContent, IonIcon } from '@ionic/react';
import { home, arrowUpCircleOutline, navigate} from 'ionicons/icons';
import { CameraPreview } from '@capacitor-community/camera-preview';
import { useHistory } from 'react-router-dom';
import '../../components/AthleteView/AthleteCamera.css'

const CameraPage: React.FC = () => {
    const history = useHistory();
    
    const navigateToHomePage = () => {
        history.push('/home');
    };

    const navigateUploadMediaPage = () => {
        history.push('/athlete-upload-media-page');
    };

  useEffect(() => {
    // Start Camera Preview
    CameraPreview.start({
      parent: 'cameraPreview', // The ID of the container
      position: 'rear',
      toBack: true,
    });


    return () => {
      // Stop Camera Preview on page unload
      CameraPreview.stop();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader translucent={true} className="ion-no-border">
        {/* Header area */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            color: 'white',
          }}
        >
          <IonIcon onClick={navigateToHomePage} icon={home} size="large" style={{ cursor: 'pointer' }} />
          <IonIcon onClick={navigateUploadMediaPage} icon={arrowUpCircleOutline} size="large" style={{ cursor: 'pointer' }} />
        </div>
      </IonHeader>

      <IonContent fullscreen style={{ backgroundColor: 'black' }}>
        {/* Camera Preview Container */}
        {/*
        <div
          id="cameraPreview"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1, // Ensure the camera stays behind the UI elements
          }}
        ></div>
        */}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img></img>
        </div>



        {/* Capture button */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          <div
            style={{
              width: '70px',
              height: '70px',
              border: '4px solid white',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              console.log('Capture button clicked!');
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'white',
              }}
            ></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
