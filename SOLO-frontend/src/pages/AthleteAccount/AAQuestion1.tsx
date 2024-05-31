import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/AthleteInformation';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Affiliation, Question } from '../../types/Affiliation';
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


const AAQuestion1: React.FC = () => {
  const history = useHistory();
  const location = useLocation<NestedState>();
  const { state } = location;

  const initialAthleteData = {
    name: state.state.name,
    email: state.state.email,
    phoneNumber: state.state.phoneNumber,
    password: state.state.password,
    profilePhoto: state.state.profilePhoto,
    role: state.state.role,
    age: '',
    gender: '',
    height: '',
    weight: '',
    institute: ''
  };

  const [athleteData, setAthleteData] = useState(initialAthleteData);
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        //const response = await ApiService.getAffiliations();
        //console.log(response);
        //setAffiliations(response.data);
        //setAffiliations(Affiliation);
      } catch (error) {
        console.error('Error fetching affiliations:', error);
      }
    };
    fetchAffiliations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAthleteData(prev => ({ ...prev, [name]: value }));
  };

  const onBackClick = () => {
    history.goBack();
  };

  const onFinish = async () => {
    console.log(athleteData);
    try {
      const response = await ApiService.createAthlete(athleteData); // Note: Method name may need to be updated.
      console.log('Account created:', response);
      history.push('/account-question-1');
    } catch (error) {
      console.error('Failed to create account:', error);
    }
    history.push('/start-exploring-athlete');
  };


  
function QuestionComponent({ questions, athleteData, affiliations, handleChange }) {
  return questions.map((question, index) => (
    <div key={index}>
      <div className="step-info">Question {index + 1} of {questions.length}</div>
      <div className="question">{question.label}</div>
      {question.name === 'institute' ? (
        <select
          name={question.name}
          value={athleteData[question.name]}
          onChange={handleChange}
          className="answer-input"
        >
          <option value="">Select your institute</option>
          {affiliations.map((affiliation) => (
            <option key={affiliation.affiliation_id} value={affiliation.affiliation_id.toString()}>
              {affiliation.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={question.name}
          placeholder="Enter your answer"
          value={athleteData[question.name]}
          onChange={handleChange}
          className="answer-input"
        />
      )}
    </div>
  ));
}


  const allAnswersFilled = Object.values(athleteData).every(x => x !== '');

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <QuestionComponent
            questions={[
              { label: "What is your age?", name: "age" },
              { label: "What is your gender?", name: "gender" },
              { label: "What is your height?", name: "height" },
              { label: "What is your weight?", name: "weight" },
              { label: "What is your Educational Institute/Athletic Program and/or Youth Athletic Club?", name: "institute" }
            ]}
            athleteData={athleteData}
            affiliations={affiliations}
            handleChange={handleChange}
          />
        </div>
        <div className="navigation-buttons">
          <button onClick={onBackClick} className="back-button">BACK</button>
          <button onClick={onFinish} className="next-button" disabled={allAnswersFilled}>
            FINISH
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AAQuestion1;
