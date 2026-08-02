import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchFlights.css';

const SearchFlights = () => {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState('oneway');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('economy');

  const increment = (setter, value) => setter(Math.min(value + 1, 9));
  const decrement = (setter, value) => setter(Math.max(value - 1, 0));

  const handleSearch = (e) => {
    e.preventDefault();
    alert('Search Flights functionality coming soon!');
  };

  return (
    <div className="sf-page">
      {/* Image banner placeholder — future upload space below navbar */}
      <div className="sf-banner">
        <div className="sf-banner-placeholder">
          <span className="sf-banner-icon">🖼️</span>
          <span className="sf-banner-text">Image banner placeholder</span>
        </div>
      </div>
      <div className="sf-container">
        <button className="sf-back-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        <h1 className="sf-title">
          <span className="sf-title-s">S</span>
          <span className="sf-title-earch">earch</span>
          <span className="sf-title-f"> F</span>
          <span className="sf-title-lights">lights</span>
        </h1>
        <p className="sf-subtitle">Find the best flights for your journey</p>

        <form className="sf-form" onSubmit={handleSearch}>
          {/* Trip Type */}
          <div className="sf-trip-type">
            <label className={`sf-trip-option ${tripType === 'oneway' ? 'active' : ''}`}>
              <input
                type="radio"
                name="tripType"
                value="oneway"
                checked={tripType === 'oneway'}
                onChange={() => setTripType('oneway')}
              />
              <span className="sf-trip-circle"></span>
              One-way
            </label>
            <label className={`sf-trip-option ${tripType === 'roundtrip' ? 'active' : ''}`}>
              <input
                type="radio"
                name="tripType"
                value="roundtrip"
                checked={tripType === 'roundtrip'}
                onChange={() => setTripType('roundtrip')}
              />
              <span className="sf-trip-circle"></span>
              Round Trip
            </label>
          </div>

          {/* Origin & Destination */}
          <div className="sf-route-row">
            <div className="sf-field">
              <label htmlFor="origin">From (Origin)</label>
              <input
                type="text"
                id="origin"
                placeholder="City or Airport"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>

            <div className="sf-swap-btn" title="Swap">⇄</div>

            <div className="sf-field">
              <label htmlFor="destination">To (Destination)</label>
              <input
                type="text"
                id="destination"
                placeholder="City or Airport"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="sf-dates-row">
            <div className="sf-field">
              <label htmlFor="departDate">Departure Date</label>
              <input
                type="date"
                id="departDate"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                required
              />
            </div>

            {tripType === 'roundtrip' && (
              <div className="sf-field">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          {/* Passengers */}
          <div className="sf-passengers">
            <div className="sf-passenger">
              <span className="sf-passenger-label">Adults</span>
              <div className="sf-stepper">
                <button type="button" onClick={() => decrement(setAdults, adults)}>−</button>
                <span>{adults}</span>
                <button type="button" onClick={() => increment(setAdults, adults)}>+</button>
              </div>
            </div>
            <div className="sf-passenger">
              <span className="sf-passenger-label">Children</span>
              <div className="sf-stepper">
                <button type="button" onClick={() => decrement(setChildren, children)}>−</button>
                <span>{children}</span>
                <button type="button" onClick={() => increment(setChildren, children)}>+</button>
              </div>
            </div>
            <div className="sf-passenger">
              <span className="sf-passenger-label">Infants</span>
              <div className="sf-stepper">
                <button type="button" onClick={() => decrement(setInfants, infants)}>−</button>
                <span>{infants}</span>
                <button type="button" onClick={() => increment(setInfants, infants)}>+</button>
              </div>
            </div>
          </div>

          {/* Travel Class */}
          <div className="sf-field sf-class-field">
            <label htmlFor="travelClass">Travel Class</label>
            <select
              id="travelClass"
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
            >
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>

          <button type="submit" className="sf-search-btn">Search Flights</button>
        </form>
      </div>
    </div>
  );
};

export default SearchFlights;

