import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBackOutline, pencilOutline } from 'ionicons/icons';
import '../../components/CoachView/ProfileView.css';

const ProfileView: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('Adam');
  const [emailAddress, setEmailAddress] = useState('adam@gmail.com');
  const [phone, setPhone] = useState('(123) 456 7891');
  const [isEditing, setIsEditing] = useState(false);

  const onBackClick = () => {
    history.push('/coach-home');
  };

  const onEditClick = () => {
    setIsEditing(!isEditing);
  };

  const onSaveClick = () => {
    if (username && emailAddress && phone) {
      alert('Profile saved successfully!');
      setIsEditing(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <IonIcon icon={arrowBackOutline} onClick={onBackClick} className="back-button" />
        <div className="profile-logo">PROFILE</div>
      </div>
      <div className="profile-content">
        <img src="../../../Images/Assets.xcassets/Baby Diaper Promotion Banner Background, Simple, Childlike Background, Maternal And Child Supplies Background Image And Wallpaper for Free Download.jpeg" alt="Banner" className="banner-image" />
        <div className="profile-input-group">
          <h3>Name</h3>
          <input
            type="text"
            placeholder="User Name"
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
            placeholder="User Email Address"
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
            placeholder="User Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="answer-input"
            disabled={!isEditing}
          />
        </div>
        <button onClick={isEditing ? onSaveClick : onEditClick} className="edit-profile">
          <IonIcon icon={pencilOutline} slot="start" />
          {isEditing ? 'Save Edits' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
