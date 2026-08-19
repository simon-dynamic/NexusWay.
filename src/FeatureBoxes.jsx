import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureBoxes.css';

const FeatureBoxes = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Search Flights', path: '/search-flights' },
    { title: 'Dynamic Rate Arbitrage' },
    { title: 'Cargo Capacity' },
    { title: 'Customs & Compliance' },
    { title: 'Logistics & Business', path: '/logistics-business' }
  ];

  const handleClick = (feature) => {
    if (feature.path) {
      navigate(feature.path);
    }
  };

  return (
    <div className="feature-boxes-container">
      <h2 className="feature-heading">Feature Collection</h2>
      <div className="feature-boxes-separator"></div>
      <div className="feature-boxes-wrapper">
        {features.map((feature, index) => (
          <div key={index} className="feature-box" onClick={() => handleClick(feature)}>
            <div className="feature-image-placeholder"></div>
            <div className="feature-title">{feature.title}</div>
          </div>
        ))}
      </div>
      <div className="feature-boxes-separator"></div>
    </div>
  );
};

export default FeatureBoxes;