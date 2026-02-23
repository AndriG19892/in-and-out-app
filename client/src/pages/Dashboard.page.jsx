import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardPage = () => {
    const [balance, setBalance] = useState({ entrate: 0, uscite: 0, totale: 0 });
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/transactions/balance/${userId}`);
                setBalance(res.data.data);
                console.log (res.data)
            } catch (error) {
                console.error("Errore nel recupero del bilancio", error);
            }
        };
        if (userId) fetchBalance();
    }, [userId]);

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'radial-gradient(circle at center, #244a5a 0%, #0f2027 100%)',
            color: 'white',
            // --- TIPOGRAFIA GEOMETRICA ---
            fontFamily: '"Inter", sans-serif',
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box'
        },
        headerTitle: {
            fontSize: '1.2rem',
            fontWeight: '500',
            marginBottom: '40px',
            letterSpacing: '0.02em',
            opacity: 0.9
        },
        card: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            borderRadius: '45px',
            padding: '50px 30px',
            width: '100%',
            maxWidth: '420px',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
            textAlign: 'center',
            boxSizing: 'border-box'
        },
        mainAmount: {
            fontSize: '3.6rem',
            fontWeight: '700', // Spessore come nell'immagine
            color: '#5eead4',
            textShadow: '0 0 25px rgba(94, 234, 212, 0.3)',
            margin: '15px 0',
            letterSpacing: '-0.04em' // Lettere più vicine come nei font premium
        },
        innerBox: {
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '35px',
            padding: '25px',
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            border: '1px solid rgba(255, 255, 255, 0.03)',
        },
        divider: {
            width: '1px',
            height: '35px',
            background: 'rgba(255, 255, 255, 0.08)'
        },
        statLabel: {
            fontSize: '0.8rem',
            fontWeight: '400',
            opacity: 0.5,
            marginBottom: '6px',
            letterSpacing: '0.02em'
        },
        statValue: {
            fontSize: '1.45rem',
            fontWeight: '600',
            letterSpacing: '-0.02em'
        },
        btnContainer: {
            display: 'flex',
            gap: '35px',
            marginTop: '60px'
        },
        circleBtnPlus: {
            width: '115px',
            height: '115px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #82e9b8 0%, #5eead4 100%)',
            border: 'none',
            boxShadow: '0 15px 30px rgba(94, 234, 212, 0.3)',
            color: '#1a3c4a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out'
        },
        circleBtnMinus: {
            width: '115px',
            height: '115px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
        },
        iconText: {
            fontSize: '0.8rem',
            fontWeight: '600',
            marginTop: '4px'
        },
        bottomNav: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'rgba(15, 32, 39, 0.8)', // Trasparenza scura per far risaltare il vetro
            backdropFilter: 'blur(20px)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0 10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 1000
        },
        navItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textDecoration: 'none',
            opacity: 0.6,
            gap: '4px',
            cursor: 'pointer',
            flex: 1
        },
        navText: {
            fontSize: '10px',
            fontWeight: '500',
            fontFamily: '"Inter", sans-serif'
        },
        centerButtonContainer: {
            position: 'relative',
            top: '-5px', // Leggermente rialzato come in foto
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1
        },
        centerCircle: {
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            border: '3px solid #32e0a1', // Il cerchio verde neon della foto
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(50, 224, 161, 0.3)'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.headerTitle}>Saldo Contabile</h1>

            <div style={styles.card}>
                <div style={styles.mainAmount}>
                    € {balance.totale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </div>

                <div style={styles.innerBox}>
                    <div>
                        <p style={styles.statLabel}>Entrate</p>
                        <p style={{ ...styles.statValue, color: '#4ade80' }}>
                            € {balance.entrate.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    <div style={styles.divider}></div>

                    <div>
                        <p style={styles.statLabel}>Uscite</p>
                        {/* Colore teal/petrolio chiaro come l'immagine gen AI */}
                        <p style={{ ...styles.statValue, color: '#2dd4bf' }}>
                            - {balance.uscite.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </div>

            <div style={styles.btnContainer}>
                <button
                    style={styles.circleBtnPlus}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <span style={{fontSize: '2.5rem', fontWeight: '300'}}>+</span>
                    <span style={styles.iconText}>Entrata</span>
                </button>

                <button
                    style={styles.circleBtnMinus}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <span style={{fontSize: '2.5rem', fontWeight: '300'}}>−</span>
                    <span style={styles.iconText}>Uscita</span>
                </button>
            </div>
            {/* Bottom Navigation Bar */}
            <nav style={styles.bottomNav}>
                {/* Home */}
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </div>

                {/* Statistica */}
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span style={styles.navText}>Statistica</span>
                </div>

                {/* Pulsante Centrale (Attivo) */}
                <div style={styles.centerButtonContainer}>
                    <div style={styles.centerCircle}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32e0a1" strokeWidth="2.5">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                    </div>
                </div>

                {/* Cronistoria */}
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span style={styles.navText}>Cronistoria</span>
                </div>

                {/* Profilo */}
                <div style={styles.navItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span style={styles.navText}>Profilo</span>
                </div>
            </nav>
        </div>
    );
};

export default DashboardPage;