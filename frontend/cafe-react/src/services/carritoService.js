// ============================================
// CARRITOSERVICE.JS - SERVICIO DEL CARRITO
// ============================================
// REQUERIMIENTO: Sistema completo de carrito de compras
// Implementa todas las operaciones CRUD del carrito
// Todas las peticiones requieren autenticación (JWT)

import fetchAPI from './api';

export const carritoService = {
  // ============================================
  // OPERACIONES BÁSICAS DEL CARRITO (USUARIOS)
  // ============================================

  // obtenerCarrito() - Obtener carrito del usuario autenticado
  // Endpoint: GET /api/carrito
  // Retorna: { items: [...] } - Items con detalles de productos
  async obtenerCarrito() {
    return await fetchAPI('/carrito');
  },

  // agregarProducto(productId, quantity) - Agregar producto al carrito
  // Endpoint: POST /api/carrito/agregar
  // Parámetros:
  //   - productId: ID del producto a agregar
  //   - quantity: Cantidad (por defecto 1)
  // Comportamiento: Si ya existe, incrementa cantidad; si no, crea nuevo item
  async agregarProducto(productId, quantity = 1) {
    return await fetchAPI('/carrito/agregar', {
      method: 'POST',
      body: { productId, quantity },
    });
  },

  // actualizarCantidad(itemId, quantity) - Actualizar cantidad de un item
  // Endpoint: PUT /api/carrito/actualizar/:itemId
  // Parámetros:
  //   - itemId: ID de carrito_items (no el ID del producto)
  //   - quantity: Nueva cantidad
  async actualizarCantidad(itemId, quantity) {
    return await fetchAPI(`/carrito/actualizar/${itemId}`, {
      method: 'PUT',
      body: { quantity },
    });
  },

  // eliminarProducto(itemId) - Eliminar un producto del carrito
  // Endpoint: DELETE /api/carrito/eliminar/:itemId
  // Parámetros: itemId - ID de carrito_items
  async eliminarProducto(itemId) {
    return await fetchAPI(`/carrito/eliminar/${itemId}`, {
      method: 'DELETE',
    });
  },

  // vaciarCarrito() - Vaciar carrito completamente
  // Endpoint: DELETE /api/carrito/vaciar
  // Elimina todos los items del carrito activo del usuario
  async vaciarCarrito() {
    return await fetchAPI('/carrito/vaciar', {
      method: 'DELETE',
    });
  },

  // ============================================
  // CRUD COMPLETO - FUNCIONES ADMINISTRATIVAS
  // ============================================
  // REQUERIMIENTO: Gestión administrativa de carritos

  // listarTodosLosCarritos() - Listar todos los carritos (admin)
  // Endpoint: GET /api/carrito/admin/todos
  // Uso administrativo: Ver todos los carritos de todos los usuarios
  async listarTodosLosCarritos() {
    return await fetchAPI('/carrito/admin/todos');
  },

  // obtenerCarritoPorId(carritoId) - Obtener carrito específico (admin)
  // Endpoint: GET /api/carrito/admin/:carritoId
  // Parámetros: carritoId - ID del carrito a consultar
  async obtenerCarritoPorId(carritoId) {
    return await fetchAPI(`/carrito/admin/${carritoId}`);
  },

  // eliminarCarrito(carritoId) - Eliminar carrito completo (admin)
  // Endpoint: DELETE /api/carrito/admin/:carritoId
  // Parámetros: carritoId - ID del carrito a eliminar
  // Comportamiento: Elimina carrito y todos sus items (CASCADE)
  async eliminarCarrito(carritoId) {
    return await fetchAPI(`/carrito/admin/${carritoId}`, {
      method: 'DELETE',
    });
  },
};