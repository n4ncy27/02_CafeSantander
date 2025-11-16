// ============================================
// BOOTSTRAPLOGINMODAL.JSX - MODAL DE LOGIN/REGISTRO
// ============================================
// REQUERIMIENTO: Modal centralizado para autenticación
// Características:
// - Dos tabs: Login y Registro
// - Validación con CAPTCHA matemático (suma)
// - Toggle para mostrar/ocultar contraseña
// - Credenciales de prueba mostradas en alert
// - Integración con backend (/api/auth/login y /api/auth/register)
// - Modal de recuperación de contraseña

import { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { useAuth } from '../context/useAuthHook.js';
import ForgotPasswordModal from './ForgotPasswordModal';

const BootstrapLoginModal = ({ show, onHide, initialTab = 'login' }) => {
  // ============================================
  // ESTADO LOCAL DEL MODAL
  // ============================================
  const [tab, setTab] = useState(initialTab);                    // 'login' | 'register'
  const [email, setEmail] = useState('');                        // Email del usuario
  const [nombre, setNombre] = useState('');                      // Nombre (solo registro)
  const [password, setPassword] = useState('');                  // Contraseña
  const [error, setError] = useState(null);                      // Mensaje de error
  const [loading, setLoading] = useState(false);                 // Estado de carga
  const [showPassword, setShowPassword] = useState(false);       // Toggle para mostrar contraseña
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Modal de recuperación
  
  // ============================================
  // CAPTCHA MATEMÁTICO (SUMA)
  // ============================================
  // REQUERIMIENTO: Validación anti-bot simple
  // Genera dos números aleatorios y pide su suma
  const [captchaA, setCaptchaA] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [captchaB, setCaptchaB] = useState(() => Math.floor(Math.random() * 8) + 1);
  const [captchaInput, setCaptchaInput] = useState('');          // Respuesta del usuario
  const [captchaError, setCaptchaError] = useState(null);        // Error de CAPTCHA
  const captchaRef = useRef(null);                               // Referencia para autofocus
  
  const { login } = useAuth();

  // ============================================
  // EFECTO: Sincronizar tab con prop initialTab
  // ============================================
  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  // ============================================
  // HANDLER: Login de usuario
  // ============================================
  // REQUERIMIENTO: Autenticación con JWT
  // Proceso:
  // 1. Validar CAPTCHA
  // 2. POST /api/auth/login con credenciales
  // 3. Backend retorna { token, user }
  // 4. Guardar token en localStorage
  // 5. Actualizar contexto de autenticación
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setCaptchaError(null);

    const expected = captchaA + captchaB;
    if (parseInt(captchaInput || '0', 10) !== expected) {
      setCaptchaError('Respuesta de CAPTCHA incorrecta. Intenta de nuevo.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      localStorage.setItem('token', data.token);
      login({ id: data.user.id, nombre: data.user.nombre, email: data.user.email }, data.token);
      setEmail('');
      setPassword('');
      setCaptchaInput('');
      onHide();
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté corriendo.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // HANDLER: Registro de nuevo usuario
  // ============================================
  // REQUERIMIENTO: Creación de cuentas de usuario
  // Proceso:
  // 1. Validar CAPTCHA
  // 2. Validar campos requeridos (email, nombre, password)
  // 3. POST /api/auth/register
  // 4. Backend valida email, hashea contraseña (bcrypt), inserta en BD
  // 5. Cambiar a tab de login y mostrar mensaje de éxito
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setCaptchaError(null);

    const expected = captchaA + captchaB;
    if (parseInt(captchaInput || '0', 10) !== expected) {
      setCaptchaError('Respuesta de CAPTCHA incorrecta. Intenta de nuevo.');
      return;
    }

    if (!email || !nombre || !password) {
      setError('Todos los campos son requeridos');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al registrarse');
        return;
      }

      // Cambiar a tab de login para que se autentique
      setTab('login');
      setError(null);
      // Mostrar mensaje de éxito
      alert('¡Usuario creado exitosamente! Ahora inicia sesión con tus credenciales.');
      setNombre('');
      setEmail('');
      setPassword('');
      setCaptchaInput('');
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté corriendo.');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show && tab === 'login') {
      const t = setTimeout(() => captchaRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [show, tab]);

  return (
    <>
      <Modal show={show} onHide={onHide} centered className="login-modal">
        <Modal.Header closeButton className="login-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: 'linear-gradient(135deg,#f0c27b,#4b1248)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
              ☕
            </div>
            <div>
              <Modal.Title style={{ margin: 0 }}>{tab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</Modal.Title>
              <div style={{ fontSize: 12, color: '#666' }}>{tab === 'login' ? 'Accede con tu cuenta' : 'Crea tu cuenta rápidamente'}</div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {tab === 'login' && (
            <Alert variant="info" style={{ 
              backgroundColor: '#f9f5f0', 
              borderColor: '#e7a33d', 
              color: '#3a2611',
              borderLeft: '4px solid #e7a33d',
              fontSize: '14px'
            }}>
              <strong>Credenciales de prueba ya registradas:</strong>
              <div style={{ marginTop: '8px' }}>
                <div>Usuario: un_usr@gmail.com</div>
                <div>Contraseña: una_clave</div>
              </div>
            </Alert>
          )}
          {tab === 'login' ? (
              <Form onSubmit={handleLogin} className="login-form">
              <Form.Group className="mb-3" controlId="bs-login-email">
                <Form.Label>Usuario</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Usuario" disabled={loading} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bs-login-password">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" disabled={loading} />
                  <Button variant="outline-secondary" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} disabled={loading}>
                    <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                  </Button>
                </InputGroup>
                <Button variant="link" size="sm" onClick={() => setShowForgotPassword(true)} className="mt-2 p-0" style={{ textDecoration: 'none' }}>
                  ¿Olvidaste tu contraseña?
                </Button>
              </Form.Group>
              {/* CAPTCHA básico: pregunta matemática */}
              <Form.Group className="mb-3" controlId="bs-login-captcha">
                <Form.Label>CAPTCHA: ¿Cuánto es {captchaA} + {captchaB}?</Form.Label>
                <InputGroup>
                  <Form.Control ref={captchaRef} value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Respuesta" aria-label="Respuesta CAPTCHA" disabled={loading} />
                  <Button variant="outline-secondary" onClick={() => { setCaptchaA(Math.floor(Math.random() * 8) + 2); setCaptchaB(Math.floor(Math.random() * 8) + 1); setCaptchaInput(''); setCaptchaError(null); }} aria-label="Refrescar CAPTCHA" disabled={loading}>↻</Button>
                </InputGroup>
                {captchaError && <div style={{ color: '#b02a37', marginTop: 6 }}>{captchaError}</div>}
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Button variant="primary" type="submit" className="login-submit" disabled={loading}>{loading ? 'Cargando...' : 'Entrar'}</Button>{' '}
                  <Button variant="link" onClick={() => { setTab('register'); setError(null); setCaptchaError(null); }} className="muted-link" disabled={loading}>Crear cuenta</Button>
                </div>
              </div>
            </Form>
          ) : (
            <Form onSubmit={handleRegister} className="login-form">
              <Form.Group className="mb-3" controlId="bs-register-name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" disabled={loading} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bs-register-email">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" disabled={loading} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="bs-register-password">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" disabled={loading} />
                  <Button variant="outline-secondary" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} disabled={loading}>
                    <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                  </Button>
                </InputGroup>
              </Form.Group>
              {/* CAPTCHA básico: pregunta matemática */}
              <Form.Group className="mb-3" controlId="bs-register-captcha">
                <Form.Label>CAPTCHA: ¿Cuánto es {captchaA} + {captchaB}?</Form.Label>
                <InputGroup>
                  <Form.Control value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Respuesta" aria-label="Respuesta CAPTCHA" disabled={loading} />
                  <Button variant="outline-secondary" onClick={() => { setCaptchaA(Math.floor(Math.random() * 8) + 2); setCaptchaB(Math.floor(Math.random() * 8) + 1); setCaptchaInput(''); setCaptchaError(null); }} aria-label="Refrescar CAPTCHA" disabled={loading}>↻</Button>
                </InputGroup>
                {captchaError && <div style={{ color: '#b02a37', marginTop: 6 }}>{captchaError}</div>}
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Button variant="success" type="submit" className="login-submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</Button>{' '}
                  <Button variant="link" onClick={() => { setTab('login'); setError(null); setCaptchaError(null); }} className="muted-link" disabled={loading}>¿Ya tienes cuenta?</Button>
                </div>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <ForgotPasswordModal show={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
    </>
  );
};

export default BootstrapLoginModal;
