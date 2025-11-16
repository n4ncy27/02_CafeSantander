// ============================================
// APP.JSX - COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================
// REQUERIMIENTO: Single Page Application (SPA) con React
// Este es el componente raíz que configura:
// - Sistema de rutas (React Router)
// - Contexto de autenticación global
// - Rutas protegidas (PrivateRoute)
// - Scroll automático entre páginas
// ============================================

// Importar hooks de React
import { useEffect } from 'react';

// Importar componentes de React Router para navegación SPA
import { Routes, Route, useLocation } from 'react-router-dom';

// Importar todas las páginas de la aplicación
import Inicio from './pages/Inicio';           // Página principal con productos
import Carrito from './pages/Carrito';         // Carrito de compras (protegida)
import Contacto from './pages/Contacto';       // Formulario de contacto
import Servicios from './pages/Servicios';     // Servicios ofrecidos
import Acerca from './pages/Acerca';           // Información de la empresa
import Admin from './pages/Admin';             // Panel administrativo
import Turismo from './pages/Turismo';         // Información turística
import Encuesta from './pages/Encuesta';       // Formulario de encuesta

// Importar contexto y componentes de autenticación
import { AuthProvider } from './context/AuthContext';  // Proveedor de autenticación
import PrivateRoute from './components/PrivateRoute';  // Componente para rutas protegidas

// ============================================
// COMPONENTE PRINCIPAL APP
// ============================================
function App() {
  return (
    // AuthProvider envuelve toda la aplicación para que cualquier componente
    // pueda acceder al estado de autenticación (usuario logueado, token JWT, etc.)
    <AuthProvider>
      {/* ScrollHandler maneja el scroll automático al cambiar de página */}
      <ScrollHandler />
      
      {/* ============================================
          CONFIGURACIÓN DE RUTAS
          ============================================
          REQUERIMIENTO: Navegación SPA sin recargar página
          Cada Route define una URL y el componente a renderizar */}
      <Routes>
        {/* Ruta raíz - Página de inicio */}
        <Route path="/" element={<Inicio />} />
        
        {/* RUTA PROTEGIDA - Carrito solo accesible si el usuario está autenticado
            PrivateRoute verifica el token JWT antes de mostrar el componente */}
        <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
        
        {/* Rutas públicas - accesibles sin autenticación */}
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/turismo" element={<Turismo />} />
        <Route path="/encuesta" element={<Encuesta />} />
        
        {/* Ruta de administración */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

// ============================================
// COMPONENTE SCROLLHANDLER
// ============================================
// FUNCIONALIDAD: Manejo inteligente del scroll al cambiar de ruta
// 
// COMPORTAMIENTOS:
// 1. Si la ruta tiene un hash (#productos), hace scroll a esa sección
// 2. Si no tiene hash, hace scroll al inicio de la página
// 3. Usa reintentos para esperar a que el DOM esté listo
// 
// EJEMPLO: Al navegar a "/#productos", hace scroll automático a la sección de productos
function ScrollHandler() {
  // useLocation obtiene la ubicación actual (pathname, hash, search)
  const location = useLocation();

  // useEffect se ejecuta cada vez que cambia la ubicación (ruta)
  useEffect(() => {
    /**
     * Función que intenta hacer scroll al elemento indicado en el hash
     * @param {number} maxAttempts - Número máximo de intentos para encontrar el elemento
     */
    const tryScrollToHash = (maxAttempts = 8) => {
      // Si no hay hash (#), simplemente hacer scroll al inicio
      if (!location.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Extraer el ID del hash (quitando el #)
      // Ejemplo: "#productos" -> "productos"
      const id = location.hash.replace('#', '');
      let attempt = 0; // Contador de intentos

      /**
       * Función recursiva que intenta encontrar y hacer scroll al elemento
       * Se ejecuta múltiples veces porque el elemento puede no estar listo inmediatamente
       */
      const attemptScroll = () => {
        attempt += 1;
        
        // Intentar encontrar el elemento por ID o por selector CSS
        const el = document.getElementById(id) || document.querySelector(location.hash);
        
        if (el) {
          // Si se encuentra el elemento, calcular posición y hacer scroll
          // Se resta 120px para compensar el header fijo
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: 'smooth' });
          return; // Terminar ejecución exitosa
        }

        // Si no se encontró y aún quedan intentos, reintentar después de un delay
        if (attempt < maxAttempts) {
          // El delay aumenta exponencialmente: 50ms, 100ms, 200ms, 400ms...
          // Esto da tiempo al DOM para renderizarse completamente
          const delay = Math.min(500, 50 * Math.pow(2, attempt));
          setTimeout(attemptScroll, delay);
        }
      };

      attemptScroll(); // Iniciar el primer intento
    };

    // Esperar 20ms antes de iniciar el proceso de scroll
    // Esto asegura que React haya terminado de renderizar
    setTimeout(() => tryScrollToHash(10), 20);
  }, [location]); // Re-ejecutar cuando cambie la ubicación

  return null; // Este componente no renderiza nada visual
}
