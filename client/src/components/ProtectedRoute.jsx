import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser.js';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();
    const location = useLocation();

    // LEGGIAMO DIRETTAMENTE DAL DISCO AD OGNI RENDER
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Verifica...</div>;
    }

    // PROTEZIONE DOPPIA:
    // Se non c'è il token O non c'è l'utente nel context, lo buttiamo fuori.
    // Nota: Se hai appena ricaricato la pagina, user potrebbe essere null per un attimo,
    // ma il token ci sarebbe. Quindi usiamo una logica più stringente:
    if (!token || !userId) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Se il caricamento è finito e non abbiamo l'utente (e il token è sparito)
    if (!loading && !user && !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;