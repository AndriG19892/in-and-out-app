import React from 'react';
import BottomNav from "../components/BottomNav.jsx";

const MainLayout = ({ children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff'
        }}>
            {/* Qui verranno renderizzate le tue pagine (Dashboard, Stats, etc.) */}
            <main style={{ flex: 1 }}>
                {children}
            </main>

            {/* La navigazione è fissa qui, una volta per tutte */}
            <BottomNav />
        </div>
    );
};

export default MainLayout;