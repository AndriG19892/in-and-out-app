const express = require ( 'express' );
const router = express.Router ();
const {addTransaction, getTransaction, getBalance} = require ( '../controllers/transaction.controller' );

router.post ( '/add', addTransaction );
router.get ( '/:userId', getTransaction );
router.get ( '/balance/:userId', getBalance );

module.exports = router;