import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import '../styles/auth-modals.css';

const ForgotPasswordModal = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
