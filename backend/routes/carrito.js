// ============================================
// ROUTES/CARRITO.JS - RUTAS DEL CARRITO DE COMPRAS
// ============================================
// REQUERIMIENTO: Sistema completo de carrito de compras
// Todas las rutas están protegidas con JWT (authMiddleware)

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/carritoController');
const authMiddleware = require('../middleware/auth');

// ============================================
// RUTAS DEL CARRITO (USUARIOS AUTENTICADOS)
// ============================================
// Implementan CRUD completo para gestión del carrito

// GET /api/carrito - Obtener carrito del usuario autenticado
// Retorna items del carrito activo con detalles de productos
router.get('/', authMiddleware, ctrl.obtenerCarrito);

// POST /api/carrito/agregar - Agregar producto al carrito
// Body: { productId, quantity }
// Crea nuevo carrito si no existe, o actualiza existente
router.post('/agregar', authMiddleware, ctrl.agregarAlCarrito);

// PUT /api/carrito/actualizar/:itemId - Actualizar cantidad de un item
// Params: itemId (ID de carrito_items)
// Body: { quantity }
router.put('/actualizar/:itemId', authMiddleware, ctrl.actualizarCarrito);

// DELETE /api/carrito/eliminar/:itemId - Eliminar producto específico
// Params: itemId (ID de carrito_items)
router.delete('/eliminar/:itemId', authMiddleware, ctrl.eliminarDelCarrito);

// DELETE /api/carrito/vaciar - Vaciar carrito completamente
// Elimina todos los items del carrito activo del usuario
router.delete('/vaciar', authMiddleware, ctrl.vaciarCarrito);

// ============================================
// RUTAS ADMINISTRATIVAS (CRUD COMPLETO)
// ============================================
// REQUERIMIENTO: Operaciones administrativas del carrito

// GET /api/carrito/admin/todos - Listar todos los carritos
router.get('/admin/todos', authMiddleware, ctrl.listarTodosLosCarritos);

// GET /api/carrito/admin/:carritoId - Obtener carrito específico por ID
router.get('/admin/:carritoId', authMiddleware, ctrl.obtenerCarritoPorId);

// DELETE /api/carrito/admin/:carritoId - Eliminar carrito completo
router.delete('/admin/:carritoId', authMiddleware, ctrl.eliminarCarrito);

module.exports = router;
