import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser.js';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();
    const location = useLocation();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // 1. Finché il Context sta facendo il check iniziale (api.get('/auth/me')), ASPETTIAMO.
    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Verifica sessione...</div>;
    }

    // 2. LOGICA DI ACCESSO:
    // Entri se hai l'utente NEL CONTEXT (già verificato) 
    // OPPURE se hai ancora i dati sul disco (sessione da ripristinare)
    const isAuthenticated = user || (token && userId);

    if (!isAuthenticated) {
        // Se non ho né l'uno né l'altro, allora sei davvero un ospite: vai al login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Se arriviamo qui, l'utente è autenticato o lo sarà a breve
    return children;
};

export default ProtectedRoute;
