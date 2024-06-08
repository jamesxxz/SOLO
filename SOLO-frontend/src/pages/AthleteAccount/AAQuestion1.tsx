import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from 'react';
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
  inputRefs: React.MutableRefObject<{ [key: string]: HTMLInputElement | null }>;
}

const AAQuestion1: React.FC = () => {
  const history = useHistory();
  const location = useLocation<NestedState>();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login } = authContext;

  // Call hooks at the top of the component
  const [athleteData, setAthleteData] = useState<AthleteData | null>(null);
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

  useEffect(() => {
    const state = location.state?.state;
    if (state) {
      const initialAthleteData: AthleteData = {
        name: state.name,
        email: state.email,
        phoneNumber: state.phoneNumber,
        password: state.password,
        profilePic: state.profilePhoto || 'default_pic',
        age: '',
        gender: '',
        height: '',
        weight: '',
        affiliationId: ''
      };
      setAthleteData(initialAthleteData);
    } else {
      history.push('/start-exploring-athlete'); // Redirect to a safe page if state is missing
    }
  }, [location.state, history]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAthleteData(prev => ({
      ...prev!,
      [name]: value
    }));
    // Ensure focus is maintained
    if (inputRefs.current[name]) {
      inputRefs.current[name]!.focus();
    }
  }, []);

  const onBackClick = useCallback(() => {
    history.goBack();
  }, [history]);

  const onFinish = useCallback(async () => {
    if (athleteData) {
      try {
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
    }
  }, [athleteData, history, login]);

  const questions = useMemo(() => [
    { label: 'What is your age?', name: 'age' },
    { label: 'What is your gender?', name: 'gender' },
    { label: 'What is your height?', name: 'height' },
    { label: 'What is your weight?', name: 'weight' },
    { label: 'What is your Educational Institute/Athletic Program and/or Youth Athletic Club?', name: 'affiliationId' }
  ], []);

  const allAnswersFilled = useMemo(() => athleteData && Object.values(athleteData).every(x => x !== '' && x != null), [athleteData]);

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        {athleteData ? (
          <div className="question-view">
            <QuestionComponent
              questions={questions}
              athleteData={athleteData}
              affiliations={affiliations}
              handleChange={handleChange}
              inputRefs={inputRefs}
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}
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

const QuestionComponent: React.FC<QuestionComponentProps> = React.memo(({ questions, athleteData, affiliations, handleChange, inputRefs }) => {
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

export default AAQuestion1;
