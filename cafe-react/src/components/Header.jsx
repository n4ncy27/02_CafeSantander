// Archivo: Header.jsx
// Componente: cabecera de la aplicación con navegación y controles de usuario.
import { useState, useEffect } from 'react';
import useCart from '../hooks/useCart';
import { useAuth } from '../context/useAuthHook.js';
import { Dropdown, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import BootstrapLoginModal from './BootstrapLoginModal';
import UserProfileModal from './UserProfileModal';
// El header mantiene la estructura para que el CSS de página siga funcionando.
const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState('login');
  // escuchar eventos globales para abrir el modal de login (ej. MandatoryAuthModal)
  useEffect(() => {
    const handler = (e) => {
      try {
        const tab = e?.detail?.tab === 'register' ? 'register' : 'login';
        setActiveAuthTab(tab);
        setIsModalOpen(true);
      } catch {
        setActiveAuthTab('login');
        setIsModalOpen(true);
      }
    };
    window.addEventListener('open-login-modal', handler);
    return () => window.removeEventListener('open-login-modal', handler);
  }, []);

  const toggleNav = () => setIsNavActive(s => !s);

  const { logout, isAuthenticated } = useAuth();

  const { count: hookCount } = useCart();

  // util de notificaciones breves (misma funcionalidad en otros componentes)
  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `\n      <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i> ${message}\n    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => document.body.removeChild(toast), 300); }, 3000);
  };

  return (
    <>
      <header>
        <div className="d-flex align-items-center">
          <Link to="/" className="logo d-flex align-items-center" onClick={() => setIsNavActive(false)}>
            <img src="/imagenes/logoCafe.png" alt="logo" />
            CaféSantander
          </Link>
          {/* ayuda (ícono eliminado por solicitud del diseño) */}
        </div>

        <nav className={`main-nav ${isNavActive ? 'active' : ''}`} id="main-navigation" aria-hidden={!isNavActive}>
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsNavActive(false)}>Inicio</NavLink>
          <NavLink to="/acerca" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsNavActive(false)}>Acerca</NavLink>
          <NavLink to="/servicios" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsNavActive(false)}>Servicios</NavLink>
          <NavLink to="/contacto" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsNavActive(false)}>Contacto</NavLink>
          {/* enlace a la página principal con hash para desplazar a la sección productos */}
          {/* Usar Link con pathname+hash para que react-router actualice la ubicación sin recargar */}
          <Link to={{ pathname: '/', hash: '#productos' }} className="nav-link" onClick={() => setIsNavActive(false)}>Nuestros Productos</Link>
        </nav>

        <div className="auth-buttons">
          {!isAuthenticated ? (
            <>
              <Button variant="outline-primary" size="sm" className="me-2" onClick={() => { setActiveAuthTab('login'); setIsModalOpen(true); }}>Iniciar Sesión</Button>
              <Button variant="outline-success" size="sm" onClick={() => { setActiveAuthTab('register'); setIsModalOpen(true); }}>Registrarse</Button>
            </>
          ) : (
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-secondary" id="user-dropdown">Mi Cuenta</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setIsProfileOpen(true)}>Mi Perfil</Dropdown.Item>
                <Dropdown.Item onClick={() => { logout(); showToast('Sesión cerrada', 'success'); }}>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
    {/* Icono de carrito siempre visible; no autenticado abre modal, si autenticado va a /carrito */}
          {isAuthenticated ? (
            <Link to="/carrito" className="cart-icon ms-3" aria-label="Ver carrito">
              <i className="fas fa-shopping-cart"></i>
              {hookCount > 0 && <span className="cart-count">{hookCount}</span>}
            </Link>
          ) : (
            <button 
              onClick={() => { setActiveAuthTab('login'); setIsModalOpen(true); }} 
              className="cart-icon ms-3" 
              aria-label="Ver carrito" 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--text)' }}
            >
              <i className="fas fa-shopping-cart"></i>
              {hookCount > 0 && <span className="cart-count">{hookCount}</span>}
            </button>
          )}
        </div>

        <button
          className="menu-toggle"
          id="menu-toggle"
          onClick={toggleNav}
          aria-controls="main-navigation"
          aria-expanded={isNavActive}
          aria-label={isNavActive ? 'Cerrar menú' : 'Abrir menú'}
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
      </header>

      {/* Modal de login con Bootstrap */}
      <BootstrapLoginModal show={isModalOpen} onHide={() => setIsModalOpen(false)} initialTab={activeAuthTab} />
      
      {/* Modal de perfil del usuario */}
      <UserProfileModal show={isProfileOpen} onHide={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Header;
