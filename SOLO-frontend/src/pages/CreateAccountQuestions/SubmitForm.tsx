import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountContext';
import axios from 'axios';

interface SubmitFormProps {
  onBackClick: () => void;
}

const SubmitForm: React.FC<SubmitFormProps> = ({ onBackClick }) => {
  const history = useHistory();
  const { name, email, profilePhoto, role } = useAccount();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }
    formData.append('role', role);

    try {
      await axios.post('http://localhost:3001/api/users', formData);
      history.push('/home'); // Redirect after successful submission
    } catch (error) {
      console.error('There was an error saving the user info!', error);
    }
  };

  return (
    <div>
      <h2>Review your details</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
      <button onClick={onBackClick} className="back-button">BACK</button>
      <button onClick={handleSubmit} className="next-button">SUBMIT</button>
    </div>
  );
}

export default SubmitForm;
