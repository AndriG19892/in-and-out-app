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
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a3c4a',
            fontFamily: 'sans-serif',
            margin: 0
        },
        card: {
            width: '100%',
            maxWidth: '400px',
            padding: '2rem',
            textAlign: 'center',
        },
        title: {
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
        },
        inputGroup: {
            marginBottom: '1.5rem',
        },
        input: {
            width: '100%',
            padding: '1rem 1.5rem',
            backgroundColor: 'transparent',
            border: '2px solid rgba(94, 234, 212, 0.3)',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
        },
        button: {
            width: '100%',
            padding: '1rem',
            marginTop: '2rem',
            backgroundColor: '#82e9b8',
            border: 'none',
            borderRadius: '50px',
            color: '#1a3c4a',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
        },
        link: {
            color: 'white',
            marginTop: '1.5rem',
            fontSize: '0.9rem',
            opacity: 0.8,
            cursor: 'pointer',
            display: 'block'
        }
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