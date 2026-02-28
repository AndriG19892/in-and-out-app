import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig.js";
import { useUser } from "../hooks/useUser.js";
import { Search, Calendar, ArrowDown, ArrowUp, ChevronLeft, X, Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import StatusFeedback from "../components/StatusFeedback.jsx"; // Assicurati che il percorso sia corretto

const TransactionsPage = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [allTransactions, setAllTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("Tutte");
    const [filterDate, setFilterDate] = useState("");

    // Stati per il feedback e la gestione eliminazione
    const [status, setStatus] = useState({ loading: false, msg: "", type: "" });
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const userId = user?.id || user?._id;

    useEffect(() => {
        const fetchAllTransactions = async () => {
            if (!userId) return;
            try {
                const res = await api.get(`/transactions/${userId}`);
                setAllTransactions(res.data.data);
                setFilteredTransactions(res.data.data);
            } catch (error) {
                console.error("Errore recupero lista:", error);
            }
        };
        fetchAllTransactions();
    }, [userId]);

    useEffect(() => {
        let result = allTransactions;
        if (searchTerm) {
            result = result.filter(t =>
                t.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterCategory !== "Tutte") {
            result = result.filter(t => t.category === filterCategory);
        }
        if (filterDate) {
            result = result.filter(t => {
                const d = new Date(t.date);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const tDateString = `${year}-${month}-${day}`;
                return tDateString === filterDate;
            });
        }
        setFilteredTransactions(result);
    }, [searchTerm, filterCategory, filterDate, allTransactions]);

    // 1. Funzione che apre la conferma
    const askDelete = (id) => {
        setTransactionToDelete(id);
        setStatus({
            loading: false,
            msg: "Vuoi eliminare definitivamente questo movimento?",
            type: "confirm"
        });
    };

    // 2. Funzione che esegue l'eliminazione effettiva
    const confirmDelete = async () => {
        if (!transactionToDelete) return;
        setStatus({ loading: true, msg: "Eliminazione in corso...", type: "" });
        try {
            await api.delete(`/transactions/${transactionToDelete}`);

            const updatedList = allTransactions.filter(t => t._id !== transactionToDelete);
            setAllTransactions(updatedList);
            setFilteredTransactions(updatedList);

            setStatus({ loading: false, msg: "Movimento eliminato con successo!", type: "success" });
            setTransactionToDelete(null);

            // Chiude il messaggio di successo dopo 1.5 secondi
            setTimeout(() => setStatus({ loading: false, msg: "", type: "" }), 1500);
        } catch (error) {
            console.error("Errore eliminazione:", error);
            setStatus({
                loading: false,
                msg: "Errore durante l'eliminazione del movimento.",
                type: "error"
            });
        }
    };

    const styles = {
        container: {
            height: '100vh',
            background: '#f8fafc',
            fontFamily: '"Nunito", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
        },
        fixedTop: {
            padding: '20px 20px 0 20px',
            background: '#f8fafc',
            zIndex: 10,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '25px',
        },
        controlsRow: {
            display: 'flex',
            gap: '87px', // Ripristinato gap normale per mobile
            marginBottom: '20px',
            width: '100%',
            boxSizing: 'border-box'
        },
        searchWrapper: {
            position: 'relative',
            flex: 2,
        },
        dateWrapper: {
            position: 'relative',
            flex: 1.2,
        },
        input: {
            width: '100%',
            padding: '14px 14px 14px 44px', // Aumentato spazio a sinistra
            borderRadius: '18px',
            border: '1px solid #f1f5f9', // Un bordo leggerissimo aiuta la definizione
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Ombra più morbida e moderna
            outline: 'none',
            fontSize: '0.9rem',
            fontFamily: '"Nunito", sans-serif',
            color: '#1e3a3a',
            transition: 'all 0.2s ease'
        },
        dateInput: {
            width: '72%',
            // IL TRUCCO È QUI: padding-left a 44px per liberare lo spazio all'icona
            padding: '14px 10px 14px 44px',
            borderRadius: '18px',
            border: '1px solid #f1f5f9',
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            outline: 'none',
            fontSize: '0.85rem',
            fontFamily: '"Nunito", sans-serif',
            color: '#1e3a3a',
            cursor: 'pointer',
            appearance: 'none', // Rimuove stili nativi
            WebkitAppearance: 'none'
        },
        filterScroll: {
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '15px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        },
        filterBadge: (active) => ({
            padding: '8px 18px',
            borderRadius: '15px',
            background: active ? '#4ade80' : '#ffffff',
            color: active ? '#ffffff' : '#64748b',
            fontSize: '0.8rem',
            fontWeight: '700',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
            transition: 'all 0.2s'
        }),
        scrollArea: {
            flex: 1,
            overflowY: 'auto',
            padding: '10px 20px 100px 20px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        },
        transactionItem: {
            background: '#ffffff',
            borderRadius: '22px',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        },
        iconCircle: (isIn) => ({
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: isIn ? '#d8f3dc' : '#f8d7da',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
        })
    };

    const categories = ["Tutte", ...new Set(allTransactions.map(t => t.category))];

    return (
        <div style={styles.container}>

            <div style={styles.fixedTop}>
                <div style={styles.header}>
                    <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                        <ChevronLeft size={28} color="#1e3a3a" />
                    </div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e3a3a', margin: 0 }}>Movimenti</h1>
                </div>

                <div style={styles.controlsRow}>
                    <div style={styles.searchWrapper}>
                        <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            style={styles.input}
                            placeholder="Cerca..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div style={styles.dateWrapper}>
                        <Calendar
                            size={ 16 }
                            color="#94a3b8"
                            style={ {
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none'
                            } }
                        />
                        <input
                            type="date"
                            style={styles.dateInput}
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                        {filterDate && (
                            <X size={14} color="#ef4444" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => setFilterDate("")} />
                        )}
                    </div>
                </div>

                <div style={styles.filterScroll} className="hide-scrollbar">
                    {categories.map(cat => (
                        <div key={cat} style={styles.filterBadge(filterCategory === cat)} onClick={() => setFilterCategory(cat)}>
                            {cat}
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.scrollArea} className="hide-scrollbar">
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(t => {
                        const isIn = t.type === 'IN';
                        return (
                            <div key={t._id} style={styles.transactionItem}>
                                <div style={styles.iconCircle(isIn)}>
                                    {isIn ? <ArrowDown size={18} color="#2d6a4f" /> : <ArrowUp size={18} color="#a4161a" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, color: '#1e3a3a', fontSize: '0.9rem' }}>{t.category}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.description}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={10} /> {new Date(t.date).toLocaleDateString('it-IT')}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 800, color: isIn ? '#2d6a4f' : '#a4161a', fontSize: '1rem' }}>
                                        {isIn ? '+' : '-'} €{t.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                                    </div>
                                    {/* Tasto elimina che ora attiva askDelete */}
                                    <div onClick={() => askDelete(t._id)} style={{ cursor: 'pointer', marginTop: '5px' }}>
                                        <Trash2 size={16} color="#94a3b8" />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px', fontSize: '0.9rem' }}>
                        Nessun movimento trovato.
                    </div>
                )}
            </div>
            <StatusFeedback
                loading={status.loading}
                message={status.msg}
                type={status.type}
                onConfirm={confirmDelete}
                onClose={() => {
                    setStatus({loading: false, msg: "", type: ""});
                    setTransactionToDelete(null);
                }}
            />
            <BottomNav />
        </div>
    );
};

export default TransactionsPage;