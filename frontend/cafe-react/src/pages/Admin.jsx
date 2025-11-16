// ============================================
// ADMIN.JSX - PANEL DE ADMINISTRACIÓN
// ============================================
// REQUERIMIENTO: Sistema de administración CRUD
// Funcionalidades:
// - Gestión de productos (crear, leer, actualizar, eliminar)
// - Gestión de usuarios (leer, actualizar, eliminar)
// - Estadísticas del sistema (total productos, usuarios, carritos)
// - Protección por credenciales (admin / 123)
// - Tabs para organizar funcionalidades

import { useState, useEffect } from 'react';
import { Container, Nav, Tab, Alert, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminProductos from '../components/AdminProductos';
import AdminUsuarios from '../components/AdminUsuarios';
import * as adminService from '../services/adminService';
import '../styles/admin.css';

export default function Admin() {
  const navigate = useNavigate();
  
  // ============================================
  // ESTADO LOCAL
  // ============================================
  const [activeTab, setActiveTab] = useState('productos'); // Tab activo (productos/usuarios)
  const [stats, setStats] = useState(null);                // Estadísticas del sistema
  const [loadingStats, setLoadingStats] = useState(true);  // Estado de carga
  const [error, setError] = useState('');                  // Mensajes de error

  // ============================================
  // EFECTO: Verificar autenticación de admin
  // ============================================
  // Si no hay flag isAdmin en localStorage, redirigir a home
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/');
    }
  }, [navigate]);

  // Cargar estadísticas
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const response = await adminService.getStats();
      setStats(response.stats);
      setError('');
    } catch (err) {
      setError('Error al cargar estadísticas: ' + err.message);
      console.error(err);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminLogin');
    navigate('/');
  };

  return (
    <Container fluid className="admin-container py-4">
      {/* Header de admin */}
      <div className="admin-header mb-4 p-4 rounded shadow-sm">
        <Row className="align-items-center">
          <Col>
            <div className="d-flex align-items-center gap-3">
              <div className="admin-icon">
                <i className="fas fa-coffee"></i>
              </div>
              <div>
                <h1 className="mb-1">Panel de Administración</h1>
                <p className="mb-0">Gestión de productos y usuarios de CaféSantander</p>
              </div>
            </div>
          </Col>
          <Col className="text-end">
            <Button variant="light" className="btn-logout" size="md" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>
              Cerrar Sesión
            </Button>
          </Col>
        </Row>
      </div>

      {/* Estadísticas */}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {loadingStats ? (
        <div className="text-center mb-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : stats ? (
        <Row className="mb-4 g-4">
          <Col xs={12} md={4}>
            <Card className="stats-card text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="stat-icon mb-3">
                  <i className="fas fa-box-open"></i>
                </div>
                <h3 className="mb-2">{stats.totalProductos}</h3>
                <p className="text-muted mb-0">Productos en Stock</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="stats-card text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="stat-icon mb-3">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="mb-2">{stats.totalUsuarios}</h3>
                <p className="text-muted mb-0">Usuarios Registrados</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="stats-card text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="stat-icon mb-3">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h3 className="mb-2">{stats.carritosPendientes}</h3>
                <p className="text-muted mb-0">Carritos Activos</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : null}

      {/* Tabs con secciones */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-4 admin-tabs">
          <Nav.Item>
            <Nav.Link eventKey="productos">
              <i className="fas fa-box me-2"></i>
              Gestión de Productos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="usuarios">
              <i className="fas fa-user-friends me-2"></i>
              Gestión de Usuarios
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="productos">
            <AdminProductos />
          </Tab.Pane>
          <Tab.Pane eventKey="usuarios">
            <AdminUsuarios />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}
