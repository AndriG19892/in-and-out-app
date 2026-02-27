// src/Context/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Funzione per caricare i dati specifici dell'utente (PROFILO)
    const fetchUserData = async (userId) => {
        try {
            // CORRETTO: Usiamo 'api' e il percorso relativo
            const res = await api.get(`/users/profile/${userId}`);
            if (res.data.success) {
                setUser(res.data.data);
            }
        } catch (error) {
            console.error("Errore fetch User:", error.response?.data || error.message);
        }
    };

    // Effetto al caricamento: controlla se l'utente è già loggato (REFRESH)
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/auth/me'); // Recupera l'utente dal token
                    setUser(res.data.user);
                } catch (err) {
                    console.error("Sessione scaduta");
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = (userData) => {
        const id = userData.id || userData._id;
        localStorage.setItem("userId", id);
        setUser(userData);
        fetchUserData(id); // Carica i dati del profilo subito dopo il login
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </UserContext.Provider>
    );
};
