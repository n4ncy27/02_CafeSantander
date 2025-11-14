import fetchAPI from './api';

export const productoService = {
  async obtenerProductos() {
    return await fetchAPI('/productos');
  },

  async obtenerProducto(id) {
    return await fetchAPI(`/productos/${id}`);
  },
};