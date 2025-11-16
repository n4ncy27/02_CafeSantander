// ============================================
// FORGOTPASSWORDMODAL.JSX - MODAL DE RECUPERACIÓN DE CONTRASEÑA
// ============================================
// REQUERIMIENTO: Recuperación de contraseña por email
// Funcionalidad:
// - Usuario ingresa su email registrado
// - Backend genera contraseña temporal aleatoria
// - Backend hashea nueva contraseña y actualiza BD
// - Backend envía email con contraseña temporal (nodemailer)
// - Usuario recibe email y puede iniciar sesión con nueva contraseña

import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import '../styles/auth-modals.css';

const ForgotPasswordModal = ({ show, onClose }) => {
  // ============================================
  // ESTADO LOCAL
  // ============================================
  const [email, setEmail] = useState('');        // Email del usuario
  const [loading, setLoading] = useState(false); // Estado de carga
  const [message, setMessage] = useState('');    // Mensaje de éxito
  const [error, setError] = useState('');        // Mensaje de error

  // ============================================
  // HANDLER: Enviar solicitud de recuperación
  // ============================================
  // Endpoint: POST /api/auth/forgot-password
  // Body: { email }
  // Backend:
  // 1. Busca usuario por email
  // 2. Genera contraseña temporal: Math.random().toString(36).slice(-8)
  // 3. Hashea con bcrypt(password, 10)
  // 4. Actualiza tabla usuarios
  // 5. Envía email con nodemailer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al enviar solicitud');
        return;
      }

      setMessage('✅ Contraseña temporal enviada. Revisa tu email en 2-3 minutos.');
      setEmail('');
      setTimeout(() => {
        onClose();
        setMessage('');
      }, 3000);
    } catch (err) {
      setError('Error de conexión. Intenta más tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered className="forgot-password-modal">
      <Modal.Header closeButton className="auth-modal-header">
        <Modal.Title>🔐 Recuperar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        
        <p className="text-muted small">
          Ingresa tu email registrado y recibirás una contraseña temporal.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Contraseña Temporal'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
