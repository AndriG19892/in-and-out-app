const saveInLocalStorage = ( key, value ) => {
    try {
        const serializedValue = typeof value === "string" ? value : JSON.stringify ( value );
        localStorage.setItem ( key, serializedValue );
        return true;
    } catch (error) {
        console.error ( "Errore durante il salvataggio nel localStorage:", error );
        return false;
    }
}

export default saveInLocalStorage;