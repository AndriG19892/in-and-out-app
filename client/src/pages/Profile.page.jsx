import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Shield, Bell, ChevronRight } from 'lucide-react';
import {useUser} from "../hooks/useUser.js";

const ProfilePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail") || "utente@esempio.it";

    const handleLogout = () => {
        // Pulizia completa del browser
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");

        // Redirect al login
        navigate("/login");
    };

    const styles = {
        container: {
            padding: '40px 20px',
            fontFamily: '"Nunito", sans-serif',
            color: '#1e3a3a'
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px'
        },
        avatar: {
            width: '100px',
            height: '100px',
            borderRadius: '35px',
            backgroundColor: '#caf1dd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px auto',
            color: '#2d6a4f'
        },
        menuItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            background: '#f8fafc',
            borderRadius: '20px',
            marginBottom: '15px',
            cursor: 'pointer'
        },
        logoutBtn: {
            marginTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '18px',
            width: '100%',
            borderRadius: '20px',
            border: '2px solid #fee2e2',
            backgroundColor: '#fef2f2',
            color: '#ef4444',
            fontWeight: '800',
            cursor: 'pointer',
            transition: 'all 0.2s'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.avatar}>
                    <User size={50} />
                </div>
                <h2 style={{margin: 0}}>{user?.nome}</h2>
                <p style={{color: '#64748b', fontSize: '0.9rem'}}>{user?.email}</p>
            </div>

            <button
                style={styles.logoutBtn}
                onClick={handleLogout}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
            >
                <LogOut size={20} />
                Esci dall'account
            </button>
        </div>
    );
};

export default ProfilePage;