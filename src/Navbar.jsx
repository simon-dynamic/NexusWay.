import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__wordmark">
          <span className="navbar__wordmark-n">N</span>
          <span className="navbar__wordmark-exus">exus</span>
          <span className="navbar__wordmark-w">W</span>
          <span className="navbar__wordmark-ay">ay</span>
          <span className="navbar__wordmark-dot">.</span>
        </span>
      </Link>
      <div className="navbar__end">
        <a href="#" className="navbar__about">
          About Us
        </a>
        <Link to="/signup" className="navbar__signup">
          Sign Up
        </Link>
        <Link to="/signin" className="navbar__signin">
          Sign In
        </Link>
      </div>
    </header>


  );
}
