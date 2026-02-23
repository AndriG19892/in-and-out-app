const mongoose = require ( 'mongoose' );

// Accettiamo la uri come parametro
const connectDB = async ( uri ) => {
    try {
        if ( !uri ) {
            throw new Error ( "La stringa URI è vuota o non definita!" );
        }

        const conn = await mongoose.connect ( uri );
        console.log ( `✅ MongoDB Connesso: ${ conn.connection.host }` );
    } catch (error) {
        console.error ( `❌ Errore di connessione: ${ error.message }` );
        process.exit ( 1 );
    }
};

module.exports = connectDB;