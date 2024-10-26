// src/Components/PersonForm.js
import React, { useState, useEffect } from 'react';
import './PersonForm.css'; // Import the CSS file
import { useParams, useNavigate } from 'react-router-dom';

const PersonForm = ({ isEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      setLoading(true);
      fetch(`http://localhost:3000/api/person/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch person details');
          }
          return res.json();
        })
        .then((data) => {
          setPerson(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching person:", error);
          setError("Failed to fetch person details.");
          setLoading(false);
        });
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(isEditing ? `http://localhost:3000/api/person/${id}` : 'http://localhost:3000/api/person', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
      });

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update person' : 'Failed to create person');
      }

      setSuccess(`Person ${isEditing ? 'updated' : 'created'} successfully!`);
      setTimeout(() => {
        navigate('/person');
      }, 4000); 
    } catch (error) {
      console.error("Error creating or updating person:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  };

  return (
    <div className="person-form-container">
      <h2>{isEditing ? 'Edit Person' : 'Add Person'}</h2>
      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success} Redirecting...</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={person.name}
            onChange={handleChange}
            required
            className={person.name ? "filled" : ""}
          />
        </div>
        <div className="input-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            maxLength="13"
            value={person.phone}
            onChange={handleChange}
            required
            className={person.phone ? "filled" : ""}
          />
        </div>
        <button type="submit" className="person-button" disabled={loading}>
          {loading ? 'Submitting...' : (isEditing ? 'Update' : 'Create')}
        </button>
      </form>
    </div>
  );
};

export default PersonForm;
