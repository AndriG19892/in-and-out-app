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
            } catch (error) {
                console.error("Errore nel recupero del bilancio", error);
            }
        };
        if (userId) fetchBalance();
    }, [userId]);

    // Calcolo percentuale per la barra di progressione
    const totalCashFlow = balance.entrate + balance.uscite;
    const incomePercentage = totalCashFlow > 0 ? (balance.entrate / totalCashFlow) * 100 : 0;

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #dcfce7 0%, #ffffff 40%)', // Sfondo sfumato verde menta chiaro
            fontFamily: '"Nunito", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingTop: '20px'
        },
        headerTitle: {
            fontSize: '1.4rem',
            fontWeight: '600',
            color: '#1e3a3a',
            marginBottom: '30px',
        },
        card: {
            background: '#ffffff',
            borderRadius: '35px',
            padding: '40px 20px',
            width: '85%',
            maxWidth: '400px',
            boxShadow: '#00000030 0px 20px 40px', // Ombra molto morbida
            textAlign: 'center',
            marginBottom: '40px',
            zIndex: '1'
        },
        saldoLabel: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: '600',
            fontSize: '1rem',
            color: '#1e3a3a',
        },
        mainAmount: {
            fontSize: '2.8rem',
            fontWeight: '700', // Per farlo bello pieno come in foto
            color: '#1e3a3a', // Grigio antracite molto scuro
            letterSpacing: '-0.02em',
        },
        btnContainer: {
            display: 'flex',
            gap: '20px',
            marginBottom: '40px'
        },
        actionBtn: (type) => ({
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
            transition: 'transform 0.2s',
            background: type === 'in' ? '#bee6d3' : '#f79d92', // Verde chiaro e Rosso chiaro
            color: '#1e3a3a',
            boxShadow: '0 10px 20px rgba(0,0,0,0.03)'
        }),
        iconWrapper: {
            width: '45px',
            marginBottom: '10px'
        },
        statsSection: {
            width: '85%',
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '0 10px'
        },
        statInfo: {
            display: 'flex',
            flexDirection: 'column',
        },
        progressBarContainer: {
            width: '85%',
            maxWidth: '400px',
            height: '52px',
            background: '#f1f5f9',
            borderRadius: '32px',
            overflow: 'hidden',
            marginBottom: '80px'
        },
        // IL DIV VERDE CHE CERCAVI:
        headerBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '257px', // Altezza della zona verde
            background: '#caf1dd', // Verde menta chiarissimo dell'immagine
            borderBottomLeftRadius: '80px', // Arrotondamento accentuato
            borderBottomRightRadius: '80px',
            zIndex: 0
        },
        progressBarFill: {
            height: '100%',
            background: '#a7f3d0', // Colore della barra nell'immagine
            borderRadius: '32px',
            transition: 'width 0.5s ease-out'
        },
        bottomNav: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: '70px',
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTop: '1px solid #f1f5f9'
        }
    };

    return (
        <div style={ styles.container }>
            <div style={ styles.headerBackground }></div>
            <h1 style={ styles.headerTitle }>In&Out</h1>
            <div style={ styles.card }>
                <p style={ styles.saldoLabel }>Saldo Attuale</p>
                <div style={ styles.mainAmount }>
                    € { balance.totale.toLocaleString ( 'it-IT', {minimumFractionDigits: 2} ) }
                </div>
            </div>

            <div style={ styles.btnContainer }>
                {/* Tasto Entrate */ }
                <button style={ styles.actionBtn ( 'in' ) }>
                    <div style={ styles.iconWrapper }>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#1e3a3a" strokeWidth="1.5">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                            <polyline points="17 21 17 13 7 13 7 21"/>
                            <polyline points="7 3 7 8 15 8"/>
                            <path d="M12 18v-5m0 0l-3 3m3-3l3 3"/>
                        </svg>
                    </div>
                    + Entrate
                </button>

                {/* Tasto Uscite */ }
                <button style={ styles.actionBtn ( 'out' ) }>
                    <div style={ styles.iconWrapper }>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#1e3a3a" strokeWidth="1.5">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                            <polyline points="17 21 17 13 7 13 7 21"/>
                            <polyline points="7 3 7 8 15 8"/>
                            <path d="M12 13v5m0 0l-3-3m3 3l3-3"/>
                        </svg>
                    </div>
                    - Uscite
                </button>
            </div>

            <div style={ styles.statsSection }>
                <div style={ styles.statInfo }>
                    <span style={ {fontSize: '0.8rem', color: '#64748b'} }>Entrate</span>
                    <span style={ {fontWeight: '700'} }>€ { balance.entrate.toLocaleString ( 'it-IT' ) }</span>
                </div>
                <div style={ {...styles.statInfo, alignItems: 'flex-end'} }>
                    <span style={ {fontSize: '0.8rem', color: '#64748b'} }>Uscite</span>
                    <span style={ {fontWeight: '700'} }>€ { balance.uscite.toLocaleString ( 'it-IT' ) }</span>
                </div>
            </div>

            {/* Barra di progressione dinamica */ }
            <div style={ styles.progressBarContainer }>
                <div style={ {...styles.progressBarFill, width: `${ incomePercentage }%`} }></div>
            </div>

            {/* Bottom Nav Semplificata */ }
            <nav style={ styles.bottomNav }>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            </nav>
        </div>
    );
};

export default DashboardPage;