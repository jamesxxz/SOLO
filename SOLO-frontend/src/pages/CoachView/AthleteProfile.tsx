import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface AthleteInfo {
    name: string;
    image: string;
    location: string;
}

interface CurrentAthleteViewProps {
    currentAthlete: AthleteInfo;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': any;
        }
    }
}

const CurrentAthleteView: React.FC<CurrentAthleteViewProps> = ({ currentAthlete }) => {
    const history = useHistory();

    const handleBackButtonClick = () => {
        // Implement logic for back button click
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <header className="gradient-header">
                        <div className="logo">SOLO</div>
                        <button onClick={handleBackButtonClick}><ion-icon name="arrow-back"></ion-icon></button>
                        <button><ion-icon name="chart-line"></ion-icon></button>
                    </header>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <img src={currentAthlete.image} alt="Banner" />
                <div className="athlete-info">
                    <h1>{currentAthlete.name}</h1>
                    <p>she/her</p>
                </div>
                <h2>Videos/Images Shared</h2>
                <div className="media-section">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="media-item">
                            <p>Video #{i}</p>
                        </div>
                    ))}
                </div>
            </IonContent>
            <div className="add-media-button">
                <button>
                    <ion-icon name="add"></ion-icon>
                    <span>Add Media</span>
                </button>
            </div>
        </IonPage>
    );
};

export default CurrentAthleteView;
