const express = require ( 'express' );
const router = express.Router ();
const {addTransaction, getTransaction, getBalance,deleteTransaction } = require ( '../controllers/transaction.controller' );
const {protect} = require ( '../middleware/auth.middleware' );
router.post ( '/add', protect, addTransaction );
router.get ( '/:userId', protect, getTransaction );
router.get ( '/balance/:userId', protect, getBalance );
router.delete('/:id', protect, transactionController.deleteTransaction);

module.exports = router;
