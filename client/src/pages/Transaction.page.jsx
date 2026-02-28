import React, {useState} from "react";
import api from "../api/axiosConfig.js";
import StatusFeedback from "../components/StatusFeedback.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {ArrowLeft, Check, Euro, Tag, AlignLeft} from 'lucide-react';

const TransactionPage = () => {
    const [status, setStatus] = useState ( {loading: false, msg: "", type: ""} );
    const {type} = useParams (); // Recupera 'in' o 'out' dalla rotta
    const navigate = useNavigate ();
    const userId = localStorage.getItem ( "userId" );
    const isIn = type === 'IN';

    const [formData, setFormData] = useState ( {
        amount: "",
        category: "",
        description: ""
    } );
    const [loading, setLoading] = useState ( false );

    const handleSubmit = async ( e ) => {
        e.preventDefault ();
        //evita i click multipli
        if(status.loading ) return;
        setStatus ( {loading: true, msg: "", type: ""} );
        try {
            // Prepariamo i dati puliti
            const payload = {
                amount: Number ( formData.amount ), // Convertiamo in numero reale
                category: formData.category,
                description: formData.description || "Nessuna nota", // Evitiamo campi vuoti
                type: type,
                userId: userId
            };

            const response = await api.post ( "/transactions/add", payload );

            if ( response.status === 200 || response.status === 201 ) {
                setStatus({
                    loading: false,
                    msg: "Transazione aggiunta con successo!",
                    type: "success",
                })
                //torno alla dashboard dopo un secondo
                setTimeout ( () => navigate ( "/dashboard" ), 2000 );
            }
        } catch (error) {
            // Log dettagliato per capire COSA dice il server
            console.error ( "Errore del server:", error.response?.data || error.message );
            setStatus({
                loading: false,
                msg: err.response?.data.message || "Errore durante l'inserimento della transazione.",
                type: "error",
            })
        } finally {
            setLoading ( false );
        }
    };

    // Categorie dinamiche
    const categories = isIn
        ? ["Stipendio", "Regalo", "Vendita", "Rimborsi", "Altro"]
        : ["Cibo", "Trasporti", "Affitto", "Salute", "Svago", "Shopping", "Altro"];

    const styles = {
        container: {
            minHeight: '100vh',
            background: '#ffffff',
            fontFamily: '"Nunito", sans-serif',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            height: '180px',
            background: isIn ? '#caf1dd' : '#f8d7da',
            borderBottomLeftRadius: '60px',
            borderBottomRightRadius: '60px',
            padding: '40px 20px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
        },
        backBtn: {
            background: '#ffffff',
            border: 'none',
            width: '45px',
            height: '45px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            color: '#1e3a3a'
        },
        headerTitle: {
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#1e3a3a',
            margin: '0 0 10px 10px'
        },
        form: {
            padding: '40px 25px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            marginTop: '-20px'
        },
        inputWrapper: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        labelRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginLeft: '5px',
            color: '#64748b',
            fontSize: '0.9rem',
            fontWeight: '700'
        },
        inputField: {
            padding: '18px 20px',
            borderRadius: '25px',
            border: '2px solid #f1f5f9',
            backgroundColor: '#f8fafc',
            fontSize: '1rem',
            fontWeight: '600',
            outline: 'none',
            color: '#1e3a3a',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit'
        },
        submitBtn: {
            marginTop: '20px',
            padding: '20px',
            borderRadius: '25px',
            border: 'none',
            backgroundColor: isIn ? '#4ade80' : '#f87171',
            color: '#ffffff',
            fontSize: '1.1rem',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: isIn ? '0 10px 20px rgba(74, 222, 128, 0.3)' : '0 10px 20px rgba(248, 113, 113, 0.3)',
            transition: 'transform 0.2s'
        }
    };

    return (
        <div style={ styles.container }>
            <StatusFeedback
                loading={ status.loading }
                message={ status.msg }
                type={ status.type }
                onClose={ () => setStatus ( {...status, msg: ""} ) }
            />
            <div style={ styles.header }>
                <button onClick={ () => navigate ( -1 ) } style={ styles.backBtn }>
                    <ArrowLeft size={ 24 }/>
                </button>
                <h2 style={ styles.headerTitle }>
                    { isIn ? "Nuova Entrata" : "Nuova Uscita" }
                </h2>
            </div>

            <form style={ styles.form } onSubmit={ handleSubmit }>
                {/* Importo */ }
                <div style={ styles.inputWrapper }>
                    <div style={ styles.labelRow }>
                        <Euro size={ 16 }/> <span>Importo</span>
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        required
                        style={ styles.inputField }
                        value={ formData.amount }
                        onChange={ ( e ) => setFormData ( {...formData, amount: e.target.value} ) }
                    />
                </div>

                {/* Categoria */ }
                <div style={ styles.inputWrapper }>
                    <div style={ styles.labelRow }>
                        <Tag size={ 16 }/> <span>Categoria</span>
                    </div>
                    <select
                        required
                        style={ styles.inputField }
                        value={ formData.category }
                        onChange={ ( e ) => setFormData ( {...formData, category: e.target.value} ) }
                    >
                        <option value="">Seleziona categoria...</option>
                        { categories.map ( ( cat ) => (
                            <option key={ cat } value={ cat }>{ cat }</option>
                        ) ) }
                    </select>
                </div>

                {/* Descrizione */ }
                <div style={ styles.inputWrapper }>
                    <div style={ styles.labelRow }>
                        <AlignLeft size={ 16 }/> <span>Descrizione</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Aggiungi una nota..."
                        style={ styles.inputField }
                        value={ formData.description }
                        onChange={ ( e ) => setFormData ( {...formData, description: e.target.value} ) }
                    />
                </div>

                <button
                    type="submit"
                    style={ styles.submitBtn }
                    disabled={ loading }
                    onMouseOver={ ( e ) => e.currentTarget.style.transform = 'scale(1.02)' }
                    onMouseOut={ ( e ) => e.currentTarget.style.transform = 'scale(1)' }
                >
                    { loading ? "Salvataggio..." : (
                        <>
                            <Check size={ 24 } strokeWidth={ 3 }/> Conferma
                        </>
                    ) }
                </button>
            </form>
        </div>
    );
};

export default TransactionPage;
