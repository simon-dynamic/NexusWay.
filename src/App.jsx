import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import SignUpPage from './SignUpPage.jsx';
import HeroSection from './HeroSection.jsx';
import FeatureBoxes from './FeatureBoxes.jsx';
import TruckSection from './TruckSection.jsx';
import Footer from './Footer.jsx';
import SearchFlights from './SearchFlights.jsx';
import LogisticsBusiness from './LogisticsBusiness.jsx';
import SignInModal from './SignInModal.jsx';

// Scroll the window to the top on every route change.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function Home({ onOpenSignIn }) {
  return (
    <>
      <HeroSection onOpenSignIn={onOpenSignIn} />
      <div className="section-divider"></div>
      <FeatureBoxes />
      <div className="section-divider"></div>
      <TruckSection />
      <Footer />
    </>
  );
}

export default function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar onOpenSignIn={openSignIn} />
            <Home onOpenSignIn={openSignIn} />
            <SignInModal isOpen={isSignInOpen} onClose={closeSignIn} />
          </>
        } />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search-flights" element={<><Navbar /><SearchFlights /></>} />
        <Route path="/logistics-business" element={<><Navbar /><LogisticsBusiness /></>} />
      </Routes>
    </Router>
  )
}
