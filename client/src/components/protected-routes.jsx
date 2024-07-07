import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin, adminOnly }) => {
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
