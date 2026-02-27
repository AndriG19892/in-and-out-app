import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser.js';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();
    const token = localStorage.getItem('token');

    // Se stiamo ancora verificando (loading è true), fermati qui!
    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Riconnessione...</div>;
    }

    // Se il caricamento è FINITO (loading è false) e non abbiamo l'utente 
    // E non c'è nemmeno un token residuo, allora vai al login.
    if (!user && !token) {
        return <Navigate to="/login" replace />;
    }

    // Se abbiamo l'utente o almeno il token, mostriamo i figli (Dashboard)
    return children;
};

export default ProtectedRoute;
