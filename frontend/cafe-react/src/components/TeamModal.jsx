// Archivo: TeamModal.jsx
// Modal para mostrar la ficha de un miembro del equipo (imagen, rol, bio y detalles).
import { Modal, Button } from 'react-bootstrap';

// Componente: modal que recibe visibilidad, callback de cierre y el miembro a mostrar
const TeamModal = ({ show, onHide, member }) => {
  // Si no hay miembro seleccionado no renderizamos nada
  if (!member) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        {/* Título con el nombre del miembro */}
        <Modal.Title>{member.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 140px' }}>
            {/* Imagen del miembro (si existe) */}
            <img
              src={member.image || '/imagenes/integrante1.jpg'}
              alt={member.name}
              style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: 8 }}
              onError={(e) => { e.target.onerror = null; e.target.src = '/imagenes/integrante1.jpg'; }}
            />
          </div>
          <div style={{ flex: 1 }}>
            {/* Rol y bio */}
            <p style={{ marginBottom: 8, fontWeight: 600 }}>{member.role}</p>
            {member.bio && <p style={{ color: '#444' }}>{member.bio}</p>}

            {/* Sección de detalles opcionales */}
            {member.details && (
              <div style={{ marginTop: 10 }}>
                <h6>Detalles</h6>
                <ul>
                  {member.details.experiencia && <li><strong>Experiencia:</strong> {member.details.experiencia}</li>}
                  {member.details.especialidad && <li><strong>Especialidad:</strong> {member.details.especialidad}</li>}
                  {member.details.logros && <li><strong>Logros:</strong> {member.details.logros}</li>}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Botón para cerrar el modal */}
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamModal;
