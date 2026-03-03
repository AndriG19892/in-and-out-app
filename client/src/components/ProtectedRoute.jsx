import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser.js';

const ProtectedRoute = ({ children }) => {
const token = localStorage.getItem('token');

    // Se non c'è il token nel browser, vai al login istantaneamente
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Se c'è il token, entra pure. Se poi il token è scaduto, 
    // ci penserà il logout automatico del Context a buttarti fuori dopo.
    return children;
};

export default ProtectedRoute;
