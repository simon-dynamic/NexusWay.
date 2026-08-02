import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-page-container">
      <div className="signup-page-content">
        {/* Left Side - Form */}
        <div className="signup-form-section">
          <button className="signup-back-btn" onClick={() => navigate('/')}>
            ← Back
          </button>
          
          <h1 className="signup-page-title">
            <span className="signup-title-dark">S</span>
            <span className="signup-title-light">ign</span>
            <span className="signup-title-dark-purple"> U</span>
            <span className="signup-title-light-purple">p</span>
          </h1>
          
          <p className="signup-page-subtitle">Create your account to get started</p>
          
          <form className="signup-page-form">
            <div className="signup-page-input-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Enter your full name" />
            </div>
            
            <div className="signup-page-input-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            
            <div className="signup-page-input-group">
              <label htmlFor="password">Create Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            
            <div className="signup-page-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm your password" />
            </div>
            
            <button type="submit" className="signup-page-submit-btn">Create Account</button>
          </form>
          
          <p className="signup-page-footer">
            Already have an account? <span className="signup-page-link" onClick={() => navigate('/')}>Sign In</span>
          </p>
        </div>
        
        {/* Right Side - Image */}
        <div className="signup-image-section">
          <img src="/ribbon.png" alt="Ribbon background" className="signup-image" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
