import React from 'react';
import {Loader2, AlertCircle, CheckCircle2, X, HelpCircle} from "lucide-react";

const StatusFeedback = ( {loading, message, type, onClose, onConfirm} ) => { // Aggiunto onConfirm
    if ( !loading && !message ) return null;

    const isConfirm = type === 'confirm';

    return (
        <div style={ styles.overlay }> {/* Overlay sempre presente per bloccare lo sfondo */ }
            {/* OVERLAY DI CARICAMENTO */ }
            { loading && (
                <div style={ styles.loaderContainer }>
                    <Loader2 size={ 48 } className="animate-spin" color="#4ade80"/>
                    <p style={ styles.loaderText }>{ message || "Caricamento..." }</p>
                </div>
            ) }

            {/* BANNER O BOX DI CONFERMA */ }
            { message && !loading && (
                <div style={ {...styles.messageBox, ...styles[type], position: isConfirm ? 'relative' : 'fixed'} }>
                    <div style={ styles.iconContainer }>
                        { type === 'error' && <AlertCircle size={ 20 }/> }
                        { type === 'success' && <CheckCircle2 size={ 20 }/> }
                        { type === 'confirm' && <HelpCircle size={ 22 }/> }
                    </div>

                    <div style={ styles.textContainer }>
                        <span style={ {display: 'block', marginBottom: isConfirm ? '15px' : '0'} }>{ message }</span>

                        {/* PULSANTI AGGIUNTI SOLO PER IL TIPO CONFIRM */ }
                        { isConfirm && (
                            <div style={ {display: 'flex', gap: '10px'} }>
                                <button onClick={ onClose } style={ styles.btnCancel }>Annulla</button>
                                <button onClick={ onConfirm } style={ styles.btnDelete }>Elimina</button>
                            </div>
                        ) }
                    </div>

                    { !isConfirm && onClose && (
                        <button onClick={ onClose } style={ styles.closeBtn }><X size={ 18 }/></button>
                    ) }
                </div>
            ) }
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0, // Aggiunto per coprire tutto l'asse X
        bottom: 0, // Aggiunto per coprire tutto l'asse Y
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.4)', // Scuriamo un po' di più per vedere se appare
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999, // Un numero esagerato per stare sopra a tutto
    },
    loaderContainer: {textAlign: 'center'},
    loaderText: {
        marginTop: '15px', color: '#1e3a3a',
        fontWeight: '800', fontSize: '1.1rem',
        fontFamily: '"Nunito", sans-serif'
    },
    messageBox: {
        width: '90%', maxWidth: '400px', padding: '20px', borderRadius: '18px',
        display: 'flex', alignItems: 'center', zIndex: 10000,
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        fontFamily: '"Nunito", sans-serif',
    },
    iconContainer: {marginRight: '12px', display: 'flex', alignItems: 'center'},
    textContainer: {flex: 1, fontSize: '0.9rem', fontWeight: '700'},
    error: {background: '#f8d7da', color: '#a4161a', border: '1px solid #f5c2c7'},
    success: {background: '#d8f3dc', color: '#2d6a4f', border: '1px solid #b7e4c7'},
    confirm: {background: '#ffffff', color: '#1e3a3a', border: '1px solid #e2e8f0', flexDirection: 'column'},
    closeBtn: {background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex'},
    // Nuovi stili minimi per i bottoni
    btnCancel: {
        flex: 1,
        padding: '10px',
        borderRadius: '12px',
        border: 'none',
        background: '#f1f5f9',
        color: '#64748b',
        fontWeight: '700',
        cursor: 'pointer'
    },
    btnDelete: {
        flex: 1,
        padding: '10px',
        borderRadius: '12px',
        border: 'none',
        background: '#a4161a',
        color: '#ffffff',
        fontWeight: '700',
        cursor: 'pointer'
    }
};

export default StatusFeedback;