// ============================================
// API.JS - CONFIGURACIÓN BASE DE PETICIONES HTTP
// ============================================
// REQUERIMIENTO: Comunicación Frontend-Backend
// Este archivo configura axios para hacer peticiones HTTP al backend
// Incluye interceptores para agregar automáticamente el token JWT
// ============================================

// Importar librería axios para peticiones HTTP
import axios from 'axios';

// ============================================
// URL BASE DE LA API
// ============================================
// URL del backend Express (puerto 5000)
// Esta constante se usa en todos los servicios
const API_BASE_URL = 'http://localhost:5000/api';

// ============================================
// CREAR INSTANCIA PERSONALIZADA DE AXIOS
// ============================================
// Crear una instancia de axios con configuración predeterminada
// Todas las peticiones usarán esta configuración base
const api = axios.create({
  baseURL: API_BASE_URL, // URL base para todas las peticiones
  headers: {
    'Content-Type': 'application/json', // Enviar y recibir JSON
  },
});

// ============================================
// INTERCEPTOR DE PETICIONES (REQUEST)
// ============================================
// REQUERIMIENTO: Agregar token JWT automáticamente a peticiones autenticadas
// Este interceptor se ejecuta ANTES de cada petición HTTP

api.interceptors.request.use(
  (config) => {
    // Obtener token JWT desde localStorage
    const token = localStorage.getItem('token');
    
    // Si existe token, agregarlo al header Authorization
    if (token) {
      // Formato: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Retornar configuración modificada
    return config;
  },
  (error) => {
    // Si hay error en el interceptor, rechazar la promesa
    return Promise.reject(error);
  }
);

// ============================================
// EXPORTAR CONFIGURACIÓN
// ============================================
// Exportar URL base para uso directo en fetch()
export { API_BASE_URL };

// Exportar instancia de axios configurada como default
// USO: import api from './services/api.js';
//      api.get('/productos');
//      api.post('/auth/login', { email, password });
export default api;