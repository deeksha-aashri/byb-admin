import React from 'react';
import { Navigate } from 'react-router-dom';

// Example authentication check function
const isAuthenticated = () => {
  return localStorage.getItem('adminToken') !== null;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
