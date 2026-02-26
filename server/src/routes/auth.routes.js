const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// Rotte pubbliche
router.post('/register', register);
router.post('/login', login);

// Rotta privata: serve al frontend per recuperare i dati utente al refresh della pagina
// Usiamo il middleware 'protect' che abbiamo scritto prima
router.get('/me', protect, getMe);

module.exports = router;