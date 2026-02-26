const express = require ( 'express' );
const router = express.Router ();
const {addTransaction, getTransaction, getBalance} = require ( '../controllers/transaction.controller' );
const {protect} = require ( '../middleware/auth.middleware' );
router.post ( '/add', protect, addTransaction );
router.get ( '/:userId', protect, getTransaction );
router.get ( '/balance/:userId', protect, getBalance );

module.exports = router;