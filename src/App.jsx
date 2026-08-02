import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import SignUpPage from './SignUpPage.jsx';
import HeroSection from './HeroSection.jsx';
import FeatureBoxes from './FeatureBoxes.jsx';
import BlackSection from './BlackSection.jsx';
import Footer from './Footer.jsx';
import SearchFlights from './SearchFlights.jsx';
import SignInModal from './SignInModal.jsx';

function Home({ onOpenSignIn }) {
  return (
    <>
      <HeroSection onOpenSignIn={onOpenSignIn} />
      <FeatureBoxes />
      <BlackSection />
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
      </Routes>
    </Router>
  )
}
