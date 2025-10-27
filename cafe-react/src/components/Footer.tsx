// Archivo: Footer.tsx
// Componente: pie de página con enlaces rápidos, políticas y contacto.
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer id="contacto">
      {/* El equipo ya se muestra en la sección correspondiente de la página Contacto/Acerca; se elimina aquí para evitar duplicado */}
      <div className="footer-content">
        <div className="footer-column">
          <h3>CaféSantander</h3>
          <p>Desde 1985 llevando el mejor café de las montañas de Santander directamente a tu hogar.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/acerca">Acerca</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Políticas</h3>
          <ul>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Política de Envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contacto</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> Santander, Colombia</li>
            <li><i className="fas fa-phone"></i> +57 321 456 7890</li>
            <li><i className="fas fa-envelope"></i> info@cafesantander.com</li>
            <li><i className="fas fa-clock"></i> Lun-Vie: 8am-6pm</li>
          </ul>
        </div>
      </div>

      {/* Pie inferior con derechos de autor */}
      <div className="footer-bottom">
        <p>&copy; 2023 CaféSantander. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
