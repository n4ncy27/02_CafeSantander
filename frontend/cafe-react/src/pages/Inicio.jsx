// ============================================
// INICIO.JSX - PÁGINA PRINCIPAL DE LA APLICACIÓN
// ============================================
// REQUERIMIENTO: Página de inicio con:
// - Hero section con imágenes rotativas
// - Catálogo de productos (integración con backend)
// - Secciones informativas (nosotros, proceso, testimonios, blog)
// - Navegación smooth scroll
// - Sistema de notificaciones (toasts)
// ============================================

// Importar hooks de React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Para navegación SPA

// Importar componentes
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard'; // Tarjeta de producto individual

// Importar estilos y servicios
import '../styles/global.css';
import useCart from '../hooks/useCart';                    // Hook personalizado para carrito
import { productoService } from '../services/productoService'; // Servicio API para productos

// ============================================
// COMPONENTE PAGEHEADER
// ============================================
// Delega el encabezado al componente global Header
// para mantener los controles de autenticación consistentes
const PageHeader = () => {
  return <Header />;
};

// ============================================
// COMPONENTE PRINCIPAL INICIO
// ============================================
const Inicio = () => {
  // ============================================
  // ESTADO DEL COMPONENTE
  // ============================================
  
  // Estado para productos obtenidos desde el backend
  const [products, setProducts] = useState([]);
  
  // Estado de carga (mientras se obtienen productos de la API)
  const [loading, setLoading] = useState(true);
  
  // Estado de error (si falla la petición al backend)
  const [error, setError] = useState(null);
  
  // Hook personalizado para manejar el carrito
  const { addItem } = useCart();
  
  // Estado para controlar qué imagen del hero se muestra (rotación automática)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ============================================
  // EFECTO: CARGAR PRODUCTOS DESDE LA API
  // ============================================
  // REQUERIMIENTO: Integración con backend para mostrar productos
  useEffect(() => {
    /**
     * Función asíncrona para obtener productos desde el backend
     * Ruta API: GET /api/productos
     */
    const cargarProductos = async () => {
      try {
        setLoading(true); // Activar estado de carga
        
        // Llamar al servicio que hace la petición HTTP al backend
        const datos = await productoService.obtenerProductos();
        
        setProducts(datos); // Guardar productos en el estado
        setError(null);     // Limpiar cualquier error anterior
      } catch (err) {
        // Si hay error (backend no disponible, error de red, etc.)
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos');
        
        // Fallback: usar array vacío si la API falla
        setProducts([]);
      } finally {
        // Siempre desactivar el estado de carga al finalizar
        setLoading(false);
      }
    };

    cargarProductos(); // Ejecutar la función al montar el componente
  }, []); // Array vacío = solo se ejecuta una vez al montar

  // Array de imágenes para el hero rotativo (desde Unsplash)
  const heroImages = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
  ];

  // ============================================
  // EFECTO: AUTO-ROTACIÓN DEL HERO
  // ============================================
  // Cambia automáticamente la imagen de fondo cada 5 segundos
  useEffect(() => {
    // Configurar intervalo que incrementa el índice cíclicamente
    // (i + 1) % heroImages.length asegura que vuelva a 0 después de la última imagen
    const interval = setInterval(() => 
      setCurrentImageIndex(i => (i + 1) % heroImages.length), 
      5000 // 5000ms = 5 segundos
    );
    
    // Cleanup: limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [heroImages.length]); // Re-crear intervalo si cambia el número de imágenes

  // ============================================
  // EFECTO: SMOOTH SCROLL PARA ENLACES INTERNOS
  // ============================================
  // REQUERIMIENTO: Navegación suave a secciones de la página
  useEffect(() => {
    /**
     * Función que maneja el click en enlaces que apuntan a IDs (#productos, #nosotros, etc.)
     * Previene el comportamiento por defecto y hace scroll suave
     */
    const smoothScroll = (e) => {
      const target = e.currentTarget.getAttribute('href');
      
      // Solo procesar enlaces que empiezan con #
      if (target && target.startsWith('#')) {
        e.preventDefault(); // Prevenir el salto brusco por defecto
        
        const el = document.querySelector(target); // Buscar el elemento objetivo
        
        if (el) {
          // Calcular posición considerando el header fijo (140px)
          window.scrollTo({ 
            top: el.offsetTop - 140, 
            behavior: 'smooth' // Animación suave
          });
        }
      }
    };

    // Agregar listener a todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(a => 
      a.addEventListener('click', smoothScroll)
    );
    
    // Cleanup: remover listeners al desmontar
    return () => document.querySelectorAll('a[href^="#"]').forEach(a => 
      a.removeEventListener('click', smoothScroll)
    );
  }, []); // Solo ejecutar una vez

  // ============================================
  // EFECTO: SCROLL INICIAL SI HAY HASH EN LA URL
  // ============================================
  // Ejemplo: Si el usuario visita /#productos, hacer scroll a esa sección
  useEffect(() => {
    const hash = window.location.hash; // Obtener el hash de la URL
    
    if (hash) {
      // Esperar 80ms para que el DOM esté completamente renderizado
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          window.scrollTo({ 
            top: el.offsetTop - 140, 
            behavior: 'smooth' 
          });
        }
      }, 80);
    }
  }, []); // Solo ejecutar al montar el componente

  

  // Mostrar una notificación breve al añadir un producto
  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'success' : 'error'}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
  // activar animación
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => { 
      try { 
        document.body.removeChild(toast); 
      } catch {
        // ignorar errores si el elemento ya fue removido
      } 
    }, 300); }, 3000);
  };

  const addToCartWithToast = (p) => {
    addItem({ id: p.id });
    showToast(`${p.nombre || p.name} añadido al carrito`, 'success');
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
            {loading && <p style={{ textAlign: 'center', padding: '40px' }}>Cargando productos...</p>}
            {!loading && error && <p style={{ textAlign: 'center', color: 'red', padding: '40px' }}>{error}</p>}
            {!loading && !error && products.length === 0 && <p style={{ textAlign: 'center', padding: '40px' }}>No hay productos disponibles</p>}
            {!loading && !error && products.length > 0 && (
              <div className="products-grid">
                {products.map((p) => (
                  <ProductCard key={p.id} product={{ 
                    id: p.id, 
                    nombre: p.nombre, 
                    descripcion: p.descripcion || '', 
                    precio: Number(p.precio) || 0, 
                    imagen: p.imagen || '/imagenes/expreso.png'
                  }} onAdd={addToCartWithToast} />
                ))}
              </div>
            )}
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
            <img src="/imagenes/cafe2.jpg" alt="Sobre nosotros" />
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
