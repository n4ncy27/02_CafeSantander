const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');

// Rutas de autenticación
router.post('/login', ctrl.login);
router.post('/register', ctrl.register);
router.post('/logout', ctrl.logout);

module.exports = router;
