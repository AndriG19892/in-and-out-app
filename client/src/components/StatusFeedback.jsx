import React from 'react';
import {Loader2, AlertCircle, CheckCircle2} from "lucide-react";

const StatusFeedback = ( {loading, message, type, onClose} ) => {
    //se non c'è ne caricamento ne messaggio non renderizza nulla:

    if ( !loading && !message ) return null;

    return (
        <>
            {/* OVERLAY DI CARICAMENTO (Blocca tutto lo schermo) */ }
            { loading && (
                <div style={ styles.overlay }>
                    <div style={ styles.loaderContainer }>
                        <Loader2 size={ 48 } className="animate-spin" color="#4ade80"/>
                        <p style={ styles.loaderText }>{message}</p>
                    </div>
                </div>
            ) }

            {/* BANNER DEL MESSAGGIO (Errore o Successo) */ }
            { message && (
                <div style={ {...styles.messageBox, ...styles[type]} }>
                    { type === 'error' ? <AlertCircle size={ 20 }/> : <CheckCircle2 size={ 20 }/> }
                    <span style={ {flex: 1} }>{ message }</span>
                    { onClose && (
                        <button onClick={ onClose } style={ styles.closeBtn }>×</button>
                    ) }
                </div>
            ) }
        </>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(248, 250, 252, 0.7)', // Colore #f8fafc con trasparenza
        backdropFilter: 'blur(5px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 9999,
    },
    loaderContainer: {textAlign: 'center'},
    loaderText: {
        marginTop: '15px', color: '#1e3a3a',
        fontWeight: '800', fontSize: '1.1rem',
        fontFamily: '"Nunito", sans-serif'
    },
    messageBox: {
        position: 'fixed', top: '30px', left: '50%', transform: 'translateX(-50%)',
        width: '90%', maxWidth: '400px', padding: '16px', borderRadius: '18px',
        display: 'flex', alignItems: 'center', zIndex: 10000,
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        fontFamily: '"Nunito", sans-serif', animation: 'slideDown 0.4s ease-out',
    },
    iconContainer: {marginRight: '12px', display: 'flex', alignItems: 'center'},
    textContainer: {flex: 1, fontSize: '0.9rem', fontWeight: '700'},
    error: {background: '#f8d7da', color: '#a4161a', border: '1px solid #f5c2c7'},
    success: {background: '#d8f3dc', color: '#2d6a4f', border: '1px solid #b7e4c7'},
    closeBtn: {
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'inherit', display: 'flex', padding: '4px', opacity: 0.7
    }
};

export default StatusFeedback;