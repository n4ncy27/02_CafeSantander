// Archivo: Acerca.jsx
// Página: Información sobre la empresa, equipo, valores y multimedia.

import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/acerca.css';
import TeamModal from '../components/TeamModal';
import Carousel from 'react-bootstrap/Carousel';

// Componente simple que delega el encabezado global
const PageHeader = () => <Header />;

// Carrusel de imágenes de la finca (react-bootstrap)
function ImageCarousel() {
  const images = [
    { src: '/imagenes/cafe2.jpg', caption: 'Vista panorámica de nuestra finca en las montañas de Santander' },
    { src: '/imagenes/cafe1.jpg', caption: 'Primeras flores del cafeto - señal de una buena cosecha' },
    { src: '/imagenes/cafe3.jpg', caption: 'Áreas de cultivo con sombra natural para un desarrollo óptimo' },
    { src: '/imagenes/cafe4.jpg', caption: 'Granos de café en su punto perfecto de maduración' },
    { src: '/imagenes/cafe5.jpg', caption: 'Detalle de los frutos del cafeto - la esencia de nuestro trabajo' },
    { src: '/imagenes/cafe7.jpg', caption: 'Espacios de descanso entre nuestros cultivos' },
    { src: '/imagenes/cafe8.jpg', caption: 'El proceso natural del café - del verde al rojo intenso' },
    { src: '/imagenes/cafe9.jpg', caption: 'Racimos cargados listos para la cosecha manual' },
    { src: '/imagenes/cafe10.jpg', caption: 'Café en desarrollo - el futuro de CaféSantander' }
  ];

  return (
    <section className="carousel-section">
      <h2 className="section-title">Nuestra Finca en Imágenes</h2>
      <Carousel fade pause={false} indicators interval={8000} className="mb-4">
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100 carousel-img" src={img.src} alt={img.caption} />
            <Carousel.Caption>
              <h3>{img.caption}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

// Tarjeta interactiva para cada miembro del equipo (abre modal con detalles)
function TeamMember({ member }) {
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <>
      <div className="team-member" onClick={open} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') open(); }}>
        <div className="member-image"><img src={member.image} alt={member.name} /></div>
        <div className="member-info">
          <h3>{member.name}</h3>
          <div className="member-role">{member.role}</div>
          <p className="member-bio">{member.bio}</p>
        </div>
      </div>
      <TeamModal show={show} onHide={close} member={member} />
    </>
  );
}

// Número animado para la sección de estadísticas (conteo incremental)
function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < value) {
      const increment = Math.max(1, Math.floor(value / 50));
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= value) { clearInterval(timer); return value; }
          return next;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [value, count]);

  return <>{Math.floor(count)}</>;
}

