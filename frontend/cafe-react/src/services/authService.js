// ============================================
// AUTHSERVICE.JS - SERVICIO DE AUTENTICACIÓN
// ============================================
// REQUERIMIENTO: Comunicación con endpoints de autenticación
// Funciones para registro, login y obtención de perfil

import fetchAPI from './api';

export const authService = {
  // ============================================
  // register(userData) - Registrar nuevo usuario
  // ============================================
  // Endpoint: POST /api/auth/registro
  // Parámetros: userData { email, password, nombre, apellido, telefono, direccion }
  // Proceso: Backend valida email, hashea contraseña (bcrypt), inserta en BD
  // Retorna: Objeto con mensaje de éxito
  async register(userData) {
    return await fetchAPI('/auth/registro', {
      method: 'POST',
      body: userData,
    });
  },

  // ============================================
  // login(credentials) - Iniciar sesión
  // ============================================
  // Endpoint: POST /api/auth/login
  // Parámetros: credentials { email, password }
  // Proceso: Backend verifica credenciales con bcrypt, genera JWT
  // Retorna: { token, user } - Token JWT y datos del usuario
  // El token se guarda en localStorage por AuthContext
  async login(credentials) {
    return await fetchAPI('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  // ============================================
  // getProfile() - Obtener perfil del usuario autenticado
  // ============================================
  // Endpoint: GET /api/auth/perfil
  // Requiere: Token JWT en headers (añadido automáticamente por interceptor)
  // Retorna: Datos completos del usuario (email, nombre, apellido, etc.)
  async getProfile() {
    return await fetchAPI('/auth/perfil');
  },
};