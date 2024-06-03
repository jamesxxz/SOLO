import React, { useEffect, useState, useContext } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import CreateAccountHeader from '../../components/GradientHeader/CoachInformation';
import { useHistory, useLocation } from 'react-router-dom';
import { Affiliation } from '../../types/Affiliation';
import { ApiService } from '../../../services/api.service';
import { AuthContext } from '../../contexts/AuthContext';

interface NestedState {
  state: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    profilePhoto: File | string;
  };
}

const CAQuestion1: React.FC = () => {
  const history = useHistory();
  const location = useLocation<NestedState>();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login } = authContext;
  const { state } = location;

  const initialCoachData = {
    name: state.state.name,
    email: state.state.email,
    phoneNumber: state.state.phoneNumber,
    password: state.state.password,
    profilePic: state.state.profilePhoto || 'default_pic',
    title: '',
    affiliationId: '',
  };

  const [coachData, setCoachData] = useState(initialCoachData);
  const [affiliations, setAffiliations] = useState<Affiliation[]>([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCoachData((prev) => ({ ...prev, [name]: value }));
  };

  const onBackClick = () => {
    history.goBack();
  };

  const onFinish = async () => {
    console.log(coachData);
    try {
      const response = await ApiService.createCoach(coachData);
      console.log('Account created:', response);
  
      // Log the entire response object to see its structure
      console.log('Full response:', response);
  
      // Access the ID directly from the response object
      const userId = response?.id;
      console.log('User ID:', userId);
  
      if (userId) {
        login(userId); // Store the user ID in context and local storage
        history.push('/start-exploring-coach');
      } else {
        console.error('Failed to retrieve user ID from response');
      }
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  const QuestionComponent = ({ questions, coachData, affiliations, handleChange }) => {
    return questions.map((question, index) => (
      <div key={index}>
        <div className="step-info">Question {index + 1} of {questions.length}</div>
        <div className="question">{question.label}</div>
        {question.name === 'affiliationId' ? (
          <select
            name={question.name}
            value={coachData[question.name]}
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
            type="text"
            name={question.name}
            placeholder="Enter your answer"
            value={coachData[question.name]}
            onChange={handleChange}
            className="answer-input"
          />
        )}
      </div>
    ));
  };

  const allAnswersFilled = coachData.title !== '' && coachData.affiliationId !== '';

  return (
    <IonPage>
      <CreateAccountHeader />
      <IonContent>
        <div className="question-view">
          <QuestionComponent
            questions={[
              { label: "What is your title? (E.g. Head Coach, Assistant Coach)", name: "title" },
              { label: "What is your Educational Institute/Athletic Program and/or Youth Athletic Club?", name: "affiliationId" }
            ]}
            coachData={coachData}
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

export default CAQuestion1;
