const Transaction = require ( '../models/Transaction.model' );
const mongoose = require ( 'mongoose' );

exports.addTransaction = async ( req, res ) => {
    try {
        const {userId, type, amount, category, description, date} = req.body;

        const nuovaTransazione = await Transaction.create ( {
            userId,
            type,
            amount,
            category,
            description,
            date: date || Date.now ()
        } );
        res.status ( 201 ).json ( {
            success: true,
            data: nuovaTransazione
        } );
    } catch (err) {
        res.status ( 500 ).json ( {
            success: false,
            message: err.message
        } )
    }
}

exports.getTransaction = async ( req, res ) => {
    try {
        const {userId} = req.params;
        const transazioni = await Transaction.find ( {userId} ).sort ( {date: -1} );

        res.status ( 201 ).json ( {
            success: true,
            count: transazioni.length,
            data: transazioni
        } );
    } catch (error) {
        res.status ( 500 ).json ( {
            success: false,
            message: error.message
        } )
    }
}

exports.getBalance = async ( req, res ) => {
    try {
        const {userId} = req.params;
        const stats = await Transaction.aggregate ( [
            // 1. filtra solo le transazioni dell'utente specifico
            {$match: {userId: new mongoose.Types.ObjectId ( userId )},},
            //2. raggruppa e somma in base al tipo (in, out)
            {
                $group: {
                    _id: "$type",
                    total: {$sum: "$amount"}
                }
            }
        ] );
        //formattiamo i dati per renderli facili da leggere al frontend
        const balance = {
            entrate: 0,
            uscite: 0,
            totale: 0
        };
        stats.forEach ( item => {
            if ( item._id === 'IN' ) balance.entrate = item.total;
            if ( item._id === 'OUT' ) balance.uscite = item.total;
        } );
        balance.totale = balance.entrate - balance.uscite;
        res.status ( 200 ).json ( {
            success: true,
            data: balance
        } );
    } catch (error) {
        res.status ( 500 ).json ( {
            success: false,
            message: error.message
        } )
    }
}