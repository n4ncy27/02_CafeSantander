// Archivo: useAuth.js
// Hook personalizado para acceder al contexto de autenticación

import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  // Validación: asegurar que el hook se use dentro del proveedor
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
