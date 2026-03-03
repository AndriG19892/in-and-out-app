import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser.js';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();
    const token = localStorage.getItem('token');

    // Se c'è un token, non bloccare l'utente sulla schermata blu!
    // Lo facciamo entrare, i componenti interni (Dashboard) 
    // gestiranno il loro caricamento specifico.
    if (token) {
        return children;
    }

    // Se non c'è token e abbiamo finito di caricare, allora login
    if (!loading && !user && !token) {
        return <Navigate to="/login" replace />;
    }

    // Schermata di fallback solo se proprio non sappiamo chi è l'utente
    if (loading && !token) {
        return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Caricamento...</div>;
    }

    return children;
};

export default ProtectedRoute;
