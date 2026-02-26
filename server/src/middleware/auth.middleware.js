const jwt = require ( 'jsonwebtoken' );

const protect = async ( req, res, next ) => {
    let token;

    // 1. Controlliamo se negli header c'è l'Authorization che inizia con 'Bearer'
    if ( req.headers.authorization && req.headers.authorization.startsWith ( 'Bearer ' ) ) {
        try {
            // 2. Estraiamo il token dalla stringa "Bearer eyJhbGci..."
            token = req.headers.authorization.split ( ' ' )[1];

            // 3. Verifichiamo il token usando la tua chiave segreta
            const decoded = jwt.verify ( token, process.env.JWT_SECRET );

            // 4. Aggiungiamo i dati dell'utente (id) all'oggetto 'req'
            // Così tutte le funzioni successive sapranno chi è l'utente
            req.user = decoded;
            next ();
        } catch (error) {
            console.error ( "Errore verifica token:", error );
            res.status ( 401 ).json ( {
                success: false,
                mesasage: "non autorizzato, token fallito"
            } );
        }
    }
    if ( !token ) {
        res.status ( 401 ).json ( {
            success: false,
            message: 'Non autorizzato, nessun token'
        } );
    }
};

module.exports = {protect};