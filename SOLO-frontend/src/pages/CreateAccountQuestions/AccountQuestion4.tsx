import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';
import { useHistory } from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion4Props {
    onNextClick: () => void;
}

const AccountQuestion4: React.FC<AccountQuestion4Props> = ({
}) => {
    const history = useHistory();
    const [role, setRole] = useState('');

    const onBackClick = () => {
        history.push('/account-question-3');
    }

    const onNextClick = () => {
        // Define where to navigate based on the selected role
        const nextPage = role === 'Coach' ? '../CoachAccount/CAQuestion1.tsx' : '../AthleteAccount/AAQuestion1.tsx';
        history.push(nextPage);
    };

    return (
        <IonPage>
            <CreateAccountHeader />
            <IonContent>
                <div className="question-view">
                    <div className="step-info">Step 4 of 4</div>
                    <div className="question">Which role best describes you?</div>
                    <div className="button-container">
                        <button 
                            className={`role-button ${role === 'Coach' ? 'selected' : ''}`}
                            onClick={() => setRole('Coach')}
                        >
                            <div>Coach</div>
                            <div className="role-description">I'd like to train athletes to reach their goals in speed, form, endurance.</div>
                        </button>
                        <button 
                            className={`role-button ${role === 'Athlete' ? 'selected' : ''}`}
                            onClick={() => setRole('Athlete')}
                        >
                            <div>Athlete</div>
                            <div className="role-description">I'd like to have a personal coach to train me to reach my athletic goals.</div>
                        </button>
                    </div>
                </div>
            </IonContent>
            <div className="navigation-buttons">
                <button onClick={onBackClick} className="back-button">BACK</button>
                <button 
                    onClick={onNextClick} 
                    className="next-button"
                    disabled={!role}
                >
                    NEXT
                </button>
            </div>
        </IonPage>
    );
}

export default AccountQuestion4;