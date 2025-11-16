// components/AdminUsuarios.jsx
import { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Alert, Row, Col, Spinner } from 'react-bootstrap';
import * as adminService from '../services/adminService';
import '../styles/admin.css';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsuarios();
      setUsuarios(response.data || []);
      setError('');
    } catch (err) {
      setError('Error al cargar usuarios: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      cargarUsuarios();
      return;
    }

    try {
      setLoading(true);
      const response = await adminService.searchUsuarios(searchTerm);
      setUsuarios(response.data || []);
      setError('');
    } catch (err) {
      setError('Error en búsqueda: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (usuario = null) => {
    if (usuario) {
      setEditingId(usuario.id);
      setFormData({
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono || '',
        direccion: usuario.direccion || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        email: '',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      email: '',
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.nombre || !formData.apellido) {
      setError('Email, nombre y apellido son requeridos');
      return;
    }

    try {
      if (editingId) {
        await adminService.updateUsuario(editingId, formData);
        setError('');
        alert('Usuario actualizado exitosamente');
      } else {
        setError('No se pueden crear usuarios desde el admin. Los usuarios se registran desde la aplicación.');
        return;
      }
      handleCloseModal();
      cargarUsuarios();
    } catch (err) {
      setError('Error: ' + err.message);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario? Se eliminará también su carrito.')) {
      try {
        await adminService.deleteUsuario(id);
        alert('Usuario eliminado exitosamente');
        cargarUsuarios();
      } catch (err) {
        setError('Error al eliminar: ' + err.message);
        console.error(err);
      }
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Gestión de Usuarios</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Barra de búsqueda */}
      <Row className="mb-4" xs={1} md={1}>
        <Col>
          <Form onSubmit={handleSearch} className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Buscar por email, nombre o apellido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="secondary" type="submit">
              Buscar
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setSearchTerm('');
                cargarUsuarios();
              }}
            >
              Limpiar
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Tabla de usuarios */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : usuarios.length === 0 ? (
        <Alert variant="info">No hay usuarios para mostrar</Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.telefono || 'N/A'}</td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {usuario.direccion || 'N/A'}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleShowModal(usuario)}
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal de editar */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Actualizar Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
