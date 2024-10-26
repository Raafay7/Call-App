import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PersonProfile.css'; // Import the CSS file

const PersonProfile = () => {
  const { id } = useParams(); // Get person ID from URL params
  const navigate = useNavigate(); // Hook for navigation
  const [person, setPerson] = useState({ name: '', phone: '' });

  // Fetch the person's details when the component loads
  useEffect(() => {
    fetch(`http://localhost:3000/api/person/${id}`)
      .then((res) => res.json())
      .then((data) => setPerson(data))
      .catch((error) => console.error("Error fetching person:", error));
  }, [id]);

  // Function to handle the deletion of a person
  const deletePerson = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this person?");
    if (confirmDelete) {
      await fetch(`http://localhost:3000/api/person/${id}`, { method: 'DELETE' });
      navigate('/person'); // Navigate back to the person list after deletion
    }
  };

  return (
    <div className="profile-container">
      <h2>Person Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {person.name}</p>
        <p><strong>Phone:</strong> {person.phone}</p>
      </div>
      <div className="button-group">
        <button className="edit-button" onClick={() => navigate(`/person/edit/${id}`)}>Edit</button>
        <button className="delete-button" onClick={deletePerson}>Delete</button>
      </div>
      <button className="back-button" onClick={() => navigate('/person')}>Back to Person List</button>
    </div>
  );
};

export default PersonProfile;
