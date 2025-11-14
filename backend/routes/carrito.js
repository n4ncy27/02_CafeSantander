const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/carritoController');
const authMiddleware = require('../middleware/auth');

// Rutas del carrito (protegidas con autenticación)
router.get('/', authMiddleware, ctrl.obtenerCarrito);
router.post('/agregar', authMiddleware, ctrl.agregarAlCarrito);
router.put('/actualizar/:itemId', authMiddleware, ctrl.actualizarCarrito);
router.delete('/eliminar/:itemId', authMiddleware, ctrl.eliminarDelCarrito);
router.delete('/vaciar', authMiddleware, ctrl.vaciarCarrito);

module.exports = router;
