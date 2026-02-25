import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, ArrowDown, ArrowUp, Home, List, Activity, User, Calendar } from 'lucide-react';
import BottomNav from "../components/BottomNav.jsx";
import axios from "axios";

const DashboardPage = () => {
    const [balance, setBalance] = useState({ entrate: 0, uscite: 0, totale: 0 });
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
        try {
            // Recupero Bilancio
            const resBalance = await axios.get(`http://localhost:5000/api/transactions/balance/${userId}`);
            setBalance(resBalance.data.data);

            // Recupero Lista Transazioni (usando il tuo endpoint)
            const resList = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
            console.log (resList);
            // Prendiamo le ultime 4 per mantenere pulito il design
            setTransactions(resList.data.data.slice(0, 4));
        } catch (error) {
            console.error("Errore nel recupero dati", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId]);

    const totalCashFlow = balance.entrate + balance.uscite;
    const incomePercentage = totalCashFlow > 0 ? (balance.entrate / totalCashFlow) * 100 : 0;

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #dcfce7 0%, #ffffff 40%)',
            fontFamily: '"Nunito", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingTop: '20px',
            paddingBottom: '100px', // Spazio per la navigazione
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
            marginBottom: '20px'
        },
        logoImage: {
            width: '80px',
            height: '80px',
            borderRadius: '22px',
            marginBottom: '10px',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            objectFit: 'cover'
        },
        headerTitle: {
            fontSize: '1.2rem',
            fontWeight: '800',
            color: '#1e3a3a',
            margin: 0,
            letterSpacing: '1px',
            textTransform: 'uppercase'
        },
        card: {
            background: '#ffffff',
            borderRadius: '35px',
            padding: '25px 20px',
            width: '85%',
            maxWidth: '400px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            textAlign: 'center',
            marginBottom: '35px',
            zIndex: 1
        },
        saldoLabel: {
            fontWeight: '600',
            fontSize: '1rem',
            color: '#64748b',
            margin: '0 0 5px 0'
        },
        mainAmount: {
            fontSize: '2.8rem',
            fontWeight: '800',
            color: '#1e3a3a',
            letterSpacing: '-0.02em',
        },
        btnContainer: {
            display: 'flex',
            gap: '20px',
            marginBottom: '35px',
            zIndex: 1
        },
        actionBtn: (type) => ({
            width: '135px',
            height: '135px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: type === 'in' ? '#d8f3dc' : '#f8d7da',
            color: '#1e3a3a',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease'
        }),
        statsSection: {
            width: '85%',
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
            padding: '0 15px',
            zIndex: 1
        },
        progressBarContainer: {
            width: '85%',
            maxWidth: '400px',
            height: '14px', // Più sottile per lasciare spazio alla lista
            background: '#f1f5f9',
            borderRadius: '32px',
            overflow: 'hidden',
            marginBottom: '30px',
            zIndex: 1,
        },
        progressBarFill: {
            height: '100%',
            background: '#4ade80',
            borderRadius: '32px',
            transition: 'width 0.8s ease'
        },
        historySection: {
            width: '85%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            flex: 1, // Prende lo spazio rimanente
            minHeight: 0, // Necessario per far funzionare lo scroll interno in flexbox
        },
        scrollContainer: {
            maxHeight: '200px', // Altezza fissa per lo scroll
            overflowY: 'auto',
            paddingRight: '5px', // Spazio per non coprire il contenuto con la scrollbar
            scrollbarWidth: 'none', // Nasconde scrollbar su Firefox
            msOverflowStyle: 'none', // Nasconde scrollbar su IE/Edge
        },
        historyHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
        },
        transactionItem: {
            background: '#ffffff',
            borderRadius: '24px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        },
        iconCircle: (isIn) => ({
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: isIn ? '#d8f3dc' : '#f8d7da',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
        }),
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerBackground}></div>

            <div style={styles.logoWrapper}>
                <img src="/logo.png" alt="Logo" style={styles.logoImage} />
            </div>

            <div style={styles.card}>
                <p style={styles.saldoLabel}>Saldo Attuale</p>
                <div style={styles.mainAmount}>
                    € {balance.totale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </div>
            </div>

            <div style={styles.btnContainer}>
                <button style={styles.actionBtn('in')} onClick={() => navigate('/transaction/IN')}>
                    <Wallet size={32} />
                    <span style={{fontWeight: 700, marginTop: '5px'}}>+ Entrate</span>
                </button>
                <button style={styles.actionBtn('out')} onClick={() => navigate('/transaction/OUT')}>
                    <Wallet size={32} />
                    <span style={{fontWeight: 700, marginTop: '5px'}}>- Uscite</span>
                </button>
            </div>

            <div style={styles.statsSection}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span style={{fontSize: '0.7rem', color: '#64748b', fontWeight: 800}}>ENTRATE</span>
                    <span style={{fontWeight: 800, color: '#1e3a3a'}}>€ {balance.entrate.toLocaleString('it-IT')}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <span style={{fontSize: '0.7rem', color: '#64748b', fontWeight: 800}}>USCITE</span>
                    <span style={{fontWeight: 800, color: '#1e3a3a'}}>€ {balance.uscite.toLocaleString('it-IT')}</span>
                </div>
            </div>

            <div style={styles.progressBarContainer}>
                <div style={{ ...styles.progressBarFill, width: `${incomePercentage}%` }}></div>
            </div>

            <div style={ styles.historySection }>
                <div style={ styles.historyHeader }>
                    <span style={ {fontWeight: 800, color: '#1e3a3a'} }>Attività Recenti</span>
                    <span style={ {fontSize: '0.8rem', color: '#4ade80', fontWeight: 700, cursor: 'pointer'} }>Vedi tutto</span>
                </div>

                <div style={ styles.scrollContainer } className="scroll-container">
                    { transactions.length > 0 ? (
                        transactions.map ( ( t ) => {
                            const isIn = t.type === 'IN';
                            return (
                                <div key={ t._id } style={ styles.transactionItem }>
                                    <div style={ styles.iconCircle ( isIn ) }>
                                        { isIn ? <ArrowDown size={ 18 } color="#2d6a4f"/> :
                                            <ArrowUp size={ 18 } color="#a4161a"/> }
                                    </div>
                                    <div style={ {flex: 1} }>
                                        <div style={ {
                                            fontWeight: 700,
                                            color: '#1e3a3a',
                                            fontSize: '0.9rem'
                                        } }>{ t.category }</div>
                                        <div style={ {
                                            fontSize: '0.7rem',
                                            color: '#94a3b8',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        } }>
                                            <Calendar
                                                size={ 10 }/> { new Date ( t.date ).toLocaleDateString ( 'it-IT' ) }
                                        </div>
                                    </div>
                                    <div style={ {fontWeight: 800, color: isIn ? '#2d6a4f' : '#a4161a'} }>
                                        { isIn ? '+' : '-' } €{ t.amount.toLocaleString ( 'it-IT', {minimumFractionDigits: 2} ) }
                                    </div>
                                </div>
                            );
                        } )
                    ) : (
                        <div style={ {textAlign: 'center', color: '#94a3b8', padding: '20px'} }>
                            Nessun movimento trovato
                        </div>
                    ) }
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default DashboardPage;