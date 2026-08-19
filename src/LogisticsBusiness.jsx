import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchFlights.css';
import './LogisticsBusiness.css';

const LogisticsBusiness = () => {
  const navigate = useNavigate();

  return (
    <div className="sf-page lb-page">
      {/* Image/banner placeholder below navbar (same banner style as Search Flights) */}
      <div className="sf-banner">
        <div className="sf-banner-image-wrap">
          <div className="sf-banner-image-placeholder"></div>
          <span className="sf-banner-text-overlay">Find your way</span>
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
      </div>
    </div>
  );
};

export default LogisticsBusiness;