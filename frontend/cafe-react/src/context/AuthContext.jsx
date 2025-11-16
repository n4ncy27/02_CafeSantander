// ============================================
// AUTHCONTEXT.JSX - CONTEXTO DE AUTENTICACIÓN GLOBAL
// ============================================
// REQUERIMIENTO: Sistema de autenticación con JWT
// Este contexto global permite que cualquier componente de la aplicación
// acceda al estado de autenticación del usuario sin prop drilling
// 
// FUNCIONALIDADES:
// - Almacenar usuario y token JWT en el estado global
// - Persistir autenticación en localStorage
// - Funciones login y logout accesibles desde cualquier componente
// - Verificación automática de sesión al cargar la aplicación
// ============================================

// Importar hooks de React
import { createContext, useState, useEffect } from 'react';

// ============================================
// CREAR CONTEXTO
// ============================================
// createContext() crea un contexto que puede ser consumido por componentes hijos
// null es el valor por defecto (será reemplazado por el Provider)
const AuthContext = createContext(null);

// ============================================
// COMPONENTE PROVEEDOR DE AUTENTICACIÓN
// ============================================
/**
 * AuthProvider envuelve la aplicación y proporciona el contexto de autenticación
 * a todos los componentes hijos
 * 
 * @param {ReactNode} children - Componentes hijos que tendrán acceso al contexto
 */
export const AuthProvider = ({ children }) => {
  // ============================================
  // ESTADO DEL CONTEXTO
  // ============================================
  
  // Estado del usuario autenticado (nombre, email, etc.)
  const [user, setUser] = useState(null);
  
  // Token JWT para peticiones autenticadas
  const [token, setToken] = useState(null);
  
  // Estado de carga inicial (mientras verifica sesión guardada)
  const [loading, setLoading] = useState(true);

  // ============================================
  // EFECTO: CARGAR SESIÓN GUARDADA AL INICIAR
  // ============================================
  // REQUERIMIENTO: Persistencia de sesión entre recargas de página
  useEffect(() => {
    // Intentar recuperar token y usuario desde localStorage
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('cafe_user');
    
    // Si existen ambos, restaurar la sesión
    if (savedToken && savedUser) {
      try {
        setToken(savedToken); // Restaurar token JWT
        setUser(JSON.parse(savedUser)); // Parsear y restaurar datos del usuario
      } catch (error) {
        // Si hay error al parsear, limpiar localStorage
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('cafe_user');
      }
    }
    
    setLoading(false); // Terminar estado de carga
  }, []); // Solo ejecutar una vez al montar

  // ============================================
  // FUNCIÓN: LOGIN
  // ============================================
  /**
   * Inicia sesión guardando usuario y token
   * @param {object} userData - Datos del usuario (nombre, email, etc.)
   * @param {string} authToken - Token JWT del backend
   */
  const login = (userData, authToken) => {
    setUser(userData); // Guardar usuario en el estado
    
    if (authToken) {
      setToken(authToken); // Guardar token en el estado
      localStorage.setItem('token', authToken); // Persistir token
    }
    
    // Persistir datos del usuario en localStorage
    localStorage.setItem('cafe_user', JSON.stringify(userData));
  };

  // ============================================
  // FUNCIÓN: LOGOUT
  // ============================================
  /**
   * Cierra sesión limpiando el estado y localStorage
   */
  const logout = () => {
    setUser(null);  // Limpiar usuario del estado
    setToken(null); // Limpiar token del estado
    localStorage.removeItem('cafe_user'); // Limpiar localStorage
    localStorage.removeItem('token');
  };

  // ============================================
  // VALOR DEL CONTEXTO
  // ============================================
  // Este objeto será accesible desde cualquier componente que use useAuth()
  const value = {
    user,              // Datos del usuario actual
    token,             // Token JWT
    login,             // Función para iniciar sesión
    logout,            // Función para cerrar sesión
    loading,           // Estado de carga inicial
    isAuthenticated: !!token && !!user // Boolean: ¿está autenticado?
  };

  // ============================================
  // PROVEEDOR DEL CONTEXTO
  // ============================================
  // AuthContext.Provider hace que el valor esté disponible para todos los hijos
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportar el contexto para ser consumido por useContext(AuthContext)
export default AuthContext;