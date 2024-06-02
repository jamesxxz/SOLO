import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonIcon, IonContent } from '@ionic/react';
import { arrowBackOutline, pencilOutline } from 'ionicons/icons';
import '../../components/CoachView/ProfileView.css';
import TabBar from './TabBar';
import { ApiService } from '../../../services/api.service';

interface CoachProfileParams {
  id?: string;
}

const CoachProfileView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<CoachProfileParams>();
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (id) {
          const query = { id: parseInt(id) };
          const profileData = await ApiService.getCoachProfile(query);
          console.log('Profile data fetched:', profileData);
          setUsername(profileData.name);
          setEmailAddress(profileData.email);
          setPhone(profileData.phone_number);
          setProfilePic(profileData.profile_pic);
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfile();
  }, [id]);

  const onBackClick = () => {
    history.push('/coach-home');
  };

  const onEditClick = () => {
    setIsEditing(!isEditing);
  };

  const onSaveClick = async () => {
    if (username && emailAddress && phone) {
      try {
        if (id) {
          const updatedData = {
            name: username,
            email: emailAddress,
            phone_number: phone
          };
          await ApiService.updateCoachProfile(parseInt(id), updatedData);
          alert('Profile saved successfully!');
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Failed to update profile:', error);
        alert('Failed to update profile.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="gradient-header">
          <div className="profile-header">
            <IonIcon icon={arrowBackOutline} onClick={onBackClick} className="back-button" />
            <div className="profile-logo">PROFILE</div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-content">
          <img
            src={profilePic || "/default-profile-pic.png"} // Show a default image if profilePic is not available
            alt="Banner"
            className="banner-image"
          />
          <div className="profile-input-group">
            <h3>Name</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="answer-input"
              disabled={!isEditing}
            />
          </div>
          <div className="profile-input-group">
            <h3>Email Address</h3>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="answer-input"
              disabled={!isEditing}
            />
          </div>
          <div className="profile-input-group">
            <h3>Phone Number</h3>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="answer-input"
              disabled={!isEditing}
            />
          </div>
          <div className="edit-profile-container">
            <button onClick={isEditing ? onSaveClick : onEditClick} className="edit-profile">
              <IonIcon icon={pencilOutline} slot="start" />
              {isEditing ? 'Save Edits' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default CoachProfileView;


