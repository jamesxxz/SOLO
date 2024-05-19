import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useAccount } from '../../contexts/AccountContext';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';
import '../../components/AccountQuestion.css';
import { useHistory } from 'react-router-dom';

interface AccountQuestion5Props {
  onNextClick: () => void;
  onBackClick: () => void;
}

const AccountQuestion5: React.FC<AccountQuestion5Props> = ({}) => {
  const { role, setRole } = useAccount();
  const history = useHistory();

  const onBackClick = () => {
    history.push('/account-question-4');
  };

  const onNextClick = () => {
    console.log('Current role before setting account:', role); // Log current role
    if (role === 'Coach') {
      history.push('/coach-account-question-1');
    } else if (role === 'Athlete') {
      history.push('/athlete-account-question-1');
    } else {
      alert('Please select a role.');
    }
  };

  const handleRoleClick = (selectedRole: string) => {
    setRole(selectedRole);
    console.log('Role set in context:', selectedRole); // Log role set in context
  };

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <div className="step-info">Step 5 of 5</div>
          <div className="question">Which role best describes you?</div>
          <div className="button-container">
            <button
              className={`role-button ${role === 'Coach' ? 'selected' : ''}`}
              onClick={() => handleRoleClick('Coach')}
            >
              <div>Coach</div>
              <div className="role-description">I'd like to train athletes to reach their goals in speed, form, endurance.</div>
            </button>
            <button
              className={`role-button ${role === 'Athlete' ? 'selected' : ''}`}
              onClick={() => handleRoleClick('Athlete')}
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
};

export default AccountQuestion5;
