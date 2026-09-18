import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchFlights.css';
import './LogisticsBusiness.css';

const LogisticsBusiness = () => {
  const navigate = useNavigate();

  // Vehicle Parameters
  const [vehicleNo, setVehicleNo] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [totalFuelCap, setTotalFuelCap] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [mileage, setMileage] = useState('');

  // Trip Parameters
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTiming, setDepartureTiming] = useState('');
  const [driverCount, setDriverCount] = useState(1);

  // Cost Parameters
  const [driverRate, setDriverRate] = useState('');
  const [fuelRate, setFuelRate] = useState('');
  const [totalTollRate, setTotalTollRate] = useState('');

  // Optimization Preferences
  const [costSensitivity, setCostSensitivity] = useState(50);
  const [timeSensitivity, setTimeSensitivity] = useState(50);

  const getSliderStyle = (value) => ({
    background: `linear-gradient(90deg, #ff0000 0%, #e87084 ${value * 0.5}%, #8006b9 ${value}%, rgba(255, 255, 255, 0.1) ${value}%)`
  });

  const handleGenerate = () => {
    console.log('Generating logistics optimization with:', {
      vehicle: { vehicleNo, length, height, grossWeight, fuelType, totalFuelCap, cargoType, mileage },
      trip: { origin, destination, departureTiming, driverCount },
      cost: { driverRate, fuelRate, totalTollRate },
      optimization: { costSensitivity, timeSensitivity }
    });
    alert('Logistics optimization generated!');
  };

  return (
    <div className="sf-page lb-page">
      {/* Image/banner below navbar (same banner style as Search Flights) */}
      <div className="sf-banner">
        <div className="sf-banner-image-wrap">
          <img src="/bannertruck.jpeg" alt="Logistics banner" className="sf-banner-image" />
          <span className="lb-banner-text">That's your way.</span>
          <div className="sf-banner-words">
            <span className="sf-banner-word">Find</span>
            <span className="sf-banner-word">Strive</span>
            <span className="sf-banner-word">Reach</span>
          </div>
        </div>
      </div>
      <div className="sf-container">
        <button className="sf-back-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        <h1 className="sf-title">
          <span className="sf-title-s">L</span>
          <span className="sf-title-earch">ogistics</span>
          <span className="sf-title-f"> & </span>
          <span className="sf-title-lights">Business</span>
        </h1>
        <p className="sf-subtitle">Streamline your cargo, customs, and business operations</p>

        <form className="lb-form" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
          {/* Phase 1: Vehicle Parameters */}
          <div className="lb-section">
            <h2 className="lb-section-heading">Vehicle Parameters</h2>
            <div className="lb-input-grid">
              <div className="lb-field">
                <label htmlFor="vehicleNo">Vehicle No</label>
                <input
                  type="text"
                  id="vehicleNo"
                  placeholder="Enter vehicle number"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="length">Length</label>
                <input
                  type="text"
                  id="length"
                  placeholder="Enter length"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="height">Height</label>
                <input
                  type="text"
                  id="height"
                  placeholder="Enter height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="grossWeight">Gross Weight</label>
                <input
                  type="text"
                  id="grossWeight"
                  placeholder="Enter gross weight"
                  value={grossWeight}
                  onChange={(e) => setGrossWeight(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="fuelType">Fuel Type</label>
                <select
                  id="fuelType"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option value="">Select fuel type</option>
                  <option value="diesel">Diesel</option>
                  <option value="petrol">Petrol</option>
                  <option value="cng">CNG</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <div className="lb-field">
                <label htmlFor="totalFuelCap">Total Fuel Cap</label>
                <input
                  type="text"
                  id="totalFuelCap"
                  placeholder="Enter total fuel capacity"
                  value={totalFuelCap}
                  onChange={(e) => setTotalFuelCap(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="cargoType">Cargo Type</label>
                <select
                  id="cargoType"
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                >
                  <option value="">Select cargo type</option>
                  <option value="general">General</option>
                  <option value="perishable">Perishable</option>
                  <option value="hazardous">Hazardous</option>
                  <option value="fragile">Fragile</option>
                </select>
              </div>
              <div className="lb-field">
                <label htmlFor="mileage">Mileage</label>
                <input
                  type="text"
                  id="mileage"
                  placeholder="Enter mileage"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="lb-section-divider"></div>

          {/* Phase 2: Trip Parameters */}
          <div className="lb-section">
            <h2 className="lb-section-heading">Trip Parameters</h2>
            <div className="lb-input-grid">
              <div className="lb-field">
                <label htmlFor="origin">Origin</label>
                <input
                  type="text"
                  id="origin"
                  placeholder="Enter origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="destination">Destination</label>
                <input
                  type="text"
                  id="destination"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="departureTiming">Departure Timing</label>
                <input
                  type="datetime-local"
                  id="departureTiming"
                  value={departureTiming}
                  onChange={(e) => setDepartureTiming(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="driverCount">Driver Count</label>
                <div className="lb-stepper">
                  <button type="button" onClick={() => setDriverCount(Math.max(1, driverCount - 1))}>−</button>
                  <span>{driverCount}</span>
                  <button type="button" onClick={() => setDriverCount(driverCount + 1)}>+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="lb-section-divider"></div>

          {/* Phase 3: Cost Parameters */}
          <div className="lb-section">
            <h2 className="lb-section-heading">Cost Parameters</h2>
            <div className="lb-input-grid">
              <div className="lb-field">
                <label htmlFor="driverRate">Driver Rate</label>
                <input
                  type="text"
                  id="driverRate"
                  placeholder="Enter driver rate"
                  value={driverRate}
                  onChange={(e) => setDriverRate(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="fuelRate">Fuel Rate</label>
                <input
                  type="text"
                  id="fuelRate"
                  placeholder="Enter fuel rate"
                  value={fuelRate}
                  onChange={(e) => setFuelRate(e.target.value)}
                />
              </div>
              <div className="lb-field">
                <label htmlFor="totalTollRate">Total Toll Rate</label>
                <input
                  type="text"
                  id="totalTollRate"
                  placeholder="Enter total toll rate"
                  value={totalTollRate}
                  onChange={(e) => setTotalTollRate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="lb-section-divider"></div>

          {/* Phase 4: Optimization Preferences */}
          <div className="lb-section">
            <h2 className="lb-section-heading">Optimization Preferences</h2>
            <div className="lb-sliders">
              <div className="lb-slider-group">
                <label htmlFor="costSensitivity">Cost Sensitivity: {costSensitivity}%</label>
                <input
                  type="range"
                  id="costSensitivity"
                  min="0"
                  max="100"
                  value={costSensitivity}
                  onChange={(e) => setCostSensitivity(parseInt(e.target.value))}
                  className="lb-slider"
                  style={getSliderStyle(costSensitivity)}
                />
              </div>
              <div className="lb-slider-group">
                <label htmlFor="timeSensitivity">Time Sensitivity: {timeSensitivity}%</label>
                <input
                  type="range"
                  id="timeSensitivity"
                  min="0"
                  max="100"
                  value={timeSensitivity}
                  onChange={(e) => setTimeSensitivity(parseInt(e.target.value))}
                  className="lb-slider"
                  style={getSliderStyle(timeSensitivity)}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="lb-generate-btn">Generate</button>
        </form>
      </div>
    </div>
  );
};

export default LogisticsBusiness;