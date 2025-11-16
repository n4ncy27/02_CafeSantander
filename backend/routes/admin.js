// ============================================
// ROUTES/ADMIN.JS - RUTAS DE ADMINISTRACIÓN
// ============================================
// REQUERIMIENTO: Sistema CRUD completo para gestión administrativa
// Endpoints:
// - Productos: GET (listar/buscar/por ID), POST (crear), PUT (actualizar), DELETE (eliminar)
// - Usuarios: GET (listar/buscar/por ID), PUT (actualizar), DELETE (eliminar)
// - Estadísticas: GET (totales del sistema)

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// ============================================
// MIDDLEWARE DE AUTENTICACIÓN DE ADMIN
// ============================================
// Nota: La validación principal se realiza en frontend
// Este middleware es un placeholder para validaciones futuras
const adminAuth = (req, res, next) => {
  // Nota: La validación de admin se realiza principalmente en el frontend
  // El backend protegerá estas rutas con validación básica
  next();
};

// ============================================
// RUTAS DE PRODUCTOS
// ============================================

// GET - Listar todos los productos
router.get('/productos', adminAuth, adminController.getAllProductos);

// GET - Buscar productos
router.get('/productos/search', adminAuth, adminController.searchProductos);

// GET - Obtener un producto por ID
router.get('/productos/:id', adminAuth, adminController.getProductoById);

// POST - Crear nuevo producto
router.post('/productos', adminAuth, adminController.createProducto);

// PUT - Actualizar producto
router.put('/productos/:id', adminAuth, adminController.updateProducto);

// DELETE - Eliminar producto
router.delete('/productos/:id', adminAuth, adminController.deleteProducto);

// ============================================
// RUTAS DE USUARIOS
// ============================================

// GET - Listar todos los usuarios
router.get('/usuarios', adminAuth, adminController.getAllUsuarios);

// GET - Buscar usuarios
router.get('/usuarios/search', adminAuth, adminController.searchUsuarios);

// GET - Obtener un usuario por ID
router.get('/usuarios/:id', adminAuth, adminController.getUsuarioById);

// PUT - Actualizar usuario
router.put('/usuarios/:id', adminAuth, adminController.updateUsuario);

// DELETE - Eliminar usuario
router.delete('/usuarios/:id', adminAuth, adminController.deleteUsuario);

// ============================================
// ESTADÍSTICAS
// ============================================

// GET - Obtener estadísticas
router.get('/stats', adminAuth, adminController.getStats);

module.exports = router;
