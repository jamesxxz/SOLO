import React from 'react';
import { useHistory } from 'react-router-dom'; 
import './GradientHeader.css'; 

const MyCurrentAccount: React.FC = () => {
  const history = useHistory(); 

  const redirectToHome = () => {
    history.push('/home'); 
  };

  return (
    <header className="gradient-header">
      <div className="logo">MY CURRENT ACCOUNT</div>
      <button onClick={redirectToHome} className="close-button">X</button> {/* Close button */}
    </header>
  );
};

export default MyCurrentAccount;
