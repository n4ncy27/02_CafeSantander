// Archivo: Header.tsx
// Componente: cabecera de la aplicación con navegación y controles de usuario.
import React, { useRef, useState } from 'react';
import useCart from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { Dropdown, OverlayTrigger, Popover, Button, Overlay, Form, InputGroup } from 'react-bootstrap';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import BootstrapLoginModal from './BootstrapLoginModal';
// El header mantiene la estructura para que el CSS de página siga funcionando.
const Header: React.FC = () => {
  const [isNavActive, setIsNavActive] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeAuthTab, setActiveAuthTab] = React.useState<'login' | 'register'>('login');
  // escuchar eventos globales para abrir el modal de login (ej. MandatoryAuthModal)
  React.useEffect(() => {
    const handler = (e: Event) => {
      try {
        const ce = e as CustomEvent;
        const tab = ce?.detail?.tab === 'register' ? 'register' : 'login';
        setActiveAuthTab(tab as 'login' | 'register');
        setIsModalOpen(true);
      } catch (err) {
        setActiveAuthTab('login');
        setIsModalOpen(true);
      }
    };
    window.addEventListener('open-login-modal', handler as EventListener);
    return () => window.removeEventListener('open-login-modal', handler as EventListener);
  }, []);
  // estado del popover de acceso inline (anclado al botón Acceder)
  const [showInlineLogin, setShowInlineLogin] = useState(false);
  const accBtnRef = useRef<HTMLButtonElement | null>(null);
  const [inlineUser, setInlineUser] = useState('');
  const [inlinePass, setInlinePass] = useState('');
  const [inlineShowPass, setInlineShowPass] = useState(false);
  const [captchaA_inline] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [captchaB_inline] = useState(() => Math.floor(Math.random() * 8) + 1);
  const [captchaInputInline, setCaptchaInputInline] = useState('');

  const toggleNav = () => setIsNavActive(s => !s);
  const openAuthModal = (tab: 'login' | 'register' = 'login') => { setActiveAuthTab(tab); setIsModalOpen(true); };
  const closeAuthModal = () => setIsModalOpen(false);

  const { logout, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handler legado: abrir modal Bootstrap para autenticación
    setIsModalOpen(true);
  };

  const handleInlineLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // validar captcha
    const expected = captchaA_inline + captchaB_inline;
    if (parseInt(captchaInputInline || '', 10) !== expected) {
      showToast('Respuesta de CAPTCHA incorrecta.', 'error');
      return;
    }
    // credenciales fijas para pruebas como ,o esteble la guia Admin / 1234
    if (inlineUser === 'Admin' && inlinePass === '1234') {
      login({ id: `local:${inlineUser}`, name: 'Admin', email: `${inlineUser.toLowerCase()}@local` });
      showToast('Sesión iniciada correctamente', 'success');
      setShowInlineLogin(false);
    } else {
      showToast('Usuario o contraseña incorrectos. Usa Admin / 1234', 'error');
    }
  };

  const { count: hookCount } = useCart();

  // util de notificaciones breves (misma funcionalidad en otros componentes)
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
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
              <Button ref={accBtnRef} variant="outline-primary" size="sm" className="me-2" onClick={() => { setShowInlineLogin(s => !s); setActiveAuthTab('login'); setIsModalOpen(false); }}>Acceder</Button>
              <Overlay target={accBtnRef.current} show={showInlineLogin} placement="bottom" rootClose onHide={() => setShowInlineLogin(false)}>
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <Popover id="inline-login" {...props} style={{ minWidth: 320, maxWidth: 360, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
                    <Popover.Body>
                      <Form onSubmit={(e) => { e.preventDefault(); handleInlineLogin(); }}>
                        <Form.Group className="mb-2">
                          <Form.Label>Usuario</Form.Label>
                          <Form.Control value={inlineUser} onChange={(e) => setInlineUser(e.target.value)} placeholder="Admin" />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Contraseña</Form.Label>
                          <InputGroup>
                            <Form.Control type={inlineShowPass ? 'text' : 'password'} value={inlinePass} onChange={(e) => setInlinePass(e.target.value)} placeholder="1234" />
                            <Button variant="outline-secondary" onClick={() => setInlineShowPass(s => !s)} aria-label="Mostrar / ocultar contraseña">
                              <i className={`fas fa-eye${inlineShowPass ? '-slash' : ''}`}></i>
                            </Button>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-2 captcha-group">
                          <Form.Label>CAPTCHA: ¿Cuánto es {captchaA_inline} + {captchaB_inline}?</Form.Label>
                          <InputGroup>
                            <Form.Control value={captchaInputInline} onChange={(e) => setCaptchaInputInline(e.target.value)} placeholder="Respuesta" />
                          </InputGroup>
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <Button variant="primary" size="sm" onClick={() => handleInlineLogin()}>Entrar</Button>{' '}
                            <Button variant="link" size="sm" onClick={() => { setActiveAuthTab('register'); setIsModalOpen(true); setShowInlineLogin(false); }}>Crear cuenta</Button>
                          </div>
                        </div>
                      </Form>
                    </Popover.Body>
                  </Popover>
                )}
              </Overlay>
              <Button variant="outline-success" size="sm" onClick={() => { setActiveAuthTab('register'); setIsModalOpen(true); }}>Registrarse</Button>
            </>
          ) : (
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-secondary" id="user-dropdown">Cuenta</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/perfil">Mi Perfil</Dropdown.Item>
                <Dropdown.Item onClick={() => { logout(); showToast('Sesión cerrada', 'success'); }}>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
    {/* Icono de carrito siempre visible; no autenticado abre modal, si autenticado va a /carrito */}
          <Link to="/carrito" className="cart-icon ms-3" aria-label="Ver carrito">
            <i className="fas fa-shopping-cart"></i>
            {hookCount > 0 && <span className="cart-count">{hookCount}</span>}
          </Link>
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
    </>
  );
};

export default Header;
