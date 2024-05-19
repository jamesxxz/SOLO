import React, { useEffect, useState, useContext } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/AthleteInformation';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Affiliation, Question } from '../../types/Affiliation';
import { AccountContext } from '../../contexts/AccountContext';

const AAQuestion1: React.FC = () => {
  const history = useHistory();
  const {
    age, setAge,
    gender, setGender,
    height, setHeight,
    weight, setWeight,
    institute, setInstitute
  } = useContext(AccountContext);

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

  const onFinish = () => {
    console.log({ age, gender, height, weight, institute });
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
          <button onClick={onFinish} className="next-button" disabled={!allAnswersFilled}>
            FINISH
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AAQuestion1;
