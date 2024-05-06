import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../components/CoachView/ProfileView.css';
import { IonButton } from '@ionic/react';

const ProfileView: React.FC = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phone, setPhone] = useState('');

    const onBackClick = () => {
        history.push('/home'); // Navigation function
    };

    const onSaveClick = () => {
        // Validation logic can be added here
        // For example, checking if username, emailAddress, and phone are not empty
        if (username && emailAddress && phone) {
            // Save profile logic goes here
            alert('Profile saved successfully!');
        } else {
            // Show an error message or handle validation error
            alert('Please fill in all fields.');
        }
    };

    return (
    

        <div className="profile-container">
                <div className="logo">PROFILE</div>
                <button onClick={onBackClick} className="close-button">X</button> {/* Close button */}
            <div className="profile-content">
                <img src="../../../Images/Assets.xcassets/Baby Diaper Promotion Banner Background, Simple, Childlike Background, Maternal And Child Supplies Background Image And Wallpaper for Free Download.jpeg" alt="Banner" className="banner-image" />
            <button className="camera-btn">
                    <i className="ri-camera-rotate-line"></i>
                </button>
                <div className="input-group">
                    <h3>Name</h3>
                    <input
                        type="text"
                        placeholder="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="answer-input"
                    />
                </div>
                <div className="input-group">
                    <h3>Email Address</h3>
                    <input
                        type="email"
                        placeholder="User Email Address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="answer-input"
                    />
                </div>
                <div className="input-group">
                    <h3>Phone Number</h3>
                    <input
                        type="tel"
                        placeholder="User Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="answer-input"
                    />
                </div>
                <IonButton  onClick={onSaveClick} className="edit-profile-btn">Confirm Changes</IonButton>
            </div>
        </div>
    );
}

export default ProfileView;