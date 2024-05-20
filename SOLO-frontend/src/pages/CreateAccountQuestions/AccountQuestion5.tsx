import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useAccount } from '../../contexts/AccountContext';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';
import '../../components/AccountQuestion.css';
import { useHistory, useLocation } from 'react-router-dom';

interface AccountQuestion5Props {
  onNextClick: () => void;
  onBackClick: () => void;
}

interface NestedState {
    state: {
        name: string;
        email: string;
        phoneNumber: string;
        password: string;
    }
  }
  

const AccountQuestion5: React.FC<AccountQuestion5Props> = ({}) => {
  const history = useHistory();
  const location = useLocation<NestedState>();
  const { state } = location;
  const name = state.state.name;
  const email = state.state.email;
  const phoneNumber = state.state.phoneNumber;
  const password = state.state.password;
  console.log(name, email, phoneNumber, password);
  const { profilePhoto, setProfilePhoto } = useAccount();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [isValidImage, setIsValidImage] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>("");

  const onBackClick = () => {
      history.push('/account-question-4');
  };

  const onNextClick = () => {
      if (isValidImage) {
          console.log('Profile photo before setting account:', profilePhoto); // Log current profile photo
          history.push('/account-question-6',{ state: { name: name, email: email, phoneNumber: phoneNumber, password: password, profilePhoto:profilePhoto  } }); // Change this based on the route of the next page
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
    } else {
      setImagePreviewUrl("");  // Ensure the image preview is cleared if no photo is present
    }
  }, [profilePhoto]);  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      console.log('File selected:', file.name); 
  
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validImageTypes.includes(file.type)) {
        console.log('Valid image file selected:', file.type); 
        setProfilePhoto(file);  
        setIsValidImage(true);  
        setValidationMessage("");  
  
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log('FileReader load end, result length:', reader.result ? reader.result.toString().length : 'No result');
          setImagePreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Invalid file type:', file.type); // Log that an invalid file type was selected
        setIsValidImage(false);
        setValidationMessage("Invalid file type. Please select a valid image file.");
      }
    } else {
      console.log('No file selected');
    }
  };  

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 5 of 6</div>
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

export default AccountQuestion5;
