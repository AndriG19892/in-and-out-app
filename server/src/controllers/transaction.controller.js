const Transaction = require ( '../models/Transaction.model' );

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