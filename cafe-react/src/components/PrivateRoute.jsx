// Componente: PrivateRoute
// - Propósito: proteger rutas que requieren autenticación.
// - Comportamiento: si el usuario NO está autenticado, redirige a la página de inicio (/).

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const PrivateRoute = ({ children }) => {
  // Obtener estado de autenticación desde el contexto
  const { isAuthenticated } = useAuth();

  // Si no hay sesión activa, redirigir al inicio (reemplaza la entrada en el historial)
  if (!isAuthenticated) return <Navigate to="/" replace />;

  // Si está autenticado, renderizar el hijo protegido
  return children;
};

export default PrivateRoute;
