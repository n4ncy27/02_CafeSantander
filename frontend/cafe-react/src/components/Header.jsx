// ============================================
// HEADER.JSX - CABECERA DE LA APLICACIÓN
// ============================================
// REQUERIMIENTO: Navegación principal con autenticación
// Características:
// - Menú responsive con toggle móvil
// - Integración con sistema de autenticación (login/logout)
// - Vista previa del carrito con contador
// - Modales de login, registro y perfil de usuario
// - Navegación con React Router (NavLink)

import { useState, useEffect } from 'react';
import useCart from '../hooks/useCart';
import { useAuth } from '../context/useAuthHook.js';
import { Dropdown, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import BootstrapLoginModal from './BootstrapLoginModal';
import UserProfileModal from './UserProfileModal';
import AdminLoginModal from './AdminLoginModal';

const Header = () => {
  // ============================================
  // ESTADO LOCAL
  // ============================================
  const [isNavActive, setIsNavActive] = useState(false);       // Control del menú móvil
  const [isModalOpen, setIsModalOpen] = useState(false);       // Modal de login/registro
  const [isProfileOpen, setIsProfileOpen] = useState(false);   // Modal de perfil de usuario
  const [activeAuthTab, setActiveAuthTab] = useState('login'); // Tab activo en modal (login/register) // Tab activo en modal (login/register)
  
  // ============================================
  // EFECTO: Escuchar eventos globales para abrir modal de login
  // ============================================
  // Caso de uso: Componentes como MandatoryAuthModal o PrivateRoute
  // disparan evento 'open-login-modal' cuando se requiere autenticación
  // Detail: { tab: 'login' | 'register' }
  useEffect(() => {
    const handler = (e) => {
      try {
        // Determinar qué tab mostrar según el evento
        const tab = e?.detail?.tab === 'register' ? 'register' : 'login';
        setActiveAuthTab(tab);
        setIsModalOpen(true);
      } catch {
        // Fallback a login si hay error
        setActiveAuthTab('login');
        setIsModalOpen(true);
      }
    };
    
    // Registrar listener al montar
    window.addEventListener('open-login-modal', handler);
    
    // Limpiar listener al desmontar
    return () => window.removeEventListener('open-login-modal', handler);
  }, []);

  // ============================================
  // FUNCIÓN: Toggle del menú móvil
  // ============================================
  const toggleNav = () => setIsNavActive(s => !s);

  // ============================================
  // HOOKS DE AUTENTICACIÓN Y CARRITO
  // ============================================
  // Obtener funciones de logout y estado de autenticación
  const { logout, isAuthenticated } = useAuth();

  // Obtener contador de items del carrito para mostrar badge
  const { count: hookCount } = useCart();

  // ============================================
  // FUNCIÓN: Mostrar notificaciones toast
  // ============================================
  // Utilidad para feedback visual (éxito/error)
  // Misma implementación en otros componentes para consistencia
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
          <NavLink to="/turismo" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsNavActive(false)}>Turismo</NavLink>
          <NavLink to="/contacto" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsNavActive(false)}>Contacto</NavLink>
          {/* enlace a la página principal con hash para desplazar a la sección productos */}
          {/* Usar Link con pathname+hash para que react-router actualice la ubicación sin recargar */}
          <Link to={{ pathname: '/', hash: '#productos' }} className="nav-link" onClick={() => setIsNavActive(false)}>Nuestros Productos</Link>
          <NavLink to="/encuesta" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsNavActive(false)}>Encuesta</NavLink>
        </nav>

        <div className="auth-buttons">
          {!isAuthenticated ? (
            <>
              <Button variant="outline-primary" size="sm" className="me-2" onClick={() => { setActiveAuthTab('login'); setIsModalOpen(true); }}>Iniciar Sesión</Button>
              <Button variant="outline-success" size="sm" className="me-2" onClick={() => { setActiveAuthTab('register'); setIsModalOpen(true); }}>Registrarse</Button>
              <AdminLoginModal />
            </>
          ) : (
            <>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-secondary" id="user-dropdown">Mi Cuenta</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setIsProfileOpen(true)}>Mi Perfil</Dropdown.Item>
                  <Dropdown.Item onClick={() => { logout(); showToast('Sesión cerrada', 'success'); }}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <AdminLoginModal />
            </>
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
