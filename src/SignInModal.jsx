
import { createPortal } from 'react-dom';
import './SignInModal.css';

const SignInModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Render into document.body via a portal so the fixed overlay isn't trapped
  // inside the navbar's backdrop-filter containing block.
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">
          <span className="title-dark">S</span>
          <span className="title-light">ign</span>
          <span className="title-dark-purple"> in</span>
        </h1>

        <form>
          <div className="input-group">
            <label htmlFor="userId">User Id</label>
            <input
              type="text"
              id="userId"
              placeholder="Enter your User Id"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-submit">Sign In</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
        <button type="button" className="modal-cross" onClick={onClose}>×</button>
      </div>
    </div>,
    document.body
  );
};

export default SignInModal;
