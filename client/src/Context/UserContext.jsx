// src/Context/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Esportiamo il context per permettere allo hook di leggerlo
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
            // NOTA: Controlla che il tuo backend risponda con { success: true, data: ... }
            if (res.data.success) {
                setUser(res.data.data);
            }
        } catch (error) {
            console.error("Errore fetch User:", error.response?.data || error.message);
            // Fermiamo il logout automatico per ora per debuggare
            // logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedId = localStorage.getItem("userId");
        if (savedId) {
            fetchUserData(savedId);
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("userId", userData.id || userData._id);
        setUser(userData);
        fetchUserData(userData.id || userData._id);
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