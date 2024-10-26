// src/Components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;