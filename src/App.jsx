import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import SignUpPage from './SignUpPage.jsx';
import SignInPage from './SignInPage.jsx';
import HeroSection from './HeroSection.jsx';
import FeatureBoxes from './FeatureBoxes.jsx';
import TruckSection from './TruckSection.jsx';
import Footer from './Footer.jsx';
import SearchFlights from './SearchFlights.jsx';
import LogisticsBusiness from './LogisticsBusiness.jsx';

// Scroll the window to the top on every route change.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function Home() {
  return (
    <>
      <HeroSection />
      <div className="section-divider"></div>
      <FeatureBoxes />
      <div className="section-divider"></div>
      <TruckSection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/search-flights" element={<><Navbar /><SearchFlights /></>} />
        <Route path="/logistics-business" element={<><Navbar /><LogisticsBusiness /></>} />
      </Routes>
    </Router>
  )
}
