import React, { useState } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CoachInformation';
import { useHistory, useLocation } from 'react-router-dom';
import { ApiService } from '../../../services/api.service';


interface NestedState {
        
  state: {
      name: string;
      email: string;
      phoneNumber: string;
      password: string;
      profilePhoto: string;
      role: string;
  }
}
const CAQuestion1: React.FC = () => {
  const history = useHistory();
  const location = useLocation<NestedState>(); 
  const { state } = location;
  const name = state.state.name;
  const email = state.state.email;
  const phoneNumber = state.state.phoneNumber;
  const password = state.state.password;
  const profilePhoto = state.state.profilePhoto;
  const role = state.state.role;  
  console.log(name, role);

  const initialAnswers = {
    title: '',  // Assuming 'title' and 'institute' are the only required fields from your questions array
    institute: ''
  };
  //const { name, email, password, file, role} = location.state || {};

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

  const onFinish = async () => {
    console.log(answers);
    try {
        const combinedData = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        profile:profilePhoto,
        role: role,
        title: answers.title,
        affiliation: answers.institute
      };
      const response = await ApiService.createCoach(combinedData);
      console.log('Account created:', response);
      history.push('/account-question-1');
    } catch (error) {
      console.error('Failed to create account:', error);
    }
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
