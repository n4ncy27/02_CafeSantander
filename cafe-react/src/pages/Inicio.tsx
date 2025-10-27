// Archivo: Inicio.tsx
// Página principal: hero, productos destacados y secciones informativas.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import '../styles/global.css';
import useCart from '../hooks/useCart';

// Delegar el encabezado al componente global para mantener los controles de autenticación en la esquina superior.
const PageHeader: React.FC = () => {
  return <Header />;
};

type Product = { id: number; name: string; description?: string; price: number; image: string };

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Expreso',
    description: 'Intenso, aromático y lleno de carácter. El café expreso es una bebida concentrada elaborada al pasar agua caliente a presión por café molido fino.',
    price: 7000,
    image: '/imagenes/expreso.png'
  },
  {
    id: 2,
    name: 'Mocachino',
    description: 'Deliciosa combinación de café expreso, leche vaporizada y chocolate. Su sabor suave y dulce lo convierte en una opción perfecta para disfrutar en cualquier momento.',
    price: 8000,
    image: '/imagenes/mocachino.png'
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Suave y cremoso: mezcla de café expreso y leche vaporizada, con una ligera capa de espuma en la parte superior que realza su textura.',
    price: 7000,
    image: '/imagenes/latte.png'
  },
  {
    id: 4,
    name: 'Chocolate',
    description: 'Una bebida reconfortante y cremosa elaborada con leche caliente y chocolate derretido, ideal para acompañar momentos dulces.',
    price: 9000,
    image: '/imagenes/chocolate.png'
  },
  {
    id: 5,
    name: 'Pastel de chocolate',
    description: 'Un pequeño placer irresistible: suave, húmedo y lleno de sabor. Ideal para acompañar tu café y disfrutar en cualquier momento del día.',
    price: 15000,
    image: '/imagenes/pastelchocolate.png'
  },
  {
    id: 6,
    name: 'Galletas',
    description: 'Crujientes por fuera, suaves por dentro y llenas de sabor. El acompañante perfecto para tu bebida caliente.',
    price: 6000,
    image: '/imagenes/galletitas.png'
  }
];

