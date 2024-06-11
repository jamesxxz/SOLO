import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonBackButton, IonCardTitle, IonCardSubtitle, IonIcon } from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';
import '../../components/CoachView/ProfileView.css';
import TabBar2 from './TabBar2';
import { ApiService } from '../../../services/api.service';
import { AuthContext } from '../../contexts/AuthContext';
import defaultImage from '../../../public/Flying Mario.jpeg'; // Adjust the path if necessary

const ProfileView: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { userId } = authContext;

  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) {
          console.log('userId is not available'); // Debug log
          return;
        }

        const profileData = await ApiService.getAthleteById(userId); // Pass the userId directly as a string
        console.log('Fetched athlete data:', profileData); // Debug log
        setUsername(profileData.name);
        setEmailAddress(profileData.email);
        setPhone(profileData.phone_number);
        setProfilePic(profileData.profile_pic_url || defaultImage); // Assuming profile_pic_url contains the full URL
      } catch (error) {
        console.error('Error fetching athlete data:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const onBackClick = () => {
    history.push('/athlete-view-account');
  };

  const onEditClick = () => {
    setIsEditing(!isEditing);
  };

  const onSaveClick = async () => {
    if (username && emailAddress && phone) {
      try {
        if (userId) {
          const updatedData = {
            name: username,
            email: emailAddress,
            phone_number: phone
          };
          await ApiService.updateAthleteProfile(parseInt(userId), updatedData);
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
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/athlete-view-account" />
          </IonButtons>
          <header style={{ backgroundColor: 'white', paddingLeft: '23%' }}>
            <div className="logo">PROFILE</div>
          </header>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-content">
          <img
            src={profilePic || "/default-profile-pic.png"} // Show a default image if profilePic is not available
            alt="Banner"
            className="banner-image"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '0 0 10px 10px',
              marginBottom: '0' // Adjust this value to reduce the space
            }}
          />
          <div style={{ padding: '10px 20px 0', textAlign: 'center' }}> {/* Adjust padding top to reduce space */}
            <IonCardTitle style={{ fontSize: '24px', fontWeight: 'bold' }}>{username}</IonCardTitle>
            <IonCardSubtitle style={{ fontSize: '18px' }}>{emailAddress}</IonCardSubtitle>
          </div>
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
      <TabBar2 />
    </IonPage>
  );
};

export default ProfileView;