// Sección de estadísticas que inicia la animación al hacerse visible
function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.5 });
    const section = document.querySelector('.achievements');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 38, label: 'Años de Experiencia' },
    { number: 500, label: 'Familias Beneficiadas', plus: true },
    { number: 25, label: 'Premios de Calidad' },
    { number: 15, label: 'Países que Exportamos' }
  ];

  return (
    <section className="achievements">
      <h2 className="section-title">Nuestros Logros</h2>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-number">{isVisible ? <AnimatedNumber value={s.number} /> : '0'}{s.plus ? '+' : ''}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Datos de ejemplo del equipo (usado para renderizar la sección "Conoce Nuestro Equipo")
const teamMembers = [
  { id: 1, name: 'César Ávila', role: 'Director General', bio: 'Estudiante.', image: '/imagenes/integrante2.jpg', details: { experiencia: '25 años en la industria del café', especialidad: 'Gestión de fincas y relaciones internacionales', logros: 'Expansión a 15 países internacionales' }, social: { linkedin: '#', twitter: '#' } },
  { id: 2, name: 'Liliana Sáenz', role: 'Directora de Calidad', bio: 'Estudiante', image: '/imagenes/integrante1.jpg', details: { experiencia: '18 años en control de calidad', especialidad: 'Catación y desarrollo de perfiles de sabor', certificaciones: 'Q Grader, SCA Certified' }, social: { linkedin: '#', instagram: '#' } },
  { id: 3, name: 'Juan Neira', role: 'Jefe de Cultivo', bio: 'Estudiante.', image: '/imagenes/integrante3.jpg', details: { experiencia: '30 años en cultivo de café', especialidad: 'Agricultura sostenible y orgánica', logros: 'Implementación de prácticas regenerativas' }, social: { facebook: '#', twitter: '#' } },
  { id: 4, name: 'Carlos Pimienta', role: 'Director de Sostenibilidad', bio: 'Estudiante.', image: '/imagenes/integrante4.jpg', details: { experiencia: '12 años en sostenibilidad', especialidad: 'Certificaciones ambientales y sociales', logros: 'Certificación Rainforest Alliance' }, social: { linkedin: '#', instagram: '#' } }
];

// Página principal de "Acerca": historia, multimedia, valores y equipo
const AboutPage = () => {
  return (
    <div className="main-container">
      <PageHeader />

      <section className="about-hero">
        <div className="hero-content">
          <h1>Nuestra Historia</h1>
          <p>Tres generaciones dedicadas al cultivo del mejor café de Santander</p>
        </div>
      </section>

      <div className="about-container">
        <ImageCarousel />

        <section className="our-story">
          {/* Imagen lateral para `Nuestra Historia` - mantiene paridad visual con el HTML original */}
          <div className="story-image">
            <img src="/imagenes/cafe2.jpg" alt="Nuestra finca - nuestra historia" />
          </div>

          <div className="story-content">
            <h2 className="section-title">Desde 1985</h2>
            <p>Todo comenzó en las montañas de Santander, donde Don José Avila, nuestro fundador, cultivaba café con pasión y dedicación. Lo que empezó como una pequeña finca familiar se ha convertido en un legado que perdura por tres generaciones.</p>
            <p>Hoy, continuamos con las mismas tradiciones y valores que nos inculcó Don José: respeto por la tierra, compromiso con la calidad y pasión por el café excepcional.</p>
            <p>Cada taza de CaféSantander contiene no solo el sabor único de nuestras montañas, sino también la historia de una familia que ha dedicado su vida a perfeccionar el arte del cultivo del café.</p>
          </div>
        </section>
        {/* Video embed: Compromiso con la Sostenibilidad */}
        <section className="video-section">
          <div className="sustainability-content">
            <h2 className="section-title">Café Premium: Lujo en Cada Taza</h2>
            <p>La calidad y el sabor de nuestro café en un video cinematográfico.</p>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/df3JeXVWYWA"
                title="CaféSantander - Café Premium: Lujo en Cada Taza"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* Local media: video + audio reproducidos desde public/ */}
            <div className="local-media">
              <div className="media-card">
                <h3 className="media-title">Cosecha de Origen: Esfuerzo en Cada Grano</h3>
                <p className="media-desc">Observa la dedicación. Manos que conocen el valor del esfuerzo recogen esta cosecha. Un proceso auténtico que revela la esencia del mejor café.</p>
                <div className="media-player">
                  <div className="video-player-wrapper">
                    <video className="video-player" controls preload="metadata" poster="/imagenes/video_poster.jpg">
                      <source src="/video/Video.mp4" type="video/mp4" />
                      Tu navegador no soporta la reproducción de video.
                    </video>
                    <button className="play-overlay" aria-hidden="true"><i className="fas fa-play"></i></button>
                  </div>
                </div>
              </div>

              <div className="media-card">
                <h3 className="media-title">Audio, El Alma de la Tierra</h3>
                <p className="media-desc">Escucha la historia. Cultivado entre la niebla y el sol, este café nace de la tradición y la pasión. No solo se bebe, ¡se siente!</p>
                <div className="media-player">
                  <div className="audio-player-wrapper">
                    <audio className="audio-player" controls preload="metadata">
                      <source src="/audio/cafe_santander_audio.wav" type="audio/wav" />
                      Tu navegador no soporta la reproducción de audio.
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="our-values">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card"><div className="value-icon"><i className="fas fa-seedling"></i></div><h3>Sostenibilidad</h3><p>Practicamos agricultura sostenible que respeta el medio ambiente y beneficia a nuestras comunidades locales.</p></div>
            <div className="value-card"><div className="value-icon"><i className="fas fa-award"></i></div><h3>Calidad</h3><p>Nos comprometemos con los más altos estándares de calidad en cada etapa de nuestro proceso.</p></div>
            <div className="value-card"><div className="value-icon"><i className="fas fa-heart"></i></div><h3>Pasión</h3><p>Amamos lo que hacemos y esa pasión se refleja en cada grano de café que producimos.</p></div>
            <div className="value-card"><div className="value-icon"><i className="fas fa-hands-helping"></i></div><h3>Comunidad</h3><p>Trabajamos en estrecha colaboración con nuestras comunidades para crear un impacto positivo.</p></div>
          </div>
        </section>

        <section className="our-team">
          <h2 className="section-title">Conoce Nuestro Equipo</h2>
          <div className="team-grid">
            {teamMembers.map(m => <TeamMember key={m.id} member={m} />)}
          </div>
        </section>

        <AnimatedStats />

        <section className="sustainability">
          <div className="sustainability-content">
            <h2 className="section-title">Compromiso con la Sostenibilidad</h2>
            <p>En CaféSantander creemos que un buen café no solo debe saber bien, sino que también debe hacer el bien. Por eso, hemos implementado prácticas que garantizan un impacto positivo en nuestro entorno y comunidades.</p>

            <div className="sustainability-features">
              <div className="sustainability-feature"><i className="fas fa-recycle"></i><h3>Agricultura Regenerativa</h3><p>Utilizamos técnicas que mejoran la salud del suelo y promueven la biodiversidad.</p></div>
              <div className="sustainability-feature"><i className="fas fa-hand-holding-heart"></i><h3>Comercio Justo</h3><p>Garantizamos precios justos para nuestros productores y condiciones laborales dignas.</p></div>
              <div className="sustainability-feature"><i className="fas fa-tint"></i><h3>Gestión del Agua</h3><p>Implementamos sistemas de riego eficientes y tratamos nuestras aguas residuales.</p></div>
              <div className="sustainability-feature"><i className="fas fa-leaf"></i><h3>Energía Limpia</h3><p>Utilizamos energía solar en nuestras instalaciones de procesamiento.</p></div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
