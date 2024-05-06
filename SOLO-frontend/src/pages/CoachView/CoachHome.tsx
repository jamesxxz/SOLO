/*
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import DynamicImageGrid from './components/DynamicImageGrid';
*/


import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import DynamicImageGrid from '../../components/DynamicImageGrid';
import { athletes } from '../../data/athletes';

/*
interface AthleteInfo {
    name: string;
    image: string;
    location: string;
}
*/

/*
const CoachHome: React.FC = () => {
    const history = useHistory();
    const [data] = useState<AthleteInfo[]>([
        { name: "Lucy", image: "Images/Assets.xcassets/WomenAth1.imageset/WomenAth1.png", location: "Los Angeles, CA" },
        { name: "Michelle", image: "Images/Assets.xcassets/WomenAth1.imageset/WomenAth1.png", location: "Costa Mesa, CA" },
        { name: "Tommy", image: "Images/Assets.xcassets/ManAth1.imageset/ManAth1.png", location: "Newport Beach, CA" },
        { name: "Anthony", image: "Images/Assets.xcassets/ManAth1.imageset/ManAth1.png", location: "Irvine, CA" },
        { name: "Samantha", image: "Images/Assets.xcassets/WomenAth1.imageset/WomenAth1.png", location: "Anaheim, CA" },
        { name: "Tammy", image: "Images/Assets.xcassets/WomenAth1.imageset/WomenAth1.png", location: "Torrance, CA" },
        { name: "Bob", image: "Images/Assets.xcassets/ManAth1.imageset/ManAth1.png", location: "Torrance, CA" },
        { name: "Alexis", image: "Images/Assets.xcassets/WomenAth1.imageset/WomenAth1.png", location: "Torrance, CA" },
        { name: "Patrick", image: "Images/Assets.xcassets/ManAth1.imageset/ManAth1.png", location: "Torrance, CA" }
    ]);

    const onAddAthleteClick = () => {
        history.push('/add-athlete'); // Navigate to the page where you add an athlete
    };

    return (
        <IonPage>
            <header className="gradient-header">
                <div className="logo">MY CURRENT ATHLETES</div>
            </header>
            <IonContent>
                <div className="question-view">
                    {data.map((athlete, index) => (
                        <div key={index} className="athlete-card">
                            <img src={athlete.image} alt={athlete.name} />
                            <div>{athlete.name}</div>
                            <div>{athlete.location}</div>
                        </div>
                    ))}
                </div>
            </IonContent>
            <div className="navigation-buttons">
                <button onClick={() => history.push('/home')} className="back-button">BACK</button>
            </div>
            <div className="add-athlete-button-container">
                <button onClick={onAddAthleteClick} className="add-athlete-button">
                    Add Athlete
                </button>
            </div>
        </IonPage>
    );
};
*/


const CoachHome: React.FC = () => {
  const handleBackButtonClick = () => {
      // Implement logic for back button click
  };

  return (
    <IonPage>
      <IonHeader className="gradient-header">
        <div className="logo">MY CURRENT ATHLETES</div>
      </IonHeader>
      <IonContent fullscreen>
        <DynamicImageGrid athletes={athletes} />
      </IonContent>
    </IonPage>
  );
};

export default CoachHome;
