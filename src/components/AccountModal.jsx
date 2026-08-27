import { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AccountModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="account-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {isLoggedIn ? (
          <div className="account-profile-view">
            <div className="profile-avatar">
              <User size={36} />
            </div>
            <h3>Welcome, {name || 'Valued Customer'}</h3>
            <p className="account-user-email">{mobileOrEmail || 'customer@rafacollection.com'}</p>

            <div className="account-quick-links">
              <div className="account-link-item">
                <span>📦 Order History & Tracking</span>
                <ArrowRight size={16} />
              </div>
              <div className="account-link-item">
                <span>📍 Saved Delivery Addresses</span>
                <ArrowRight size={16} />
              </div>
              <div className="account-link-item">
                <span>🎁 RAFAA Club Loyalty Points (450 Pts)</span>
                <ArrowRight size={16} />
              </div>
            </div>

            <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="account-auth-view">
            <div className="auth-header">
              <span className="brand-logo-small">RAFAA</span>
              <h3 className="auth-title">{isLogin ? 'Sign In to Your Account' : 'Create an Account'}</h3>
              <p className="auth-subtitle">
                {isLogin
                  ? 'Access your orders, saved addresses and exclusive Eid offers.'
                  : 'Join RAFAA for early access to Eid 2026 launches and members-only pricing.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-field">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={16} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahila Begum"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="form-field">
                <label>Email or Mobile Number</label>
                <div className="input-with-icon">
                  <Mail size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Enter email or 10-digit mobile"
                    value={mobileOrEmail}
                    onChange={(e) => setMobileOrEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={16} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="auth-footer-toggle">
              {isLogin ? (
                <span>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setIsLogin(false)}>
                    Sign up now
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setIsLogin(true)}>
                    Sign in
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

