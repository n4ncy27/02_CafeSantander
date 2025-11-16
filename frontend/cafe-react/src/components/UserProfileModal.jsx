// ============================================
// USERPROFILEMODAL.JSX - MODAL DE PERFIL DE USUARIO
// ============================================
// REQUERIMIENTO: Vista de información del usuario autenticado
// Muestra:
// - Avatar con inicial del nombre
// - Nombre completo
// - Email
// - ID de usuario
// - Botón de cerrar sesión

import { useAuth } from '../context/useAuthHook.js';
import { Modal, Button, Alert } from 'react-bootstrap';

const UserProfileModal = ({ show, onHide }) => {
  // Obtener datos del usuario del contexto de autenticación
  const { user, logout } = useAuth();

  // ============================================
  // HANDLER: Cerrar sesión
  // ============================================
  // Proceso:
  // 1. Llamar función logout del AuthContext
  // 2. Limpiar localStorage (token)
  // 3. Cerrar modal
  const handleLogout = () => {
    logout();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="user-profile-modal">
      <Modal.Header closeButton className="user-profile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#f0c27b,#4b1248)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '24px' }}>
            {user?.name?.charAt(0)?.toUpperCase() || '👤'}
          </div>
          <div>
            <Modal.Title style={{ margin: 0 }}>Mi Perfil</Modal.Title>
            <div style={{ fontSize: 12, color: '#666' }}>Información de tu cuenta</div>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <div style={{ padding: '10px 0' }}>
            <div style={{ marginBottom: '20px' }}>
              <Alert variant="info" style={{ marginBottom: '15px' }}>
                Bienvenido, <strong>{user.name}</strong>
              </Alert>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: '600', color: '#333', display: 'block', marginBottom: '5px' }}>Nombre</label>
              <p style={{ margin: 0, color: '#666' }}>{user.name}</p>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: '600', color: '#333', display: 'block', marginBottom: '5px' }}>Email</label>
              <p style={{ margin: 0, color: '#666' }}>{user.email}</p>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: '600', color: '#333', display: 'block', marginBottom: '5px' }}>ID de Usuario</label>
              <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>{user.id}</p>
            </div>

            <hr style={{ margin: '20px 0' }} />

            <div style={{ textAlign: 'center' }}>
              <Button 
                variant="danger" 
                onClick={handleLogout}
                style={{ width: '100%' }}
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        ) : (
          <Alert variant="warning">No hay información de usuario disponible</Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UserProfileModal;