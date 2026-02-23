import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            // Dallo screenshot vediamo che l'id è in: res.data.user.id
            const userId = res.data.user.id;
            console.log (userId);
            if (userId) {
                localStorage.setItem('userId', userId);
                console.log("ID salvato correttamente:", userId);
                // Reindirizza alla dashboard dopo il salvataggio
                window.location.href = '/dashboard';
            }
        } catch (err) {
            console.error("Errore login:", err);
            alert("Credenziali errate");
        }
    };

    // --- OGGETTI DI STILE (Simil-Styled Components) ---
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'radial-gradient(circle at center, #244a5a 0%, #0f2027 100%)',
            color: 'white',
            // Font Inter è quello che più si avvicina alla tua immagine
            fontFamily: '"Inter", sans-serif',
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box'
        },
        mainAmount: {
            fontSize: '3.8rem',
            fontWeight: '700',
            color: '#5eead4', // Il verde acqua neon dell'immagine
            textShadow: '0 0 25px rgba(94, 234, 212, 0.3)',
            margin: '15px 0',
            letterSpacing: '-0.05em' // Tracking negativo per look premium
        },
        statValueEntrate: {
            fontSize: '1.45rem',
            fontWeight: '600',
            color: '#32e0a1', // Verde smeraldo brillante
            letterSpacing: '-0.02em'
        },
        statValueUscite: {
            fontSize: '1.45rem',
            fontWeight: '600',
            color: '#4fd1c5', // Teal/Petrolio chiaro opaco
            letterSpacing: '-0.02em'
        }
        // ... mantieni gli altri stili invariati
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Bentornato</h1>

                <form onSubmit={handleLogin}>
                    <div style={styles.inputGroup}>
                        <input
                            type="email"
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#5eead4';
                                e.target.style.boxShadow = '0 0 15px rgba(94, 234, 212, 0.4)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(94, 234, 212, 0.3)';
                                e.target.style.boxShadow = 'none';
                            }}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <input
                            type="password"
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#5eead4';
                                e.target.style.boxShadow = '0 0 15px rgba(94, 234, 212, 0.4)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(94, 234, 212, 0.3)';
                                e.target.style.boxShadow = 'none';
                            }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#6bd6a4'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#82e9b8'}
                    >
                        Login
                    </button>
                </form>

                <span style={styles.link}>Password dimenticata?</span>
            </div>

        </div>
    );
};

export default LoginPage;