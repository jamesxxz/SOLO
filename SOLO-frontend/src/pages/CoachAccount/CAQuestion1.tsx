import React, { useState } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CoachInformation';
import { useHistory } from 'react-router-dom';

const CAQuestion1: React.FC = () => {
  const history = useHistory();
  const initialAnswers = {
    title: '',  // Assuming 'title' and 'institute' are the only required fields from your questions array
    institute: ''
  };
  const [answers, setAnswers] = useState(initialAnswers);

  const questions = [
    { label: "What is your Title (i.e., Head Coach, Assistant Head Coach, Distance Coach)", name: "title" },
    { label: "What is your Educational Institute/Athletic Program and/or Youth Athletic Club (i.e., Middle School, High School, College, University)", name: "institute" }
  ];

  const handleChange = (name: string, value: string) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const onBackClick = () => {
    history.goBack(); // Adjust according to your routing logic
  };

  const onFinish = () => {
    console.log(answers);
    history.push('/start-exploring-coach'); // Adjust to your actual next route
  };

  // Ensure that all required answers are filled
  const allAnswersFilled = questions.every(question => answers[question.name] !== '');

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
              disabled={!allAnswersFilled}
            >
              FINISH
            </button>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default CAQuestion1;
