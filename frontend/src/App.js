// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home'; // Import the Home component
import CallPage from './Components/Call';
import PersonList from './Components/PersonList';
import PersonProfile from './Components/PersonProfile';
import PersonForm from './Components/PersonForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /> {/* Home route after login */}
        <Route path="/call" element={<CallPage />} />
        <Route path="/person" element={<PersonList />} />
        <Route path="/person/:id" element={<PersonProfile />} />
        <Route path="/person/add" element={<PersonForm isEditing={false} />} />
        <Route path="/person/edit/:id" element={<PersonForm isEditing={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
