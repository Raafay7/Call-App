import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PersonList.css';

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  useEffect(() => {
    fetch('http://localhost:3000/api/person')
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  // New function to handle Add Person click
  const handleAddPersonClick = () => {
    if (people.length >= 10) {
      alert('Person limit exceeded. Please delete any person before adding a new one.');
    } else {
      navigate('/person/add'); // navigate to Add Person if limit is not exceeded
    }
  };

  return (
    <div className="container">
      <h2>Person List</h2>
      <ul>
        {people.map((person) => (
          <li key={person._id}>
            <Link to={`/person/${person._id}`}>{person.name}</Link>
          </li>
        ))}
      </ul>
      <div className="add-person-container">
        <button className="add-person" onClick={handleAddPersonClick}>Add Person</button>
      </div>
    </div>
  );
};

export default PersonList;
