// ============================================
// USEAUTHHOOK.JS - HOOK PERSONALIZADO DE AUTENTICACIÓN
// ============================================
// REQUERIMIENTO: Hook para consumir el contexto de autenticación
// Simplifica el acceso al AuthContext desde cualquier componente

import { useContext } from 'react';
import AuthContext from './AuthContext';

// ============================================
// useAuth() - Hook personalizado
// ============================================
// Propósito: Proporcionar acceso fácil al contexto de autenticación
// Uso: const { user, token, login, logout, isAuthenticated } = useAuth();
// Validación: Lanza error si se usa fuera del AuthProvider
export const useAuth = () => {
  // Obtener contexto de autenticación
  const context = useContext(AuthContext);
  
  // Validar que el hook se use dentro del AuthProvider
  // Esto previene errores de context undefined
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  
  // Retornar objeto con todas las propiedades del contexto:
  // { user, token, loading, login, logout, isAuthenticated }
  return context;
};
