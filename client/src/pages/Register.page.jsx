import React, { useState } from 'react';
import api from "../api/axiosConfig.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Per reindirizzare
import { User, Mail, Lock, ArrowRight, Wallet } from 'lucide-react'; // Icone

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Assicurati che il tuo backend abbia un endpoint /api/auth/register
            const res = await api.post("/auth/register",{nome, email, password});

            if (res.data.success) {
                alert("Registrazione avvenuta con successo! Effettua il login.");
                navigate('/login'); // Reindirizza al login dopo la registrazione
            }
        } catch (err) {
            console.error("Errore registrazione:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Errore durante la registrazione.");
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #dcfce7 0%, #ffffff 40%)',
            fontFamily: '"Nunito", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
        },
        headerBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '220px',
            background: '#caf1dd',
            borderBottomLeftRadius: '80px',
            borderBottomRightRadius: '80px',
            zIndex: 0
        },
        logoWrapper: {
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '30px'
        },
        logoIcon: {
            width: '80px',
            height: '80px',
            borderRadius: '22px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
            color: '#1e3a3a',
            boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
        },
        headerTitle: {
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#1e3a3a',
            margin: 0,
            letterSpacing: '1px',
            textTransform: 'uppercase'
        },
        card: {
            background: '#ffffff',
            borderRadius: '35px',
            padding: '40px 25px',
            width: '85%',
            maxWidth: '400px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            textAlign: 'center',
            zIndex: 1
        },
        inputWrapper: {
            position: 'relative',
            marginBottom: '15px',
        },
        icon: {
            position: 'absolute',
            left: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8'
        },
        input: {
            width: '100%',
            padding: '16px 16px 16px 52px',
            backgroundColor: '#f1f5f9',
            border: '2px solid transparent',
            borderRadius: '24px',
            color: '#1e3a3a',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: '"Nunito", sans-serif',
            transition: 'all 0.3s ease',
        },
        button: {
            width: '100%',
            padding: '18px',
            marginTop: '15px',
            backgroundColor: '#1e3a3a',
            border: 'none',
            borderRadius: '24px',
            color: '#ffffff',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.2s ease',
        },
        link: {
            marginTop: '20px',
            fontSize: '0.85rem',
            color: '#64748b',
            display: 'block',
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerBackground}></div>

            <div style={styles.logoWrapper}>
                <div style={styles.logoIcon}>
                    <Wallet size={40} />
                </div>
                <h1 style={styles.headerTitle}>In&Out</h1>
            </div>

            <div style={styles.card}>
                <h2 style={{margin: '0 0 10px 0', color: '#1e3a3a', fontWeight: 800}}>Crea un account</h2>
                <p style={{margin: '0 0 30px 0', color: '#64748b', fontSize: '0.9rem'}}>Inizia a gestire le tue finanze oggi stesso</p>

                <form onSubmit={handleRegister}>
                    <div style={styles.inputWrapper}>
                        <User size={18} style={styles.icon} />
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#4ade80'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                            required
                        />
                    </div>

                    <div style={styles.inputWrapper}>
                        <Mail size={18} style={styles.icon} />
                        <input
                            type="email"
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#4ade80'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                            required
                        />
                    </div>

                    <div style={styles.inputWrapper}>
                        <Lock size={18} style={styles.icon} />
                        <input
                            type="password"
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#4ade80'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        Registrati <ArrowRight size={20} />
                    </button>
                </form>

                <span style={styles.link}>Hai già un account? <b style={{color: '#4ade80', cursor: 'pointer'}} onClick={() => navigate('/login')}>Accedi</b></span>
            </div>
        </div>
    );
};

export default RegisterPage;
