// frontend/src/Components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <h2>Home Page</h2>
      <p>Select an option:</p>
      <div className="button-container">
        <Link to="/call">
          <button>Go to Call Page</button>
        </Link>
        <Link to="/person">
          <button>Go to Person Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;