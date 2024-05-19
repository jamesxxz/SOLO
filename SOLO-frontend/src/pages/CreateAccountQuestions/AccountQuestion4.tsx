import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useAccount } from '../../contexts/AccountContext';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';
import '../../components/AccountQuestion.css';
import { useHistory } from 'react-router-dom';

interface AccountQuestion4Props {
  onNextClick: () => void;
  onBackClick: () => void;
}

const AccountQuestion4: React.FC<AccountQuestion4Props> = ({}) => {
  const history = useHistory();
  const { profilePhoto, setProfilePhoto } = useAccount();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [isValidImage, setIsValidImage] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>("");

  const onBackClick = () => {
      history.push('/account-question-3');
  };

  const onNextClick = () => {
      if (isValidImage) {
          console.log('Profile photo before setting account:', profilePhoto); // Log current profile photo
          history.push('/account-question-5'); // Change this based on the route of the next page
      } else {
          alert('Please ensure your image is the correct type.');
      }
  };

  useEffect(() => {
    if (profilePhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(profilePhoto);
    }
  }, [profilePhoto]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

      console.log('Selected file type:', file.type); // Log selected file type
      if (validImageTypes.includes(file.type)) {
        console.log('Valid image file selected.'); // Log valid image selection
        setProfilePhoto(file);
        console.log('Profile photo set in context:', file); // Log profile photo set in context
        setIsValidImage(true);
        setValidationMessage("");
      } else {
        console.error('Invalid file type. Please select a valid image file.');
        alert('Invalid file type. Please select a valid image file.');
        setIsValidImage(false);
        setValidationMessage("Invalid file type. Please select a valid image file.");
      }
    }
  };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 4 of 5</div>
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
          {validationMessage && <div className="error-message">{validationMessage}</div>}
        </div>
      </IonContent>
      <div className="navigation-buttons">
        <button onClick={onBackClick} className="back-button">BACK</button>
        <button
          onClick={onNextClick}
          className="next-button"
          disabled={!isValidImage}
        >
          NEXT
        </button>
      </div>
    </IonPage>
  );
};

export default AccountQuestion4;
