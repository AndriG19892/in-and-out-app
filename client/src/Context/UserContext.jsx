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

useEffect(() => {
    const loadUser = async () => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        
        if (token) {
            // Se abbiamo un userId salvato, impostiamo un utente "minimo" 
            // per sbloccare subito l'interfaccia
            if (storedUserId) {
                setUser({ id: storedUserId, temp: true });
            }

            try {
                const res = await api.get('/auth/me');
                setUser(res.data.user);
            } catch (err) {
                console.error("Sessione scaduta");
                logout();
            }
        }
        // Spostiamo il setLoading(false) fuori o usiamo un finally
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
        {/* Rimuoviamo il blocco !loading && children per non "killare" l'app */}
        {children}
    </UserContext.Provider>
);
};
