// ============================================
// PRODUCTOSERVICE.JS - SERVICIO DE PRODUCTOS
// ============================================
// REQUERIMIENTO: Integración con API de productos del backend
// Proporciona funciones para consumir endpoints de productos

import api from './api';

export const productoService = {
  // ============================================
  // obtenerProductos() - Obtener lista completa de productos
  // ============================================
  // Endpoint: GET /api/productos
  // Retorna: Array de objetos producto
  // Usado en: Inicio.jsx, Productos.jsx para mostrar catálogo
  async obtenerProductos() {
    try {
      // api ya tiene configurado el baseURL y los interceptores JWT
      const response = await api.get('/productos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  // ============================================
  // obtenerProducto(id) - Obtener detalle de un producto
  // ============================================
  // Endpoint: GET /api/productos/:id
  // Parámetros: id (number) - ID del producto
  // Retorna: Objeto producto con todos sus detalles
  // Usado en: Vistas de detalle de producto (si se implementan)
  async obtenerProducto(id) {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },
};