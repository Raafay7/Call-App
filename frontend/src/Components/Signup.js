// src/Components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setSuccess(''); // Reset success message

    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        username,
        password,
      });

      if (response.status === 201) {
        setSuccess(response.data.message);
        // Redirect to the Login page upon successful signup
        setTimeout(() => {
          navigate('/'); // Redirect to the login page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success} Redirecting to login...</p>}
      <p className="redirect-link">
        Already have an account? <a href="/">Login here</a>.
      </p>
    </div>
  );
};

export default Signup;
