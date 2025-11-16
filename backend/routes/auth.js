const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');

// ============================================
// FUNCIONALIDAD NOVEDOSA Y DE INTERÉS
// Importar middleware de validación de email con expresiones regulares
// ============================================
const { validateEmail } = require('../middleware/validateEmail');

// Rutas de autenticación con validación de email usando regex
router.post('/login', validateEmail, ctrl.login);
router.post('/register', validateEmail, ctrl.register);
router.post('/logout', ctrl.logout);
router.post('/forgot-password', validateEmail, ctrl.forgotPassword);

module.exports = router;
