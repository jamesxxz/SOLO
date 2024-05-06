import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader'; 
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion3Props {
  onNextClick: () => void;
}

const AccountQuestion3: React.FC<AccountQuestion3Props> = () => {
  const history = useHistory();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const onBackClick = () => {
    history.push('/account-question-2');
  };
  const onNextClick = () => {
    history.push('/account-question-4');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFile(fileList[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(fileList[0]);
    }
  };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 3 of 4</div>
          <div className="question">Upload profile photo</div>
          <label htmlFor="file-upload" className="custom-file-upload">
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Profile Preview" className="image-preview" />
            ) : (
              <div className="upload-content">
                <div className="upload-icon">+</div>
                <div className="upload-text">Upload</div>
              </div>
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </IonContent>
      <div className="navigation-buttons">
        <button onClick={onBackClick} className="back-button">BACK</button>
        <button onClick={onNextClick} className="next-button" disabled={!file}>NEXT</button>
      </div>
    </IonPage>
  );
}

export default AccountQuestion3;