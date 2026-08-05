import React from 'react';
import './TruckSection.css';

const TruckSection = () => {
  return (
    <section className="truck-section">
      <div className="truck-section-content">
        <img src="/truck.jpg" alt="Truck" className="truck-section-image" />
        <div className="truck-section-text">
          <h1 className="truck-headline">
            <span className="truck-headline-line1">
              <span className="truck-headline-f">F</span>ind{' '}
              <span className="truck-headline-path">Path</span>
            </span>
<span className="truck-headline-line2">
              <span className="truck-headline-s">S</span>trive your way
            </span>
          </h1>
          <div className="truck-subtitle-container">
            <div className="truck-subtitle">
              <span className="truck-subtitle-text">Specify your vehicle size and length</span>
            </div>
            <div className="truck-subtitle">
              <span className="truck-subtitle-text">Get smart and custom fit route planning</span>
            </div>
          </div>
          <div className="truck-start-button">
            <button className="truck-start-btn">Start</button>
          </div>
        </div>
</div>
      <div className="top-truck-content">
        <span className="top-text-truck">Secure logistics with us.</span>
      </div>
    </section>
  );
};

export default TruckSection;
