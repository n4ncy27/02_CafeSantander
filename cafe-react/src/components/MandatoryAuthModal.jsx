import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuthHook.js';

const MandatoryAuthModal = () => {
  const { isAuthenticated, login } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('mandatoryAuthDismissed') === '1';
    setVisible(!isAuthenticated && !dismissed);
  }, [isAuthenticated]);

  if (isAuthenticated || !visible) return null;

  const handleQuickLogin = () => {
    login({ 
      id: 'local:admin', 
      name: 'Admin', 
      email: 'admin@local' 
    });
    setVisible(false);
  };

  const handleOpenAuthModal = () => {
    try { 
      window.dispatchEvent(new CustomEvent('open-login-modal', { detail: { tab: 'login' } })); 
    } catch (error) {
      console.log('Error al abrir modal:', error);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('mandatoryAuthDismissed', '1');
    setVisible(false);
  };

  return (
    <div style={{ position: 'fixed', top: 12, right: 12, zIndex: 1060 }}>
      <div style={{ 
        background: '#fff7ef', 
        border: '1px solid #ffddb3', 
        padding: '10px 14px', 
        borderRadius: 8, 
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)', 
        minWidth: 280 
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#8a4b00' }}>Regístrate o inicia sesión</div>
            <div style={{ fontSize: 13, color: '#6b4b2b' }}>Para acceder al carrito y a funciones personalizadas.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 10 }}>
            <button 
              onClick={handleOpenAuthModal}
              style={{ 
                background: 'transparent', 
                border: '1px solid #f0c27b', 
                color: '#8a4b00', 
                padding: '6px 10px', 
                borderRadius: 6 
              }}
            >
              Acceder / Registrarse
            </button>
            <button 
              onClick={handleQuickLogin}
              style={{ 
                background: '#f6a11c', 
                border: 'none', 
                color: '#fff', 
                padding: '6px 10px', 
                borderRadius: 6 
              }}
            >
              Entrar (Admin)
            </button>
            <button 
              aria-label="Cerrar" 
              onClick={handleDismiss}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#8a4b00', 
                fontSize: 16 
              }}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandatoryAuthModal;
