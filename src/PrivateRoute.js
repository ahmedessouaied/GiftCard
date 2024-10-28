import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ element }) => {
    const auth = getAuth(); // Initialize Firebase auth
    const user = auth.currentUser; // Get the current user

    return user ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
