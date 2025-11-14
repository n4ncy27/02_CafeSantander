import fetchAPI from './api';

export const carritoService = {
  async obtenerCarrito() {
    return await fetchAPI('/carrito');
  },

  async agregarProducto(productoId, cantidad = 1) {
    return await fetchAPI('/carrito/agregar', {
      method: 'POST',
      body: { producto_id: productoId, cantidad },
    });
  },

  async actualizarCantidad(itemId, cantidad) {
    return await fetchAPI(`/carrito/item/${itemId}`, {
      method: 'PUT',
      body: { cantidad },
    });
  },

  async eliminarProducto(itemId) {
    return await fetchAPI(`/carrito/item/${itemId}`, {
      method: 'DELETE',
    });
  },
};