// services/adminService.js - Servicio para las llamadas de admin
import api from './api';

// ============================================
// PRODUCTOS
// ============================================

export const getAllProductos = async () => {
  try {
    const response = await api.get('/admin/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await api.get(`/admin/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

export const createProducto = async (producto) => {
  try {
    const response = await api.post('/admin/productos', producto);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const updateProducto = async (id, producto) => {
  try {
    const response = await api.put(`/admin/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await api.delete(`/admin/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

export const searchProductos = async (query) => {
  try {
    const response = await api.get('/admin/productos/search', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error al buscar productos:', error);
    throw error;
  }
};

// ============================================
// USUARIOS
// ============================================

export const getAllUsuarios = async () => {
  try {
    const response = await api.get('/admin/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/admin/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
};

export const updateUsuario = async (id, usuario) => {
  try {
    const response = await api.put(`/admin/usuarios/${id}`, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`/admin/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

export const searchUsuarios = async (query) => {
  try {
    const response = await api.get('/admin/usuarios/search', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    throw error;
  }
};

// ============================================
// ESTADÍSTICAS
// ============================================

export const getStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};
