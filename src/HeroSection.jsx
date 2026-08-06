import React from 'react';
import './HeroSection.css';

const HeroSection = ({ onOpenSignIn }) => {

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-headline">
            <span className="hero-headline-line1">
              <span className="hero-headline-s">S</span>triving together{' '}
              <span className="hero-headline-for">for a</span>
            </span>
            <span className="hero-headline-line2">
              <span className="hero-headline-n">N</span>
              <span className="hero-headline-exus">exus path</span>
              <span className="hero-headline-dot"></span>
            </span>
          </h1>
          <div className="hero-subtitle-container">
            <div className="hero-subtitle">
              <span className="hero-subtitle-text">Smart routing and predictive insights for modern warehouse.</span>
            </div>
            <div className="hero-subtitle">
              <span className="hero-subtitle-text">Scale your logistics effortlessly with power of AI.</span>
            </div>
          </div>
          <div className="hero-explore-button">
            <button className="hero-explore-btn" onClick={onOpenSignIn}>Explore</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
