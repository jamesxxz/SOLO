import React, { useState } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/AthleteInformation';
import { useHistory } from 'react-router-dom';

const AAQuestion1: React.FC = () => {
  const history = useHistory();
  const initialAnswers = {
    age: '',
    gender: '',
    height: '',
    weight: '',
    institute: ''
  };
  const [answers, setAnswers] = useState(initialAnswers);

  const questions = [
    { label: "What is your age?", name: "age" },
    { label: "What is your gender?", name: "gender" },
    { label: "What is your height?", name: "height" },
    { label: "What is your weight?", name: "weight" },
    { label: "What is your Educational Institute/Athletic Program and/or Youth Athletic Club?", name: "institute" }
  ];

  const handleChange = (name: string, value: string) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const onBackClick = () => {
    history.goBack(); // Adjust according to your routing logic
  };

  const onFinish = () => {
    console.log(answers);
    history.push('/summary'); // Adjust to your actual next route
  };

  const allAnswersFilled = Object.values(answers).every(x => x !== '');

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          {questions.map((question, index) => (
            <div key={index}>
              <div className="step-info">Question {index + 1} of {questions.length}</div>
              <div className="question">{question.label}</div>
              <input
                type="text"
                name={question.name}
                placeholder="Enter your answer"
                value={answers[question.name]}
                onChange={(e) => handleChange(question.name, e.target.value)}
                className="answer-input"
              />
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
            <button onClick={onBackClick} className="back-button">BACK</button>
            <button 
              onClick={onFinish} 
              className="next-button"
              disabled={!allAnswersFilled} // Disable Finish button if not all answers are filled
            >
              FINISH
            </button>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default AAQuestion1;

