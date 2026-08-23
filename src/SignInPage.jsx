import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInPage.css';

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="signin-page-container">
      <div className="signin-page-content">
        {/* Left Side - Form */}
        <div className="signin-form-section">
          <div className="signin-header-row">
            <h1 className="signin-page-title">
              <span className="signin-title-dark">S</span>
              <span className="signin-title-light">ign</span>
              <span className="signin-title-dark-purple"> I</span>
              <span className="signin-title-light-purple">n</span>
            </h1>
            <button className="signin-back-btn" onClick={() => navigate('/')}>
              ← Back
            </button>
          </div>
          
          <p className="signin-page-subtitle">Welcome back! Please sign in to continue</p>
          
          <form className="signin-page-form">
            <div className="signin-page-input-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            
            <div className="signin-page-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            
            <div className="signin-page-remember-forgot">
              <label className="signin-remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <span className="signin-forgot-password" onClick={() => navigate('/forgot-password')}>Forgot password?</span>
            </div>
            
            <button type="submit" className="signin-page-submit-btn">Sign In</button>
            
            <div className="signin-divider"><span>or</span></div>
            
            <button type="button" className="signin-google-btn">
              <svg className="signin-google-logo" viewBox="0 0 48 48" width="20" height="20">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              Sign in with Google
            </button>
          </form>
          
          <p className="signin-page-footer">
            Don't have an account? <span className="signin-page-link" onClick={() => navigate('/signup')}>Sign Up</span>
          </p>
          
          <div className="signin-page-legal-links">
            <span className="signin-legal-link" onClick={() => navigate('/terms')}>Terms of Service</span>
            <span className="signin-legal-separator">•</span>
            <span className="signin-legal-link" onClick={() => navigate('/privacy')}>Privacy Policy</span>
          </div>
        </div>
        
        {/* Right Side - Image */}
        <div className="signin-image-section">
          <img src="/ribbon2.jpg" alt="Ribbon background" className="signin-image" />
          <span className="signin-image-text">Find</span>
          <span className="signin-image-text-strive">Strive</span>
          <span className="signin-image-text-reach">Reach</span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
