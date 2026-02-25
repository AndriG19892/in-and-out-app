import React from 'react';
import {Navigate} from 'react-router-dom';
import {useUser} from '../hooks/useUser.js'

const ProtectedRoute = ({ children }) => {
    const {user, loading} = useUser();

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1a3c4a',
                color: 'white'
            }}>
                Caricamento...
            </div>
        );
    }
    if(!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRoute;