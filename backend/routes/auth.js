// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================
// REQUERIMIENTO: Endpoints para autenticación de usuarios
// ⭐ REQUERIMIENTO NOVEDOSO: Validación de email con expresiones regulares
// ============================================

// Importar Express y crear router
const express = require('express');
const router = express.Router();

// Importar controlador de autenticación
const ctrl = require('../controllers/authController');

// ============================================
// ⭐ FUNCIONALIDAD NOVEDOSA Y DE INTERÉS ⭐
// VALIDACIÓN DE EMAIL CON EXPRESIONES REGULARES
// ============================================
// Importar middleware que valida emails usando RegEx antes de procesar peticiones
const { validateEmail } = require('../middleware/validateEmail');

// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================

// POST /api/auth/login
// DESCRIPCIÓN: Iniciar sesión con email y contraseña
// MIDDLEWARE: validateEmail - Valida formato del email con RegEx
// CONTROLADOR: ctrl.login - Verifica credenciales y genera token JWT
// BODY: { email, password }
// RESPUESTA: { message, token, user }
router.post('/login', validateEmail, ctrl.login);

// POST /api/auth/register  
// DESCRIPCIÓN: Registrar nuevo usuario
// MIDDLEWARE: validateEmail - Valida formato del email con RegEx
// CONTROLADOR: ctrl.register - Crea usuario con contraseña encriptada
// BODY: { nombre, apellido, email, password }
// RESPUESTA: { message } (201 Created)
router.post('/register', validateEmail, ctrl.register);

// POST /api/auth/logout
// DESCRIPCIÓN: Cerrar sesión (en JWT solo se elimina token del cliente)
// CONTROLADOR: ctrl.logout - Responde con mensaje de confirmación
// RESPUESTA: { message }
router.post('/logout', ctrl.logout);

// POST /api/auth/forgot-password
// DESCRIPCIÓN: Recuperar contraseña enviando email con nueva contraseña temporal
// ⭐ REQUERIMIENTO: Envío de emails con nodemailer
// MIDDLEWARE: validateEmail - Valida formato del email con RegEx
// CONTROLADOR: ctrl.forgotPassword - Genera nueva contraseña y envía email
// BODY: { email }
// RESPUESTA: { message }
router.post('/forgot-password', validateEmail, ctrl.forgotPassword);

// ============================================
// EXPORTAR ROUTER
// ============================================
// El router se monta en /api/auth desde server.js
module.exports = router;
