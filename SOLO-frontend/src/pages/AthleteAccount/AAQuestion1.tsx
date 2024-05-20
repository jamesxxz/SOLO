import React, { useEffect, useState, useContext } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/AthleteInformation';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Affiliation, Question } from '../../types/Affiliation';
import { AccountContext } from '../../contexts/AccountContext';
import { ApiService } from '../../../services/api.service';


const AAQuestion1: React.FC = () => {
  const history = useHistory();
  const location = useLocation<NestedState>(); 
  const { state } = location;
  const name = state.state.name;
  const email = state.state.email;
  const phoneNumber = state.state.phoneNumber;
  const password = state.state.password;
  const profilePhoto = state.state.profilePhoto;
  const role = state.state.role;  
  const {
    age, setAge,
    gender, setGender,
    height, setHeight,
    weight, setWeight,
    institute, setInstitute
  } = useContext(AccountContext);

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

  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);

  const questions: Question[] = [
    { label: "What is your age?", name: "age" },
    { label: "What is your gender?", name: "gender" },
    { label: "What is your height?", name: "height" },
    { label: "What is your weight?", name: "weight" },
    { label: "What is your Educational Institute/Athletic Program and/or Youth Athletic Club?", name: "institute" }
  ];

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const response = await axios.get<Affiliation[]>('http://localhost:3000/affiliation/');
        setAffiliations(response.data);
      } catch (error) {
        console.error('Error fetching affiliations:', error);
      }
    };
    fetchAffiliations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Debugging line
    switch (name) {
      case 'age': setAge(value); break;
      case 'gender': setGender(value); break;
      case 'height': setHeight(value); break;
      case 'weight': setWeight(value); break;
      case 'institute': setInstitute(value); break;
      default: break;
    }
  };

  const onBackClick = () => {
    history.goBack();
  };

  const onFinish = async () => {
    console.log({ age, gender, height, weight, institute });
  //   try {
  //     const combinedData = {
  //     name: name,
  //     email: email,
  //     phoneNumber: phoneNumber,
  //     password: password,
  //     profile:profilePhoto,
  //     role: role,
  //     age: age,
  //     gender: gender,
  //     height: height,
  //     weight: weight,
  //     affiliation: institute
  //   };
  //   const response = await ApiService.createCoach(combinedData);
  //   console.log('Account created:', response);
  //   history.push('/account-question-1');
  // } catch (error) {
  //   console.error('Failed to create account:', error);
  // }
    history.push('/start-exploring-athlete');
  };

  const allAnswersFilled = [age, gender, height, weight, institute].every(x => x !== '');

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          {questions.map((question, index) => (
            <div key={index}>
              <div className="step-info">Question {index + 1} of {questions.length}</div>
              <div className="question">{question.label}</div>
              {question.name === 'institute' ? (
                <select
                  name={question.name}
                  value={institute}
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
                  value={
                    question.name === 'age' ? age :
                    question.name === 'gender' ? gender :
                    question.name === 'height' ? height :
                    question.name === 'weight' ? weight :
                    ''
                  }
                  onChange={handleChange}
                  className="answer-input"
                />
              )}
            </div>
          ))}
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
