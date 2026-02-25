require ( 'dotenv' ).config ();
const express = require ( 'express' );
const connectDB = require ( './config/db' );
const cors = require ( 'cors' );

const authRoutes = require ( './routes/auth.routes' );
const userRoutes = require ( './routes/user.routes' );
const transactionRoutes = require ( './routes/transaction.routes' );

const app = express ();
app.use ( cors () );
app.use ( express.json () );
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