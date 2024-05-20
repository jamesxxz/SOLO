import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';
import { useHistory , useLocation} from 'react-router-dom';
import '../../components/AccountQuestion.css';

interface AccountQuestion6Props {
    onNextClick: () => void;
}

interface NestedState {
        
    state: {
        name: string;
        email: string;
        phoneNumber: string;
        password: string;
        profilePhoto: string;
    }
  }
const AccountQuestion6: React.FC<AccountQuestion6Props> = ({}) => {
    const history = useHistory();
    const location = useLocation<NestedState>();   
    const [role, setRole] = useState('');
    const { state } = location;
    const name = state.state.name;
    const email = state.state.email;
    const phoneNumber = state.state.phoneNumber;
    const password = state.state.password;
    const profilePhoto = state.state.profilePhoto;
    console.log( name, email, phoneNumber, password, profilePhoto);

    const onBackClick = () => {
        history.push('/account-question-5');
    }

    const onNextClick = () => {
        if (!role) {
            alert('Please select a role before proceeding.');
            return;
        }

        // Define where to navigate based on the selected role
        const nextPage = role === 'Coach' ? '/coach-account-question-1' : '/athlete-account-question-1';
        history.push(nextPage,{ state: { name: name, email: email, phoneNumber: phoneNumber, password: password, profilePhoto:profilePhoto, role: role  } });
    };

    const handleRoleClick = (selectedRole: string) => {
        setRole(selectedRole);  // Set the role state
        console.log(`Role set to: ${selectedRole}`);  // Log the set role for debugging
    };

    return (
        <IonPage>
            <CreateAccountHeader />
            <IonContent>
                <div className="question-view">
                    <div className="step-info">Step 6 of 6</div>
                    <div className="question">Which role best describes you?</div>
                    <div className="button-container">
                        <button
                            className={`role-button ${role === 'Coach' ? 'selected' : ''}`}
                            onClick={() => handleRoleClick('Coach')}
                        >
                            Coach
                        <div className="role-description">I'd like to train athletes to reach their goals in speed, form, endurance.</div>
                        </button>
                        <button
                            className={`role-button ${role === 'Athlete' ? 'selected' : ''}`}
                            onClick={() => handleRoleClick('Athlete')}
                        >
                            Athlete
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

export default AccountQuestion6;