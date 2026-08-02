import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureBoxes.css';

const FeatureBoxes = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Search Flights', icon: '✈️', path: '/search-flights' },
    { title: 'Book Flight', icon: '🎫' },
    { title: 'Documental Analysis', icon: '📄' },
    { title: 'Watch Movies', icon: '🎬' },
    { title: 'Logistics & Business', icon: '📦' }
  ];

  const handleClick = (feature) => {
    if (feature.path) {
      navigate(feature.path);
    }
  };

  return (
    <div className="feature-boxes-container">
      <div className="feature-boxes-separator"></div>
      <div className="feature-boxes-wrapper">
        {features.map((feature, index) => (
          <div key={index} className="feature-box" onClick={() => handleClick(feature)}>
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-title">{feature.title}</div>
          </div>
        ))}
      </div>
      <div className="feature-boxes-separator"></div>
    </div>
  );
};

export default FeatureBoxes;

