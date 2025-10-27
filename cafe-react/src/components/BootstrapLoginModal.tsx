// Archivo: BootstrapLoginModal.tsx
// Componente: modal de acceso y registro con Bootstrap.
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const VALID_USER = { username: 'Admin', password: '1234', name: 'Admin' };

const BootstrapLoginModal: React.FC<{ show: boolean; onHide: () => void; initialTab?: 'login' | 'register' }> = ({ show, onHide, initialTab = 'login' }) => {
  const [tab, setTab] = useState<'login'|'register'>(initialTab);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  // estado para un captcha matemático simple
  const [captchaA, setCaptchaA] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [captchaB, setCaptchaB] = useState(() => Math.floor(Math.random() * 8) + 1);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const captchaRef = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCaptchaError(null);
  // validar captcha primero
    const expected = captchaA + captchaB;
    if (parseInt(captchaInput || '', 10) !== expected) {
      setCaptchaError('Respuesta de CAPTCHA incorrecta. Intenta de nuevo.');
      return;
    }
    if (username === VALID_USER.username && password === VALID_USER.password) {
      login({ id: `local:${username}`, name: VALID_USER.name, email: `${username.toLowerCase()}@local` });
      onHide();
    } else {
      setError('Usuario o contraseña incorrectos. Usa Admin / 1234');
    }
  };

  // enfocar input del captcha cuando se abra el modal en la pestaña de inicio
  useEffect(() => {
    if (show && tab === 'login') {
      // pequeño retardo para esperar la animación del modal
      const t = setTimeout(() => captchaRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [show, tab]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError(null);
    const expected = captchaA + captchaB;
    if (parseInt(captchaInput || '', 10) !== expected) {
      setCaptchaError('Respuesta de CAPTCHA incorrecta. Intenta de nuevo.');
      return;
    }
  // registro simulado: iniciar sesión con el nombre proporcionado por el profe
    login({ id: `local:${username}`, name: username || 'Usuario', email: `${username || 'user'}@local` });
    onHide();
  };

  return (
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
        {tab === 'login' ? (
            <Form onSubmit={handleLogin} className="login-form">
            <Form.Group className="mb-3" controlId="bs-login-username">
              <Form.Label>Usuario</Form.Label>
                <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Admin" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bs-login-password">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="1234" />
                <Button variant="outline-secondary" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                  <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                </Button>
              </InputGroup>
            </Form.Group>
            {/* CAPTCHA básico: pregunta matemática */}
            <Form.Group className="mb-3" controlId="bs-login-captcha">
              <Form.Label>CAPTCHA: ¿Cuánto es {captchaA} + {captchaB}?</Form.Label>
              <InputGroup>
                <Form.Control ref={captchaRef} value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Respuesta" aria-label="Respuesta CAPTCHA" />
                <Button variant="outline-secondary" onClick={() => { setCaptchaA(Math.floor(Math.random() * 8) + 2); setCaptchaB(Math.floor(Math.random() * 8) + 1); setCaptchaInput(''); setCaptchaError(null); }} aria-label="Refrescar CAPTCHA">↻</Button>
              </InputGroup>
              {captchaError && <div style={{ color: '#b02a37', marginTop: 6 }}>{captchaError}</div>}
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Button variant="primary" type="submit" className="login-submit">Entrar</Button>{' '}
                <Button variant="link" onClick={() => setTab('register')} className="muted-link">Crear cuenta</Button>
              </div>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handleRegister} className="login-form">
            <Form.Group className="mb-3" controlId="bs-register-name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tu nombre" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bs-register-email">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" placeholder="email@dominio.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bs-register-password">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="outline-secondary" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                  <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                </Button>
              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Button variant="success" type="submit" className="login-submit">Registrarse</Button>{' '}
                <Button variant="link" onClick={() => setTab('login')} className="muted-link">¿Ya tienes cuenta?</Button>
              </div>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BootstrapLoginModal;
