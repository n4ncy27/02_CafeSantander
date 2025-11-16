import fetchAPI from './api';

export const carritoService = {
  // Obtener carrito del usuario autenticado
  async obtenerCarrito() {
    return await fetchAPI('/carrito');
  },

  // Agregar producto al carrito
  async agregarProducto(productId, quantity = 1) {
    return await fetchAPI('/carrito/agregar', {
      method: 'POST',
      body: { productId, quantity },
    });
  },

  // Actualizar cantidad de un item
  async actualizarCantidad(itemId, quantity) {
    return await fetchAPI(`/carrito/actualizar/${itemId}`, {
      method: 'PUT',
      body: { quantity },
    });
  },

  // Eliminar producto del carrito
  async eliminarProducto(itemId) {
    return await fetchAPI(`/carrito/eliminar/${itemId}`, {
      method: 'DELETE',
    });
  },

  // Vaciar carrito completamente
  async vaciarCarrito() {
    return await fetchAPI('/carrito/vaciar', {
      method: 'DELETE',
    });
  },

  // CRUD Completo - Funciones administrativas

  // Listar todos los carritos (admin)
  async listarTodosLosCarritos() {
    return await fetchAPI('/carrito/admin/todos');
  },

  // Obtener carrito específico por ID (admin)
  async obtenerCarritoPorId(carritoId) {
    return await fetchAPI(`/carrito/admin/${carritoId}`);
  },

  // Eliminar carrito completo (admin)
  async eliminarCarrito(carritoId) {
    return await fetchAPI(`/carrito/admin/${carritoId}`, {
      method: 'DELETE',
    });
  },
};