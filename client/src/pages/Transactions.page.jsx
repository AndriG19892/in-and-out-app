import React, {useState, useEffect} from "react";
import api from "../api/axiosConfig.js";
import {useUser} from "../hooks/useUser.js";
import {Search, Calendar, ArrowDown, ArrowUp, ChevronLeft, X} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";

const TransactionsPage = () => {
    const {user} = useUser ();
    const navigate = useNavigate ();
    const [allTransactions, setAllTransactions] = useState ( [] );
    const [filteredTransactions, setFilteredTransactions] = useState ( [] );
    const [searchTerm, setSearchTerm] = useState ( "" );
    const [filterCategory, setFilterCategory] = useState ( "Tutte" );
    const [filterDate, setFilterDate] = useState ( "" );

    const userId = user?.id || user?._id;

    useEffect ( () => {
        const fetchAllTransactions = async () => {
            if ( !userId ) return;
            try {
                const res = await api.get ( `/transactions/${ userId }` );
                setAllTransactions ( res.data.data );
                setFilteredTransactions ( res.data.data );
            } catch (error) {
                console.error ( "Errore recupero lista:", error );
            }
        };
        fetchAllTransactions ();
    }, [userId] );

    // Logica combinata di Filtro (Ricerca, Categoria e Data)
    useEffect ( () => {
        let result = allTransactions;

        if ( searchTerm ) {
            result = result.filter ( t =>
                t.category.toLowerCase ().includes ( searchTerm.toLowerCase () )
            );
        }

        if ( filterCategory !== "Tutte" ) {
            result = result.filter ( t => t.category === filterCategory );
        }

        if ( filterDate ) {
            result = result.filter ( t => {
                const d = new Date ( t.date );

                // Creiamo la stringa AAAA-MM-GG basandoci sulla data locale
                const year = d.getFullYear ();
                const month = String ( d.getMonth () + 1 ).padStart ( 2, '0' );
                const day = String ( d.getDate () ).padStart ( 2, '0' );

                const tDateString = `${ year }-${ month }-${ day }`;

                return tDateString === filterDate;
            } );
        }

        setFilteredTransactions ( result );
    }, [searchTerm, filterCategory, filterDate, allTransactions] );

    const styles = {
        container: {
            minHeight: '100vh',
            background: '#f8fafc',
            fontFamily: '"Nunito", sans-serif',
            padding: '20px 20px 100px 20px',
            boxSizing: 'border-box', // Evita che il padding faccia uscire i figli
            display: 'flex',
            flexDirection: 'column'
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '25px',
            zIndex: 1
        },
        controlsRow: {
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            width: '100%',
            boxSizing: 'border-box'
        },
        searchWrapper: {
            position: 'relative',
            flex: 2,
            boxSizing: 'border-box'
        },
        dateWrapper: {
            position: 'relative',
            flex: 1.2,
            boxSizing: 'border-box'
        },
        input: {
            width: '100%',
            padding: '14px 14px 14px 40px',
            borderRadius: '18px',
            border: 'none',
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            outline: 'none',
            fontSize: '0.9rem',
            boxSizing: 'border-box',
            fontFamily: '"Nunito", sans-serif',
            color: '#1e3a3a'
        },
        dateInput: {
            width: '100%',
            padding: '14px 10px',
            borderRadius: '18px',
            border: 'none',
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            outline: 'none',
            fontSize: '0.8rem',
            boxSizing: 'border-box',
            fontFamily: '"Nunito", sans-serif',
            color: '#1e3a3a'
        },
        filterScroll: {
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '15px',
            marginBottom: '10px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            boxSizing: 'border-box'
        },
        filterBadge: ( active ) => ({
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
        transactionItem: {
            background: '#ffffff',
            borderRadius: '22px',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            boxSizing: 'border-box'
        },
        iconCircle: ( isIn ) => ({
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

    const categories = ["Tutte", ...new Set ( allTransactions.map ( t => t.category ) )];

    return (
        <div style={ styles.container }>
            {/* Header */ }
            <div style={ styles.header }>
                <div onClick={ () => navigate ( -1 ) } style={ {cursor: 'pointer'} }>
                    <ChevronLeft size={ 28 } color="#1e3a3a"/>
                </div>
                <h1 style={ {fontSize: '1.4rem', fontWeight: 800, color: '#1e3a3a', margin: 0} }>Movimenti</h1>
            </div>

            {/* Barra di Ricerca e Data */ }
            <div style={ styles.controlsRow }>
                <div style={ styles.searchWrapper }>
                    <Search size={ 18 } color="#94a3b8"
                            style={ {position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)'} }/>
                    <input
                        style={ styles.input }
                        placeholder="Cerca..."
                        value={ searchTerm }
                        onChange={ ( e ) => setSearchTerm ( e.target.value ) }
                    />
                </div>

                <div style={ styles.dateWrapper }>
                    <input
                        type="date"
                        style={ styles.dateInput }
                        value={ filterDate }
                        onChange={ ( e ) => setFilterDate ( e.target.value ) }
                    />
                    { filterDate && (
                        <X
                            size={ 14 }
                            color="#ef4444"
                            style={ {
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            } }
                            onClick={ () => setFilterDate ( "" ) }
                        />
                    ) }
                </div>
            </div>

            {/* Filtri Categorie */ }
            <div style={ styles.filterScroll } className="hide-scrollbar">
                { categories.map ( cat => (
                    <div
                        key={ cat }
                        style={ styles.filterBadge ( filterCategory === cat ) }
                        onClick={ () => setFilterCategory ( cat ) }
                    >
                        { cat }
                    </div>
                ) ) }
            </div>

            {/* Lista Risultati */ }
            <div style={ {marginTop: '5px', flex: 1} }>
                { filteredTransactions.length > 0 ? (
                    filteredTransactions.map ( t => {
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
                                        <Calendar size={ 10 }/> { new Date ( t.date ).toLocaleDateString ( 'it-IT' ) }
                                    </div>
                                </div>
                                <div style={ {fontWeight: 800, color: isIn ? '#2d6a4f' : '#a4161a', fontSize: '1rem'} }>
                                    { isIn ? '+' : '-' } €{ t.amount.toLocaleString ( 'it-IT', {minimumFractionDigits: 2} ) }
                                </div>
                            </div>
                        );
                    } )
                ) : (
                    <div style={ {textAlign: 'center', color: '#94a3b8', marginTop: '40px', fontSize: '0.9rem'} }>
                        Nessun movimento trovato.
                    </div>
                ) }
            </div>

            <BottomNav/>
        </div>
    );
};

export default TransactionsPage;