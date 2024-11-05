// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, requiredRole, ...rest }) => {
    const { user } = useAuth(); 
    const isAuthenticated = user && user?.name;
    // const hasRequiredRole = requiredRole ? user.roles.includes(requiredRole) : true;

    return isAuthenticated ? (
        element
    ) : (
        <Navigate to={isAuthenticated ? '/unauthorized' : '/'} />
    );
};

export default ProtectedRoute;
