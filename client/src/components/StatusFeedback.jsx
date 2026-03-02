import React from 'react';
import {Loader2, AlertCircle, CheckCircle2, X, HelpCircle} from "lucide-react";

const StatusFeedback = ( {loading, message, type, onClose, onConfirm} ) => {
    // Se non c'è nulla da mostrare, non renderizzare nemmeno l'overlay
    if ( !loading && !message ) return null;

    const isConfirm = type === 'confirm';

    // Determina il testo del pulsante d'azione
    const confirmLabel = message?.toLowerCase().includes("aggiorna") ? "Aggiorna" : "Elimina";

    return (
        <div style={ styles.overlay }>
            {/* OVERLAY DI CARICAMENTO */}
            { loading && (
                <div style={ styles.loaderContainer }>
                    <Loader2 size={ 48 } className="animate-spin" color="#4ade80"/>
                    <p style={ styles.loaderText }>{ message || "Caricamento..." }</p>
                </div>
            ) }

            {/* BOX DI MESSAGGIO / CONFERMA */}
            { message && !loading && (
                <div style={ {
                    ...styles.messageBox, 
                    ...styles[type], 
                    // Forza il layout colonna se è un confirm, altrimenti riga
                    flexDirection: isConfirm ? 'column' : 'row',
                    alignItems: isConfirm ? 'center' : 'center',
                    textAlign: isConfirm ? 'center' : 'left'
                } }>
                    <div style={ {
                        ...styles.iconContainer, 
                        marginBottom: isConfirm ? '15px' : '0',
                        marginRight: isConfirm ? '0' : '12px'
                    } }>
                        { type === 'error' && <AlertCircle size={ 24 }/> }
                        { type === 'success' && <CheckCircle2 size={ 24 }/> }
                        { type === 'confirm' && <HelpCircle size={ 32 } color="#4ade80"/> }
                    </div>

                    <div style={ styles.textContainer }>
                        <span style={ {
                            display: 'block', 
                            marginBottom: isConfirm ? '20px' : '0',
                            fontSize: isConfirm ? '1.1rem' : '0.9rem'
                        } }>
                            { message }
                        </span>

                        { isConfirm && (
                            <div style={ {display: 'flex', gap: '12px', width: '100%'} }>
                                <button onClick={ onClose } style={ styles.btnCancel }>
                                    Annulla
                                </button>
                                <button 
                                    onClick={ onConfirm } 
                                    style={ {
                                        ...styles.btnConfirm,
                                        background: confirmLabel === "Aggiorna" ? "#4ade80" : "#a4161a"
                                    } }>
                                    { confirmLabel }
                                </button>
                            </div>
                        ) }
                    </div>

                    { !isConfirm && onClose && (
                        <button onClick={ onClose } style={ styles.closeBtn }>
                            <X size={ 18 }/>
                        </button>
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
        width: '100vw',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.7)', // Più scuro per risaltare il box
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999, 
        padding: '20px',
        boxSizing: 'border-box'
    },
    loaderContainer: { textAlign: 'center' },
    loaderText: {
        marginTop: '15px', color: '#ffffff',
        fontWeight: '800', fontSize: '1.1rem',
        fontFamily: '"Nunito", sans-serif'
    },
    messageBox: {
        width: '100%', 
        maxWidth: '350px', 
        padding: '25px', 
        borderRadius: '28px',
        display: 'flex', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        fontFamily: '"Nunito", sans-serif',
        boxSizing: 'border-box'
    },
    iconContainer: { display: 'flex', alignItems: 'center' },
    textContainer: { flex: 1, fontWeight: '700' },
    error: { background: '#f8d7da', color: '#a4161a', border: '1px solid #f5c2c7' },
    success: { background: '#d8f3dc', color: '#2d6a4f', border: '1px solid #b7e4c7' },
    confirm: { background: '#ffffff', color: '#1e3a3a' },
    closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: '10px' },
    btnCancel: {
        flex: 1,
        padding: '12px',
        borderRadius: '15px',
        border: 'none',
        background: '#f1f5f9',
        color: '#64748b',
        fontWeight: '800',
        cursor: 'pointer',
        fontSize: '0.9rem'
    },
    btnConfirm: { // Rinominato da btnDelete per chiarezza
        flex: 1,
        padding: '12px',
        borderRadius: '15px',
        border: 'none',
        color: '#ffffff',
        fontWeight: '800',
        cursor: 'pointer',
        fontSize: '0.9rem'
    }
};

export default StatusFeedback;
