import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import AccountQuestion1 from './AccountQuestion1';
import AccountQuestion2 from './AccountQuestion2';
import AccountQuestion3 from './AccountQuestion3';
import AccountQuestion4 from './AccountQuestion4';
import AccountQuestion5 from './AccountQuestion5';
import SubmitForm from './SubmitForm';
import CreateAccountHeader from '../../components/GradientHeader/CreateAccountHeader';

const CreateAccount: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    console.log('Next Step');
    setStep(step + 1);
  };

  const prevStep = () => {
    console.log('Previous Step');
    setStep(step - 1);
  };

  console.log('Current Step:', step);

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        {step === 1 && <AccountQuestion1 onNextClick={nextStep} />}
        {step === 2 && <AccountQuestion2 onNextClick={nextStep} onBackClick={prevStep} />}
        {step === 3 && <AccountQuestion3 onNextClick={nextStep} onBackClick={prevStep} />}
        {step === 4 && <AccountQuestion4 onNextClick={nextStep} onBackClick={prevStep} />}
        {step === 5 && <AccountQuestion5 onNextClick={nextStep} onBackClick={prevStep} />}
        {step === 6 && <SubmitForm onBackClick={prevStep} />}
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
