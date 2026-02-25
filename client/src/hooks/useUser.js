// src/hooks/useUser.js
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser deve essere utilizzato all'interno di un UserProvider");
    }
    return context;
};