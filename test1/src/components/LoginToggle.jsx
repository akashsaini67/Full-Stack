import React, { useState } from 'react';

/**
 * Q3: Login Toggle Component
 * Marks: 4
 * 
 * Features:
 * - Shows a Login button initially
 * - Once clicked, displays a welcome message and a Logout button
 * - Switches back and forth cleanly upon each click
 */
export default function LoginToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = 'Student';

  const handleToggle = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="badge">Q3 &bull; 4 Marks</span>
        <h2>Login Toggle Component</h2>
        <p className="description">
          Demonstrates conditional rendering. Switches between Login state and Welcome/Logout state.
        </p>
      </div>

      <div className="login-status-box">
        {isLoggedIn ? (
          <div className="logged-in-view">
            <div className="avatar-icon">&#128100;</div>
            <h3>Welcome back, {userName}!</h3>
            <p className="status-badge status-active">Status: Authenticated Session</p>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleToggle}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="logged-out-view">
            <div className="avatar-icon">&#128274;</div>
            <h3>You are currently logged out</h3>
            <p className="status-badge status-inactive">Please click below to sign in.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleToggle}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
