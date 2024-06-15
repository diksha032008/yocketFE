import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Cop Fugitive Game</h1> 
      <button onClick={() => navigate('/city-selection')}>Enter</button>
    </div>
  );
};

export default LandingPage;

