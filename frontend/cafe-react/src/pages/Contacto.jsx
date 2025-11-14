// Archivo: Contacto.jsx
// Página: formulario de contacto, preguntas frecuentes y equipo de atención.

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/contacto.css';
import TeamModal from '../components/TeamModal';

// función showToast para notificaciones breves
const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
    ${message}
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

// Delegar render del encabezado al componente global Header
const PageHeader = () => <Header />;

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      showToast('Por favor completa todos los campos obligatorios', 'error');
      return;
    }
    setValidated(true);
    setSubmitting(true);
    // Simula envío
    setTimeout(() => {
      showToast('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitting(false);
      setValidated(false);
    }, 800);
  };

  return (
    <Form className="contact-form" noValidate validated={validated} onSubmit={handleSubmit}>
      <h3>Envíanos un Mensaje</h3>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nombre Completo *</Form.Label>
        <Form.Control name="name" required value={formData.name} onChange={handleChange} />
        <Form.Control.Feedback type="invalid">Por favor ingresa tu nombre.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Correo Electrónico *</Form.Label>
        <Form.Control type="email" name="email" required value={formData.email} onChange={handleChange} />
        <Form.Control.Feedback type="invalid">Ingresa un correo válido.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control name="phone" value={formData.phone} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="subject">
        <Form.Label>Asunto *</Form.Label>
        <Form.Select name="subject" required value={formData.subject} onChange={handleChange}>
          <option value="">Selecciona un asunto</option>
          <option value="general">Consulta General</option>
          <option value="productos">Información de Productos</option>
          <option value="pedidos">Pedidos y Envíos</option>
          <option value="socios">Socios y Distribuidores</option>
          <option value="quejas">Quejas y Sugerencias</option>
          <option value="otros">Otros</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">Selecciona un asunto.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="message">
        <Form.Label>Mensaje *</Form.Label>
        <Form.Control as="textarea" rows={5} name="message" placeholder="Escribe tu mensaje aquí..." required value={formData.message} onChange={handleChange} />
        <Form.Control.Feedback type="invalid">Escribe tu mensaje.</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={submitting} variant="primary">{submitting ? 'Enviando...' : 'Enviar Mensaje'}</Button>
    </Form>
  );
};

