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
          <div className="signup-header-row">
            <h1 className="signup-page-title">
              <span className="signup-title-dark">S</span>
              <span className="signup-title-light">ign</span>
              <span className="signup-title-dark-purple"> U</span>
              <span className="signup-title-light-purple">p</span>
            </h1>
            <button className="signup-back-btn" onClick={() => navigate('/')}>
              ← Back
            </button>
          </div>
          
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
            
            <div className="signup-divider"><span>or</span></div>
            
            <button type="button" className="signup-google-btn">
              <svg className="signup-google-logo" viewBox="0 0 48 48" width="20" height="20">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              Sign up with Google
            </button>
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
