import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import yapkashnagarImg from '../assets/yapkashnagar.png';
import lihaspurImg from '../assets/lihaspur.png';
import narmiscityImg from '../assets/narmiscity.png';
import shekharvatiImg from '../assets/shekharvati.png';
import nuravgramImg from '../assets/nuravgram.png';
import './CitySelection.css';

const cityData = [
  { name: 'Yapkashnagar', description: 'The Neon Oasis - Glowing alleys and rooftop races, powered by solar energy.', imgSrc: yapkashnagarImg },
  { name: 'Lihaspur', description: 'The Misty Labyrinth - Ancient temples shrouded in fog, whispers of forgotten tech.', imgSrc: lihaspurImg },
  { name: 'Narmis City', description: 'The Steel Jungle - Towering skyscrapers and hidden underground networks.', imgSrc: narmiscityImg },
  { name: 'Shekharvati', description: 'The Sun-Kissed Valley - Rolling hills and forgotten mining tunnels.', imgSrc: shekharvatiImg },
  { name: 'Nuravgram', description: 'The Quirky Village - Talking robots and malfunctioning AI guardians.', imgSrc: nuravgramImg }
];

const CitySelection = () => {
  const navigate = useNavigate();
  const [selectedCity1, setSelectedCity1] = useState('');
  const [selectedCity2, setSelectedCity2] = useState('');
  const [error, setError] = useState(null);

  function handleCitySelect1(cityName) {
    setSelectedCity1(cityName);
  }

  function handleCitySelect2(cityName) {
    setSelectedCity2(cityName);
  }

  function handleSubmit() {
    if (!selectedCity1 || !selectedCity2) {
      setError('Please select a city for both cops.');
      return;
    }
    setError(null);
    navigate('/vehicle-selection', { state: { cities: { cop1: selectedCity1, cop2: selectedCity2 } } });
  }

  return (
    <div className="city-selection-container">
      <h2 className="city-selection-title">Select Cities for Each Cop</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="inputs-container">
        <div className="input-group">
          <label htmlFor="cop1">Selected City for Cop 1</label>
          <input
            type="text"
            id="cop1"
            name="cop1"
            value={selectedCity1}
            readOnly
            placeholder="City for Cop 1"
            className="city-selection-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="cop2">Selected City for Cop 2</label>
          <input
            type="text"
            id="cop2"
            name="cop2"
            value={selectedCity2}
            readOnly
            placeholder="City for Cop 2"
            className="city-selection-input"
          />
        </div>
      </div>

      <h3>Select City for Cop 1</h3>
      <div className="city-selection">
        {cityData.map(city => (
          <div
            key={city.name}
            className={`city-card ${selectedCity1 === city.name ? 'selected' : ''}`}
            onClick={() => handleCitySelect1(city.name)}
          >
            <img src={city.imgSrc} alt={city.name} />
            <h3>{city.name}</h3>
            <p>{city.description}</p>
          </div>
        ))}
      </div>

      <h3>Select City for Cop 2</h3>
      <div className="city-selection">
        {cityData.map(city => (
          <div
            key={city.name}
            className={`city-card ${selectedCity2 === city.name ? 'selected' : ''}`}
            onClick={() => handleCitySelect2(city.name)}
          >
            <img src={city.imgSrc} alt={city.name} />
            <h3>{city.name}</h3>
            <p>{city.description}</p>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        className="city-selection-button"
      >
        Next
      </button>
    </div>
  );
};

export default CitySelection;
