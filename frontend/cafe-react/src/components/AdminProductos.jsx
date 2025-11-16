// components/AdminProductos.jsx
import { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Alert, Row, Col, Spinner } from 'react-bootstrap';
import * as adminService from '../services/adminService';
import '../styles/admin.css';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    disponible: true,
    imagen: ''
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllProductos();
      setProductos(response.data || []);
      setError('');
    } catch (err) {
      setError('Error al cargar productos: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      cargarProductos();
      return;
    }

    try {
      setLoading(true);
      const response = await adminService.searchProductos(searchTerm);
      setProductos(response.data || []);
      setError('');
    } catch (err) {
      setError('Error en búsqueda: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (producto = null) => {
    if (producto) {
      setEditingId(producto.id);
      setFormData({
        nombre: producto.nombre,
        precio: producto.precio,
        disponible: producto.disponible === 1,
        imagen: producto.imagen || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        nombre: '',
        precio: '',
        disponible: true,
        imagen: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      nombre: '',
      precio: '',
      disponible: true,
      imagen: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.precio) {
      setError('El nombre y precio son requeridos');
      return;
    }

    try {
      if (editingId) {
        await adminService.updateProducto(editingId, formData);
        setError('');
        alert('Producto actualizado exitosamente');
      } else {
        await adminService.createProducto(formData);
        setError('');
        alert('Producto creado exitosamente');
      }
      handleCloseModal();
      cargarProductos();
    } catch (err) {
      setError('Error: ' + err.message);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      try {
        await adminService.deleteProducto(id);
        alert('Producto eliminado exitosamente');
        cargarProductos();
      } catch (err) {
        setError('Error al eliminar: ' + err.message);
        console.error(err);
      }
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Gestión de Productos</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Barra de búsqueda y botón agregar */}
      <Row className="mb-4" xs={1} md={2} gap={3}>
        <Col>
          <Form onSubmit={handleSearch} className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
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
                cargarProductos();
              }}
            >
              Limpiar
            </Button>
          </Form>
        </Col>
        <Col>
          <Button
            variant="success"
            onClick={() => handleShowModal()}
            className="w-100"
          >
            + Nuevo Producto
          </Button>
        </Col>
      </Row>

      {/* Tabla de productos */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : productos.length === 0 ? (
        <Alert variant="info">No hay productos para mostrar</Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Disponible</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio ? Number(producto.precio).toFixed(2) : '0.00'}</td>
                  <td>
                    <span className={`badge ${producto.disponible === 1 ? 'bg-success' : 'bg-danger'}`}>
                      {producto.disponible === 1 ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td className="text-center">
                    {producto.imagen ? (
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        className="admin-product-img"
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          objectFit: 'cover',
                          borderRadius: '6px',
                          border: '2px solid #f9f5f0'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60"%3E%3Crect fill="%23f9f5f0" width="60" height="60"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="12" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ESin imagen%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div 
                        className="no-image-placeholder"
                        style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: '#f9f5f0',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: '#666',
                          border: '2px solid #e0e0e0'
                        }}
                      >
                        Sin imagen
                      </div>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleShowModal(producto)}
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(producto.id)}
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

      {/* Modal de agregar/editar */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? 'Editar Producto' : 'Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ej: Café Espresso"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Ej: 7000"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleInputChange}
                placeholder="Ej: /imagenes/cafe/espresso.jpg"
              />
              {formData.imagen && (
                <div className="mt-3 text-center">
                  <p className="text-muted mb-2" style={{ fontSize: '0.875rem' }}>Vista previa:</p>
                  <img 
                    src={formData.imagen} 
                    alt="Vista previa"
                    style={{ 
                      maxWidth: '200px', 
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '2px solid #e7a33d'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    style={{ 
                      display: 'none',
                      padding: '1rem',
                      backgroundColor: '#f9f5f0',
                      borderRadius: '8px',
                      color: '#666',
                      fontSize: '0.875rem'
                    }}
                  >
                    Imagen no disponible
                  </div>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="disponible"
                label="Disponible"
                checked={formData.disponible}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {editingId ? 'Actualizar' : 'Crear'} Producto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
