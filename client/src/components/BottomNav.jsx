import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, List, Activity, User } from 'lucide-react';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Funzione per capire se il tasto è attivo
    const isActive = (path) => location.pathname === path;

    const styles = {
        nav: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: '60px',
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTop: '1px solid #f1f5f9',
            zIndex: 1000,
            boxShadow: '0 -5px 20px rgba(0,0,0,0.02)'
        },
        navItem: (active) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: active ? '#4ade80' : '#cbd5e1',
            transition: 'all 0.3s ease',
            gap: '4px'
        }),
        label: (active) => ({
            fontSize: '0.65rem',
            fontWeight: '700',
            color: active ? '#4ade80' : '#cbd5e1',
        })
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.navItem(isActive('/dashboard'))} onClick={() => navigate('/dashboard')}>
                <Home size={26} strokeWidth={isActive('/dashboard') ? 2.5 : 2} />
                <span style={styles.label(isActive('/dashboard'))}>Home</span>
            </div>

            <div style={styles.navItem(isActive('/transactions'))} onClick={() => navigate('/transactions')}>
                <List size={26} strokeWidth={isActive('/transactions') ? 2.5 : 2} />
                <span style={styles.label(isActive('/transactions'))}>Lista</span>
            </div>

            <div style={styles.navItem(isActive('/stats'))} onClick={() => navigate('/stats')}>
                <Activity size={26} strokeWidth={isActive('/stats') ? 2.5 : 2} />
                <span style={styles.label(isActive('/stats'))}>Analisi</span>
            </div>

            <div style={styles.navItem(isActive('/profile'))} onClick={() => navigate('/profile')}>
                <User size={26} strokeWidth={isActive('/profile') ? 2.5 : 2} />
                <span style={styles.label(isActive('/profile'))}>Profilo</span>
            </div>
        </nav>
    );
};

export default BottomNav;