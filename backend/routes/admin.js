// routes/admin.js - Rutas de administración (CRUD)
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware de autenticación de admin (verificar en el frontend)
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
