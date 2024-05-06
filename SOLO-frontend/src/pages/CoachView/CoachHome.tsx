import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface AthleteInfo {
    name: string;
    image: string;
    location: string;
}

const CoachHome: React.FC = () => {
    const history = useHistory();
    const [data] = useState<AthleteInfo[]>([
        { name: "Lucy", image: "WomenAth1", location: "Los Angeles, CA" },
        { name: "Michelle", image: "WomenAth2", location: "Costa Mesa, CA" },
        { name: "Tommy", image: "ManAth1", location: "Newport Beach, CA" },
        { name: "Anthony", image: "ManAth1", location: "Irvine, CA" },
        { name: "Samantha", image: "WomenAth1", location: "Anaheim, CA" },
        { name: "Tammy", image: "WomenAth2", location: "Torrance, CA" },
        { name: "Bob", image: "ManAth1", location: "Torrance, CA" },
        { name: "Alexis", image: "WomenAth2", location: "Torrance, CA" },
        { name: "Patrick", image: "ManAth1", location: "Torrance, CA" }
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

export default CoachHome;
