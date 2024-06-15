import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VehicleSelection.css';
import evBikeImg from '../assets/evbike.png';
import evCarImg from '../assets/evcar.png';
import evSuvImg from '../assets/evsuv.png';

const vehiclesData = [
  { kind: 'EV Bike', range: '60 KM', count: 2, img: evBikeImg },
  { kind: 'EV Car', range: '100 KM', count: 1, img: evCarImg },
  { kind: 'EV SUV', range: '120 KM', count: 1, img: evSuvImg }
];

const VehicleSelection = () => {
  const navigate = useNavigate();
  const [selectedVehicleCop1, setSelectedVehicleCop1] = useState('');
  const [selectedVehicleCop2, setSelectedVehicleCop2] = useState('');
  const [error, setError] = useState(null);

  const handleVehicleSelectionCop1 = (vehicleKind) => {
    setSelectedVehicleCop1(vehicleKind);
  };

  const handleVehicleSelectionCop2 = (vehicleKind) => {
    setSelectedVehicleCop2(vehicleKind);
  };

  const handleSubmit = () => {
    if (!selectedVehicleCop1 || !selectedVehicleCop2) {
      setError('Please select a vehicle for both cops.');
      return;
    }
    setError(null);

    fetch('https://yocketbe-production.up.railway.app/api/start-simulation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicles: { cop1: selectedVehicleCop1, cop2: selectedVehicleCop2 } }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        navigate('/result', { state: { result: data } }); 
      })
      .catch(err => {
        setError('Failed to start simulation: ' + err.message);
      });
  };

  return (
    <div className="vehicle-selection-container">
      <h2 className="vehicle-selection-title">Select Vehicles for Each Cop</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="inputs-container">
        <div className="input-group">
          <label htmlFor="cop1">Selected Vehicle for Cop 1</label>
          <input
            type="text"
            id="cop1"
            name="cop1"
            value={selectedVehicleCop1}
            readOnly
            placeholder="Vehicle for Cop 1"
            className="vehicle-selection-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="cop2">Selected Vehicle for Cop 2</label>
          <input
            type="text"
            id="cop2"
            name="cop2"
            value={selectedVehicleCop2}
            readOnly
            placeholder="Vehicle for Cop 2"
            className="vehicle-selection-input"
          />
        </div>
      </div>

      <h3>Select Vehicle for Cop 1</h3>
      <div className="vehicle-selection">
        {vehiclesData.map(vehicle => (
          <div
            key={vehicle.kind}
            className={`vehicle-card ${selectedVehicleCop1 === vehicle.kind ? 'selected' : ''}`}
            onClick={() => handleVehicleSelectionCop1(vehicle.kind)}
          >
            <img src={vehicle.img} alt={vehicle.kind} className="vehicle-image" />
            <h3>{vehicle.kind}</h3>
            <p>Range: {vehicle.range}</p>
            <p>Count: {vehicle.count}</p>
          </div>
        ))}
      </div>
      
      <h3>Select Vehicle for Cop 2</h3>
      <div className="vehicle-selection">
        {vehiclesData.map(vehicle => (
          <div
            key={vehicle.kind}
            className={`vehicle-card ${selectedVehicleCop2 === vehicle.kind ? 'selected' : ''}`}
            onClick={() => handleVehicleSelectionCop2(vehicle.kind)}
          >
            <img src={vehicle.img} alt={vehicle.kind} className="vehicle-image" />
            <h3>{vehicle.kind}</h3>
            <p>Range: {vehicle.range}</p>
            <p>Count: {vehicle.count}</p>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        className="vehicle-selection-button"
      >
        Start Simulation
      </button>
    </div>
  );
};

export default VehicleSelection;
