const express = require ( 'express' );
const router = express.Router ();
const {addTransaction, getTransaction} = require ( '../controllers/transaction.controller' );

router.post ( '/add', addTransaction );
router.get ( '/:userId', getTransaction );

module.exports = router;