// Página de Encuesta con QR
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/encuesta.css';

const Encuesta = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(null);
  const encuestaURL = 'https://forms.gle/YhJHj9RM8porf36t8';

  // Función para redirigir directamente a la encuesta
  const irAEncuesta = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          window.open(encuestaURL, '_blank');
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="main-container">
      <Header />
      <main className="encuesta-page">
        {/* Hero Section */}
        <section className="encuesta-hero">
          <div className="encuesta-hero-content">
            <h1>🎯 Cuéntanos tu opinión</h1>
            <p className="encuesta-subtitle">Tu experiencia nos ayuda a mejorar</p>
          </div>
        </section>

        {/* Contenido Principal */}
        <section className="encuesta-content container">
          <div className="encuesta-grid">
            {/* Columna Izquierda - Información */}
            <div className="encuesta-info">
              <div className="info-card">
                <div className="info-icon">📋</div>
                <h2>Encuesta de Gustos y Preferencias</h2>
                <p className="info-description">
                  En <strong>Café Santander</strong> valoramos tu opinión. Esta breve encuesta nos 
                  ayudará a conocer mejor tus gustos, preferencias y hábitos de consumo de café.
                </p>
                
                <div className="objetivo-box">
                  <h3>🎯 Objetivo</h3>
                  <p>
                    Recopilar información sobre los gustos, preferencias y hábitos de consumo de café 
                    de nuestros usuarios, con el fin de mejorar los sabores, aromas, presentaciones y 
                    productos ofrecidos por Café Santander.
                  </p>
                </div>

                <div className="beneficios-list">
                  <h3>✨ ¿Por qué participar?</h3>
                  <ul>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Ayúdanos a crear nuevos sabores según tus preferencias</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Influye en los productos que ofrecemos</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Mejora tu experiencia como cliente</span>
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i>
                      <span>Solo toma 2-3 minutos completarla</span>
                    </li>
                  </ul>
                </div>

                <button className="btn-encuesta-web" onClick={irAEncuesta}>
                  {countdown ? (
                    <>Redirigiendo en {countdown}s...</>
                  ) : (
                    <>
                      <i className="fas fa-external-link-alt"></i>
                      Ir a la Encuesta
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Columna Derecha - Código QR */}
            <div className="encuesta-qr">
              <div className="qr-card">
                <div className="qr-header">
                  <i className="fas fa-qrcode"></i>
                  <h3>Escanea el código QR</h3>
                </div>
                
                <div className="qr-image-container">
                  <img 
                    src="/imagenes/qr-encuesta.png" 
                    alt="Código QR - Encuesta Café Santander"
                    className="qr-code-image"
                  />
                  <div className="qr-shine"></div>
                </div>

                <div className="qr-instructions">
                  <h4>📱 ¿Cómo usar el código QR?</h4>
                  <ol>
                    <li>Abre la cámara de tu teléfono</li>
                    <li>Apunta al código QR</li>
                    <li>Toca la notificación que aparece</li>
                    <li>Completa la encuesta</li>
                  </ol>
                </div>

                <div className="qr-footer">
                  <p className="qr-note">
                    <i className="fas fa-info-circle"></i>
                    También puedes usar cualquier app lectora de QR
                  </p>
                </div>
              </div>

              {/* Botón alternativo móvil */}
              <div className="mobile-only">
                <button className="btn-encuesta-mobile" onClick={irAEncuesta}>
                  <i className="fas fa-mobile-alt"></i>
                  Abrir encuesta en este dispositivo
                </button>
              </div>
            </div>
          </div>

          {/* Sección de Estadísticas (opcional) */}
          <div className="encuesta-stats">
            <div className="stat-item">
              <div className="stat-number">2-3</div>
              <div className="stat-label">minutos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Anónima</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <i className="fas fa-heart"></i>
              </div>
              <div className="stat-label">Tu opinión cuenta</div>
            </div>
          </div>

          {/* Call to Action Final */}
          <div className="encuesta-cta">
            <h3>¿Ya completaste la encuesta?</h3>
            <p>¡Gracias por tu tiempo! Explora nuestros productos</p>
            <button 
              className="btn-back-productos"
              onClick={() => navigate('/#productos')}
            >
              <i className="fas fa-coffee"></i>
              Ver Productos
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Encuesta;
