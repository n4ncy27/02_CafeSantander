import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Servicios from './pages/Servicios';
import Acerca from './pages/Acerca';
import Admin from './pages/Admin';
import Turismo from './pages/Turismo';
import Encuesta from './pages/Encuesta';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/turismo" element={<Turismo />} />
        <Route path="/encuesta" element={<Encuesta />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
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
          const delay = Math.min(500, 50 * Math.pow(2, attempt));
          setTimeout(attemptScroll, delay);
        }
      };

      attemptScroll();
    };

    setTimeout(() => tryScrollToHash(10), 20);
  }, [location]);

  return null;
}
