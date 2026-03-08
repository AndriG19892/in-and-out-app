import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MonthPicker = ({ currentFilter, onSelect, onClose }) => {
    const [tempYear, setTempYear] = useState(
        currentFilter ? parseInt(currentFilter.split('-')[0]) : new Date().getFullYear()
    );

    const months = [
        "Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
        "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
    ];

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(30, 58, 58, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'flex-end',
            fontFamily: '"Nunito", sans-serif',
        },
        content: {
            background: '#ffffff',
            width: '100%',
            borderRadius: '30px 30px 0 0',
            padding: '30px 20px 40px 20px', // Un po' più di spazio sotto per i device senza tasti
            boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px',
        },
        title: {
            margin: 0,
            color: '#1e3a3a',
            fontWeight: 800,
            fontSize: '1.2rem'
        },
        yearSelector: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: '#f1f5f9',
            padding: '10px 20px',
            borderRadius: '15px',
            color: '#1e3a3a'
        },
        yearText: {
            fontSize: '1.1rem',
            fontWeight: 800
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
        },
        monthBtn: (active) => ({
            padding: '18px 0',
            borderRadius: '18px',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '0.9rem',
            transition: 'all 0.2s',
            cursor: 'pointer',
            background: active ? '#4ade80' : '#f8fafc',
            color: active ? '#ffffff' : '#1e3a3a',
            border: active ? 'none' : '1px solid #f1f5f9',
            boxShadow: active ? '0 4px 12px rgba(74, 222, 128, 0.3)' : 'none',
        }),
        closeBtn: {
            width: '100%',
            marginTop: '25px',
            padding: '16px',
            borderRadius: '18px',
            background: '#f1f5f9',
            border: 'none',
            fontWeight: 800,
            color: '#64748b',
            fontSize: '1rem',
            fontFamily: '"Nunito", sans-serif',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.content} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>Seleziona Mese</h3>
                    <div style={styles.yearSelector}>
                        <ChevronLeft
                            size={22}
                            onClick={() => setTempYear(y => y - 1)}
                            style={{ cursor: 'pointer' }}
                        />
                        <span style={styles.yearText}>{tempYear}</span>
                        <ChevronRight
                            size={22}
                            onClick={() => setTempYear(y => y + 1)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>

                <div style={styles.grid}>
                    {months.map((m, i) => {
                        const mStr = String(i + 1).padStart(2, '0');
                        const isActive = currentFilter === `${tempYear}-${mStr}`;
                        return (
                            <div
                                key={m}
                                style={styles.monthBtn(isActive)}
                                onClick={() => onSelect(`${tempYear}-${mStr}`)}
                            >
                                {m}
                            </div>
                        );
                    })}
                </div>

                <button style={styles.closeBtn} onClick={onClose}>
                    Chiudi
                </button>
            </div>
        </div>
    );
};

export default MonthPicker;