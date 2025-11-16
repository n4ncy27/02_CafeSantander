// ============================================
// ROUTES/PRODUCTOS.JS - RUTAS DE PRODUCTOS
// ============================================
// REQUERIMIENTO: Endpoints REST para consulta de productos
// Implementa las operaciones de lectura (READ) del CRUD

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productoController');

// ============================================
// GET /api/productos - Obtener todos los productos
// ============================================
// Retorna lista completa de productos disponibles
// Usado en página Inicio y Productos para mostrar catálogo
router.get('/', ctrl.obtenerProductos);

// ============================================
// GET /api/productos/:id - Obtener un producto específico
// ============================================
// Retorna detalle de un producto por su ID
// Parámetro: id (número) - ID del producto
router.get('/:id', ctrl.obtenerProducto);

module.exports = router;