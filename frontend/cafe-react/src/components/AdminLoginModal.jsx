// components/AdminLoginModal.jsx
import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginModal() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Credenciales de admin
  const ADMIN_USER = 'admin';
  const ADMIN_PASSWORD = '123';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (usuario === ADMIN_USER && contrasena === ADMIN_PASSWORD) {
      // Guardar en localStorage que es admin
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminLogin', new Date().toISOString());
      
      setLoading(false);
      setShow(false);
      setUsuario('');
      setContrasena('');
      
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setError('');
    setUsuario('');
    setContrasena('');
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        style={{
          backgroundColor: '#8B4513',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        Admin
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Acceso de Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="admin"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="123"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Validando...' : 'Iniciar Sesión'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