const FAQItem = ({ question, answer }) => {
  const [active, setActive] = useState(false);
  return (
    <div className={`faq-item ${active ? 'active' : ''}`}>
      <div className="faq-question" onClick={() => setActive((s) => !s)}>
        <span>{question}</span>
        <i className={`fas fa-chevron-${active ? 'up' : 'down'}`}></i>
      </div>
      <div className="faq-answer" style={{ maxHeight: active ? '200px' : '0' }}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

// Cada miembro del equipo se muestra como tarjeta clicable que abre un modal (ver más abajo)

const Contacto = () => {
  const faqItems = [
    { question: '¿Cuál es el tiempo de entrega de los pedidos?', answer: 'El tiempo de entrega varía según la ubicación. En áreas urbanas principales, los pedidos se entregan en 2-3 días hábiles. Para zonas rurales, puede tomar hasta 5 días hábiles. Ofrecemos seguimiento en tiempo real para todos los pedidos.' },
    { question: '¿Ofrecen envío internacional?', answer: 'Sí, realizamos envíos internacionales a la mayoría de países. Los tiempos de entrega y costos varían según el destino. Contáctanos para obtener una cotización específica para tu país.' },
    { question: '¿Puedo visitar su finca de café?', answer: '¡Por supuesto! Ofrecemos tours guiados por nuestra finca donde podrás conocer nuestro proceso de cultivo y producción. Los tours deben reservarse con al menos 48 horas de anticipación. Contáctanos para coordinar tu visita.' },
    { question: '¿Tienen opciones de café descafeinado?', answer: 'Sí, ofrecemos varias opciones de café descafeinado procesado con métodos naturales que preservan el sabor y aroma del café. Consulta nuestra sección de productos para ver las variedades disponibles.' },
    { question: '¿Ofrecen descuentos por compras al por mayor?', answer: 'Sí, ofrecemos precios especiales para cafeterías, restaurantes y distribuidores. Los descuentos varían según el volumen de compra. Contáctanos para discutir tus necesidades específicas.' }
  ];

  const teamMembers = [
    { name: 'César Avila', role: 'Director general', email: 'cesar@cafesantander.com', phone: '+57 321 456 7891', image: '/imagenes/integrante2.jpg' },
    { name: 'Liliana Saenz', role: 'Especialista en Ventas', email: 'lili@cafesantander.com', phone: '+57 321 456 7892', image: '/imagenes/integrante1.jpg' },
    { name: 'Juan Neira', role: 'Coordinadora de Pedidos', email: 'jneira@cafesantander.com', phone: '+57 321 456 7893', image: '/imagenes/integrante3.jpg' },
    { name: 'Carlos Pimienta', role: 'Soporte Técnico', email: 'pimienta@cafesantander.com', phone: '+57 321 456 7894', image: '/imagenes/integrante4.jpg' }
  ];

  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  const openMemberModal = (m) => { setSelectedMember(m); setShowMemberModal(true); };
  const closeMemberModal = () => { setSelectedMember(null); setShowMemberModal(false); };

  return (
    <div className="main-container">
      <PageHeader />

      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para responder todas tus preguntas sobre nuestro café y servicios</p>
        </div>
      </section>

      <div className="contact-container">
        <section className="contact-section">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div className="contact-text"><h4>Nuestra Ubicación</h4><p>Santander, Colombia<br/>Finca La Esperanza, Vereda El Cafetal</p></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                <div className="contact-text"><h4>Teléfono</h4><p>+57 321 456 7890<br/>Lun-Vie: 8:00am - 6:00pm</p></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <div className="contact-text"><h4>Email</h4><p>info@cafesantander.com<br/>ventas@cafesantander.com</p></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-clock"></i></div>
                <div className="contact-text"><h4>Horarios de Atención</h4><p>Lunes a Viernes: 8am - 6pm<br/>Sábados: 9am - 2pm</p></div>
              </div>
            </div>
            <h4>Síguenos en redes sociales</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>

          <ContactForm />
        </section>

        <section className="map-section">
          <h2 className="section-title">Nuestra Ubicación</h2>
          <div className="map-container">
            <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-73.07174%2C6.60889%2C-73.05174%2C6.62889&layer=mapnik&marker=6.61889%2C-73.06174" width="100%" height="400" style={{ border: 'none', borderRadius: '8px' }} title="Ubicación de CaféSantander en OpenStreetMap" allowFullScreen />
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Nuestro Equipo de Atención</h2>
          <div className="team-grid">
            {teamMembers.map((m, i) => (
              <div key={i} className="team-member" onClick={() => openMemberModal(m)} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') openMemberModal(m); }}>
                <div className="member-image"><img src={m.image} alt={m.name} /></div>
                <div className="member-info">
                  <h3>{m.name}</h3>
                  <div className="member-role">{m.role}</div>
                  <div className="member-contact"><div><i className="fas fa-envelope"></i> <a href={`mailto:${m.email}`}>{m.email}</a></div><div><i className="fas fa-phone"></i> {m.phone}</div></div>
                </div>
              </div>
            ))}
          </div>
          <TeamModal show={showMemberModal} onHide={closeMemberModal} member={selectedMember} />
        </section>

        <section className="hours-section">
          <h2 className="section-title">Horarios de Atención</h2>
          <div className="hours-container">
            <ul className="hours-list">
              <li><span className="day">Lunes - Viernes</span><span className="time">8:00 AM - 6:00 PM</span></li>
              <li><span className="day">Sábados</span><span className="time">9:00 AM - 2:00 PM</span></li>
              <li><span className="day">Domingos</span><span className="time">Cerrado</span></li>
              <li><span className="day">Festivos</span><span className="time">Horario especial</span></li>
            </ul>
          </div>
        </section>

        <section className="faq-section">
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <div className="faq-container">
            {faqItems.map((f, i) => (<FAQItem key={i} question={f.question} answer={f.answer} />))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contacto;