const Inicio: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
  ];

  // El estado del carrito lo gestiona el hook useCart (persistencia y migración de clave)

  // Auto-rotación del hero
  useEffect(() => {
    const interval = setInterval(() => setCurrentImageIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll suave para enlaces que apuntan a ids
  useEffect(() => {
    const smoothScroll = (e: Event) => {
      const target = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 140, behavior: 'smooth' });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', smoothScroll));
    return () => document.querySelectorAll('a[href^="#"]').forEach(a => a.removeEventListener('click', smoothScroll));
  }, []);

  // Si la página carga con un hash (p.ej. /#productos), hacer un scroll único a esa sección.
  // Esto permite mantener el comportamiento de Inicio y soportar enlaces desde otras rutas.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 140, behavior: 'smooth' });
      }, 80);
    }
  }, []);

  

  // Mostrar una notificación breve al añadir un producto
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'success' : 'error'}`;
    toast.innerHTML = `<i class=\"fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}\"></i> ${message}`;
    document.body.appendChild(toast);
  // activar animación
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => { try { document.body.removeChild(toast); } catch (e) {} }, 300); }, 3000);
  };

  const addToCartWithToast = (p: Product) => {
    addItem({ id: p.id, name: p.name, description: p.description, price: p.price, image: p.image });
    showToast(`${p.name} añadido al carrito`, 'success');
  };

  return (
    <div className="main-container">
      <PageHeader />

      {/* Navegación por secciones (contenedor centrado para paridad visual) */}
      <div className="container">
        <nav className="section-nav" id="section-nav">
          {/* Usar Link para que la navegación entre rutas actualice location.hash con react-router */}
          <Link to={{ pathname: '/', hash: '#productos' }} onClick={() => { /* no-op */ }}>Productos</Link>
          <Link to={{ pathname: '/', hash: '#nosotros' }}>Nosotros</Link>
          <Link to={{ pathname: '/', hash: '#proceso' }}>Proceso</Link>
          <Link to={{ pathname: '/', hash: '#testimonios' }}>Testimonios</Link>
          <Link to={{ pathname: '/', hash: '#blog' }}>Blog</Link>
          <Link to={{ pathname: '/', hash: '#contacto' }}>Contacto</Link>
        </nav>
      </div>

  {/* Sección Hero con imágenes rotativas de fondo (transición por fade) */}
      <section className="hero" id="hero">
        {/* sliding background layers */}
        <div className="hero-slides" aria-hidden="true">
          {heroImages.map((src, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>

        <div className="hero-content container">
          <h1>Café fresco de nuestra granja a tu taza</h1>
          <p>Descubre los aromas y sabores únicos de nuestro café 100% natural</p>
          <Link to={{ pathname: '/', hash: '#productos' }} className="hero-btn">Explorar Productos</Link>
        </div>
      </section>

  {/* Sección de tres columnas (portada) */}
      <section className="three-columns container" aria-label="Portada columnas">
        <div className="col">
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" alt="Calidad" />
          <h3>Calidad Premium</h3>
          <p>Seleccionamos los mejores granos y los tostamos en pequeños lotes para garantizar el mejor sabor.</p>
        </div>
        <div className="col">
          <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" alt="Sostenible" />
          <h3>Sostenibilidad</h3>
          <p>Nuestras prácticas agrícolas respetan el medio ambiente y apoyan a las comunidades locales.</p>
        </div>
        <div className="col">
          <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" alt="Entrega" />
          <h3>Entrega Rápida</h3>
          <p>Envíos confiables y frescos a tu puerta. Disfruta de nuestro café sin esperas.</p>
        </div>
      </section>

      <main className="page-main">
        {/* Productos Destacados */}
        <section className="featured-products" id="productos">
          <h2 className="section-title">Nuestros Productos</h2>
          <div className="products-and-cart container">
            <div className="products-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCartWithToast} />
              ))}
            </div>
            {/* Vista rápida del carrito removida de la sección Productos (según solicitud) */}
          </div>
        </section>

        <div className="product-message">
          <h2>¿Estás cerca de nuestras oficinas?</h2>
          <p>No te contengas, pide nuestros productos directamente. ¡Entrega rápida y fresca en tu zona!</p>
        </div>

        {/* About us */}
        <section className="about-us" id="nosotros">
          <div className="about-image">
            <img src="/imagenes/cafesantander.jpg" alt="Sobre nosotros" />
          </div>
          <div className="about-content">
            <h2 className="section-title">Nuestra Historia</h2>
            <p>Desde 1985, CaféSantander ha estado comprometido con la producción de café de la más alta calidad. Nuestra familia ha cultivado café en las montañas de Santander por tres generaciones, perfeccionando nuestras técnicas para ofrecerte una experiencia única en cada taza.</p>
            <p>Creemos en el comercio justo y en prácticas sostenibles que respetan el medio ambiente y benefician a nuestras comunidades locales.</p>
            <div className="about-features">
              <div className="feature"><i className="fas fa-seedling" /><span>Cultivo Sostenible</span></div>
              <div className="feature"><i className="fas fa-award" /><span>Calidad Premium</span></div>
              <div className="feature"><i className="fas fa-truck" /><span>Envío Gratis</span></div>
              <div className="feature"><i className="fas fa-heart" /><span>Comercio Justo</span></div>
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="process" id="proceso">
          <h2 className="section-title">Nuestro Proceso</h2>
          <div className="process-steps">
            <div className="step"><div className="step-icon"><i className="fas fa-seedling" /></div><h3>Cultivo</h3><p>Cultivamos nuestros granos en las altas montañas de Santander, donde el clima y el suelo son perfectos para el café.</p></div>
            <div className="step"><div className="step-icon"><i className="fas fa-hand-paper" /></div><h3>Cosecha</h3><p>Recolectamos manualmente solo los granos en su punto óptimo de maduración para garantizar la mejor calidad.</p></div>
            <div className="step"><div className="step-icon"><i className="fas fa-tint" /></div><h3>Lavado</h3><p>Procesamos los granos con métodos tradicionales que preservan sus características únicas y sabores naturales.</p></div>
            <div className="step"><div className="step-icon"><i className="fas fa-fire" /></div><h3>Tostado</h3><p>Tostamos en pequeños lotes para controlar perfectamente el perfil de sabor y desarrollar todo el potencial del grano.</p></div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="testimonials" id="testimonios">
          <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
          <div className="testimonial-cards">
            <div className="testimonial"><div className="testimonial-text">El mejor café que he probado en mi vida. Las notas afrutadas y el aroma son increíbles. Nunca volveré a otro café.</div><div className="testimonial-author"><div className="author-avatar"><img src="https://randomuser.me/api/portraits/women/44.jpg" alt="María González" /></div><div className="author-info"><h4>María González</h4><p>Bogotá, Colombia</p></div></div></div>
            <div className="testimonial"><div className="testimonial-text">Como barista profesional, puedo decir que la calidad de CaféSantander es excepcional. Sus granos son perfectos para espresso.</div><div className="testimonial-author"><div className="author-avatar"><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos Rodríguez" /></div><div className="author-info"><h4>Carlos Rodríguez</h4><p>Medellín, Colombia</p></div></div></div>
            <div className="testimonial"><div className="testimonial-text">Me encanta que sea un producto local y sostenible. El sabor es increíble y saber que apoyo a comunidades locales me hace sentir bien.</div><div className="testimonial-author"><div className="author-avatar"><img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Ana Martínez" /></div><div className="author-info"><h4>Ana Martínez</h4><p>Cali, Colombia</p></div></div></div>
          </div>
        </section>

        {/* Blog */}
        <section className="blog" id="blog">
          <h2 className="section-title">Nuestro Blog</h2>
          <div className="blog-posts">
            <div className="blog-post"><div className="blog-image"><img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Cultivo de café" /></div><div className="blog-content"><h3>Guía para reconocer un café de calidad</h3><div className="blog-meta"><span><i className="far fa-calendar" /> 15 Mayo, 2023</span><span><i className="far fa-comment" /> 12 Comentarios</span></div><p>Aprende a identificar las características de un café premium y cómo diferenciarlo de productos de menor calidad.</p><a href="https://www.reddit.com/r/Santiago/comments/1c2loth/d%C3%B3nde_comprar_buen_caf%C3%A9/" className="read-more" target="_blank" rel="noreferrer">Leer más</a></div></div>
            <div className="blog-post"><div className="blog-image"><img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Métodos de preparación" /></div><div className="blog-content"><h3>Los mejores métodos para preparar café</h3><div className="blog-meta"><span><i className="far fa-calendar" /> 2 Abril, 2023</span><span><i className="far fa-comment" /> 8 Comentarios</span></div><p>Descubre diferentes técnicas de preparación y cómo cada una afecta el sabor final de tu bebida favorita.</p><a href="https://www.reddit.com/r/espanol/comments/rqz5xn/las_mejores_formas_para_preparar_el_caf%C3%A9/" className="read-more" target="_blank" rel="noreferrer">Leer más</a></div></div>
            <div className="blog-post"><div className="blog-image"><img src="https://content.elmueble.com/medio/2023/06/08/arbol-grano-cafe-frutos_83f4fed6_230608100224_1200x630.jpg" alt="Café sostenible" /></div><div className="blog-content"><h3>Practicas sostenibles</h3><div className="blog-meta"><span><i className="far fa-calendar" /> 20 Marzo, 2023</span><span><i className="far fa-comment" /> 15 Comentarios</span></div><p>Conoce prácticas agrícolas sostenibles y cómo contribuimos a la protección del medio ambiente.</p><a href="https://www.reddit.com/r/selfreliance/comments/14edf7d/guide_how_to_practice_sustainable_agriculture/" className="read-more" target="_blank" rel="noreferrer">Leer más</a></div></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Inicio;
