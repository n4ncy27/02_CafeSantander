import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Servicios from './pages/Servicios';
import Acerca from './pages/Acerca';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MandatoryAuthModal from './components/MandatoryAuthModal';

function App() {
  // Archivo: App.jsx
  // Componente raíz: define rutas y estructura general de la app.
  return (
    <AuthProvider>
      <MandatoryAuthModal />
      {/* Manejador de scroll: escucha cambios de ubicación (back/forward) y desplaza al hash o al inicio */}
      <ScrollHandler />
      <Routes>
        {/* Rutas principales de la aplicación */}
        <Route path="/" element={<Inicio />} />
        {/* Ruta protegida: solo accesible si el usuario está autenticado */}
        <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/acerca" element={<Acerca />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

// Manejador de scroll: debe declararse después del Router para usar hooks
function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    // En cada navegación: si hay un hash, intentar hacer scroll a ese elemento;
    // si no, desplazarse al principio de la página.
    const tryScrollToHash = (maxAttempts = 8) => {
      if (!location.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const id = location.hash.replace('#', '');
      let attempt = 0;

      const attemptScroll = () => {
        attempt += 1;
        const el = document.getElementById(id) || document.querySelector(location.hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }

        if (attempt < maxAttempts) {
          // reintentos con backoff exponencial aproximado: 50, 100, 200, 400...
          const delay = Math.min(500, 50 * Math.pow(2, attempt));
          setTimeout(attemptScroll, delay);
        } else {
          // última opción: no forzar salto brusco al tope para no molestar al usuario
          // se deja sin acción para evitar efectos molestos
        }
      };

      attemptScroll();
    };

    // programar en la siguiente macrotarea para dar tiempo a que los componentes
    // de la ruta se rendericen y el elemento exista en el DOM
    setTimeout(() => tryScrollToHash(10), 20);
  }, [location]);

  return null;
}
