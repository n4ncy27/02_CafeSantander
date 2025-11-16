// ============================================
// PRIVATEROUTE.JSX - COMPONENTE DE RUTA PROTEGIDA
// ============================================
// REQUERIMIENTO: Protección de rutas según autenticación
// Este componente envuelve rutas que solo deben ser accesibles
// para usuarios autenticados (ejemplo: página de carrito)
// ============================================

// Importar hook personalizado de autenticación
import { useAuth } from '../context/useAuthHook.js';
// Importar Navigate para redireccionar usuarios no autenticados
import { Navigate } from 'react-router-dom';

/**
 * Componente PrivateRoute
 * 
 * FUNCIONALIDAD:
 * - Verifica si el usuario está autenticado
 * - Si está autenticado: muestra el componente hijo (children)
 * - Si no está autenticado: redirige a la página de inicio
 * 
 * USO:
 * <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
 * 
 * @param {ReactNode} children - Componente a proteger
 */
const PrivateRoute = ({ children }) => {
  // Obtener estado de autenticación desde el contexto global
  const { isAuthenticated, loading } = useAuth();

  // ============================================
  // ESTADO DE CARGA
  // ============================================
  // Mientras se verifica la autenticación (cargando sesión de localStorage)
  // mostrar mensaje de carga para evitar parpadeos
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // ============================================
  // DECISIÓN DE ACCESO
  // ============================================
  // Si está autenticado (tiene token JWT válido), mostrar el componente
  // Si no está autenticado, redirigir a la página de inicio
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
