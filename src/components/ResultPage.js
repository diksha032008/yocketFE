import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result } = location.state;
  const [resData, setResData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://yocketbe-production.up.railway.app/result', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Data from API:", data);
        setResData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  console.log("resData:", resData);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="result-page-container">
      <h2 className="result-page-title">Result</h2>
      {result.success ? (
        <div>
          <p className="result-text">Captured by: {resData?.capturingCop}</p>
          <p className="result-text">Cop Vehicle: {resData?.vehicle?.name}</p>
          <p className="result-text">Fugitive City: {resData?.city?.name}</p>
        </div>
      ) : (
        <p className="result-text">Fugitive escaped!</p>
      )}
      <button onClick={() => navigate('/')} className="result-page-button">
        Restart
      </button>
    </div>
  );
};

export default ResultPage;
