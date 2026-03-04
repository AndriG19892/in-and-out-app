require ( 'dotenv' ).config ();
const express = require ( 'express' );
const connectDB = require ( './config/db' );
const cors = require ( 'cors' );

const authRoutes = require ( './routes/auth.routes' );
const userRoutes = require ( './routes/user.routes' );
const transactionRoutes = require ( './routes/transaction.routes' );

const app = express ();
app.use ( cors ( {
    origin: [
        'https://inoutapp.netlify.app',
        'http://localhost:5173', // Per i tuoi test locali con Vite
        'http://localhost:3000'
    ],
    credentials: true
} ) );
app.use ( express.json () );

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});
//definizione degli endpoing
app.use ( '/api/auth', authRoutes );
app.use ( '/api/users', userRoutes );
app.use ( '/api/transactions', transactionRoutes );

// Passiamo la URI come argomento alla funzione
connectDB ( process.env.MONGO_URI );

const PORT = process.env.PORT || 5000;
app.listen ( PORT, () => {
    console.log ( `🚀 Server in esecuzione sulla porta ${ PORT }` );
} );
