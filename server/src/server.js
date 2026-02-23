require ( 'dotenv' ).config ();
const express = require ( 'express' );
const connectDB = require ( './config/db' );

const authRoutes = require ( './routes/auth.routes' );

const app = express ();
app.use ( express.json () );
app.use ( '/api/auth', authRoutes );

// Passiamo la URI come argomento alla funzione
connectDB ( process.env.MONGO_URI );

const PORT = process.env.PORT || 5000;
app.listen ( PORT, () => {
    console.log ( `🚀 Server in esecuzione sulla porta ${ PORT }` );
} );