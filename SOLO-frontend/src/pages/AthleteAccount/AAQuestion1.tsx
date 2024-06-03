import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/AthleteInformation';
import { useHistory, useLocation } from 'react-router-dom';
import { Affiliation } from '../../types/Affiliation';
import { ApiService } from '../../../services/api.service';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

interface NestedState {
  state: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    profilePhoto: string;
  };
}

interface Question {
  label: string;
  name: string;
}

interface AthleteData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePic: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  affiliationId: string;
  [key: string]: string;
}

interface QuestionComponentProps {
  questions: Question[];
  athleteData: AthleteData;
  affiliations: Affiliation[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AAQuestion1: React.FC = () => {
  const history = useHistory();
  const location = useLocation<NestedState>();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login } = authContext;
  const { state } = location;

  const initialAthleteData: AthleteData = {
    name: state.state.name,
    email: state.state.email,
    phoneNumber: state.state.phoneNumber,
    password: state.state.password,
    profilePic: state.state.profilePhoto || 'default_pic',
    age: '',
    gender: '',
    height: '',
    weight: '',
    affiliationId: ''
  };

  const [athleteData, setAthleteData] = useState<AthleteData>(initialAthleteData);
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const response = await ApiService.getAffiliations();
        console.log('Fetched affiliations:', response);
        setAffiliations(response);
      } catch (error) {
        console.error('Error fetching affiliations:', error);
      }
    };
    fetchAffiliations();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAthleteData(prev => ({
      ...prev,
      [name]: value
    }));
    // Ensure focus is maintained
    if (inputRefs.current[name]) {
      inputRefs.current[name]!.focus();
    }
  }, []);

  const onBackClick = () => {
    history.goBack();
  };

  const onFinish = async () => {
    try {
      // Log the data being sent to the server
      console.log('Data being sent:', athleteData);
  
      const response = await ApiService.createAthlete(athleteData);
      const userId = response.id;
  
      if (userId) {
        login(userId); // Store the user ID in context and local storage
        history.push('/start-exploring-athlete');
      } else {
        console.error('Failed to retrieve user ID from response');
      }
    } catch (error) {
      console.error('Failed to create account:', error);
  
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  
 

  const QuestionComponent: React.FC<QuestionComponentProps> = React.memo(({ questions, athleteData, affiliations, handleChange }) => {
    return (
      <>
        {questions.map((question, index) => (
          <div key={question.name}>
            <div className="step-info">Question {index + 1} of {questions.length}</div>
            <div className="question">{question.label}</div>
            {question.name === 'affiliationId' ? (
              <select
                name={question.name}
                value={athleteData[question.name]}
                onChange={handleChange}
                className="answer-input"
              >
                <option value="">Select your institute</option>
                {affiliations.map((affiliation) => (
                  <option key={affiliation.affiliation_id} value={affiliation.affiliation_id}>
                    {affiliation.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                ref={(el) => (inputRefs.current[question.name] = el)}
                type="text"
                name={question.name}
                placeholder="Enter your answer"
                value={athleteData[question.name]}
                onChange={handleChange}
                className="answer-input"
              />
            )}
          </div>
        ))}
      </>
    );
  });

  const allAnswersFilled = Object.values(athleteData).every(x => x !== '' && x != null);

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <QuestionComponent
            questions={[
              { label: 'What is your age?', name: 'age' },
              { label: 'What is your gender?', name: 'gender' },
              { label: 'What is your height?', name: 'height' },
              { label: 'What is your weight?', name: 'weight' },
              { label: 'What is your Educational Institute/Athletic Program and/or Youth Athletic Club?', name: 'affiliationId' }
            ]}
            athleteData={athleteData}
            affiliations={affiliations}
            handleChange={handleChange}
          />
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
