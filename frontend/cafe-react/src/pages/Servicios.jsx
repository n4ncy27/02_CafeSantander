// Archivo: Servicios.jsx
// Página: servicios ofrecidos, ruleta de sabores y opciones para empresas.
import { useEffect, useState, useMemo } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/servicios.css';
import useCart from '../hooks/useCart';
import { productoService } from '../services/productoService';

// Nota: se porta la lógica original de `cafes/Servicios.html` a React.
const Servicios = () => {
  // ref eliminado (no usado)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [selectedFinalOption, setSelectedFinalOption] = useState(null);
  const [finalProduct, setFinalProduct] = useState(null);
  const { addItem } = useCart();
  const [productosList, setProductosList] = useState([]);

  // Calcula precio aproximado según categoría y opción seleccionada
  // Mantiene la lógica adaptada desde el HTML original
  const calculatePrice = (category, option) => {
    if (!category || !option) return 0;
    let basePrice = 15000;
    const categoryMultipliers = {
      AFRUTADO: 1.0,
      FLORAL: 1.2,
      DULCE: 1.1,
      'ACIDO/FERMENTADO': 1.3,
      'VERDE/VEGETAL': 0.9,
      OTROS: 1.4,
      TOSTADO: 1.0,
      ESPECIAS: 1.2,
      'NUECES/CACAO': 1.1
    };

    const complexityMultipliers = {
      Mora: 1.0, Frambuesa: 1.0, Arandano: 1.0, Fresa: 1.0,
      'Pasas de uva': 1.1, 'Pasas de ciruela': 1.1,
      Coco: 1.2, Cereza: 1.2, Granada: 1.3, Piña: 1.2,
      Uva: 1.1, Manzana: 1.1, Melocotón: 1.2, Pera: 1.1,
      Pomelo: 1.3, Naranja: 1.2, Limón: 1.2, Lima: 1.3,
      'Té negro': 1.0, Manzanilla: 1.2, Jazmín: 1.3, Rosa: 1.4,
      Melaza: 1.1, Miel: 1.2, 'Jarabe de manzana': 1.3, Caramelizado: 1.1,
      Vainilla: 1.2, 'Aroma de vainilla': 1.1, 'Dulce en general': 1.0,
      'Aromaticos ácidos': 1.1, 'Ácido acético': 1.3, 'Ácido butírico': 1.4,
      'Ácido isovalérico': 1.4, 'Ácido cítrico': 1.2, 'Ácido málico': 1.2,
      Vinoso: 1.3, Whisky: 1.4, Fermentado: 1.3, 'Muy maduro': 1.2
    };

    const catM = categoryMultipliers[category] || 1.0;
    const compM = complexityMultipliers[option] || 1.0;
    return Math.round(basePrice * catM * compM);
  };

  // Datos de la ruleta: categorías, subopciones y productos
  const wheelData = useMemo(() => ({
    AFRUTADO: {
      description: 'Una mezcla dulce, floral y aromática de una variedad de frutas maduras.',
      subOptions: ['Baya', 'Fruta seca', 'Otras frutas', 'Cítricos'],
      finalOptions: {
        Baya: ['Mora', 'Frambuesa', 'Arandano', 'Fresa'],
        'Fruta seca': ['Pasas de uva','Pasas de ciruela'],
        'Otras frutas': ['Coco','Cereza','Granada','Piña','Uva','Manzana','Melocotón','Pera'],
        Cítricos: ['Pomelo','Naranja', 'Limón','Lima']
      },
      products: {
        Mora: { name: 'Café con Mora', description: 'Aromático dulce con notas de mora', image: '/imagenes/cafe/temora.jpg' },
        Frambuesa: { name: 'Café con Frambuesa', description: 'Aromático con frambuesa', image: '/imagenes/cafe/teframbuesa.jpg' },
        Arandano: { name: 'Café con Arándano', description: 'Aromático con arándano', image: '/imagenes/cafe/tearanonos.jpg' },
        Fresa: { name: 'Café con Fresa', description: 'Aromático con fresa', image: '/imagenes/cafe/tefresas.jpg' },
        'Pasas de uva': { name: 'Café con Pasas de Uva', description: 'Aromático con pasas', image: '/imagenes/cafe/teuvaspasas.jpg' },
        'Pasas de ciruela': { name: 'Café con Pasas de Ciruela', description: 'Aromático con ciruela', image: '/imagenes/cafe/tepasasciruela.jpg' },
        Coco: { name: 'Café con Coco', description: 'Aromático tropical', image: '/imagenes/cafe/cafecoco.jpg' },
        Cereza: { name: 'Café con Cereza', description: 'Aromático con cereza', image: '/imagenes/cafe/cafecereza.jpg' },
        Granada: { name: 'Café con Granada', description: 'Aromático con granada', image: '/imagenes/cafe/cafegranada.jpg' },
        Piña: { name: 'Café con Piña', description: 'Aromático tropical', image: '/imagenes/cafe/cafepiña.jpg' },
        Uva: { name: 'Café con Uva', description: 'Aromático con uva', image: '/imagenes/cafe/cafeuva.jpg' },
        Manzana: { name: 'Café con Manzana', description: 'Aromático con manzana', image: '/imagenes/cafe/cafemanzana.jpg' },
        Melocotón: { name: 'Café con Melocotón', description: 'Aromático con durazno', image: '/imagenes/cafe/cafedurazno.jpg' },
        Pera: { name: 'Café con Pera', description: 'Aromático con pera', image: '/imagenes/cafe/cafepera.jpg' },
        Pomelo: { name: 'Café con Pomelo', description: 'Aromático cítrico', image: '/imagenes/cafe/cafepomelo.jpg' },
        Naranja: { name: 'Café con Naranja', description: 'Aromático cítrico', image: '/imagenes/cafe/cafenaranja.jpg' },
        Limón: { name: 'Café con Limón', description: 'Aromático cítrico', image: '/imagenes/cafe/cafelimon.jpg' },
        Lima: { name: 'Café con Lima', description: 'Aromático cítrico', image: '/imagenes/cafe/cafelima.jpg' }
      }
    },
    FLORAL: { 
      description: 'Aromas florales delicados y aromáticos que evocan jardines en primavera', 
      subOptions: ['Floral','Té negro'], 
      finalOptions: { 
        Floral: ['Manzanilla','Jazmín','Rosa'],
        'Té negro': ['Té negro']
      }, 
      products: { 
        Manzanilla: { name: 'Café con Manzanilla', description: 'Suave y floral', image: '/imagenes/cafe/temanzanilla.jpg' }, 
        Jazmín: { name: 'Café con Jazmín', description: 'Aromático floral', image: '/imagenes/cafe/tejazmin.jpg' }, 
        Rosa: { name: 'Café con Rosas', description: 'Delicado y floral', image: '/imagenes/cafe/terosa.jpg' },
        'Té negro': { name: 'Café con Té Negro', description: 'Complejo y aromático', image: '/imagenes/cafe/temanzanilla.jpg' }
      } 
    },
    DULCE: { 
      description: 'Notas dulces y caramelizadas que recuerdan a postres', 
      subOptions: ['Azucar morena','Azucarados'], 
      finalOptions: { 
        'Azucar morena': ['Melaza','Jarabe de manzana','Caramelizado','Miel'],
        Azucarados: ['Vainilla','Aroma de vainilla','Dulce en general']
      }, 
      products: { 
        Melaza: { name: 'Café de Melaza', description: 'Dulce profundo', image: '/imagenes/cafe/cafemelaza.jpg' }, 
        Miel: { name: 'Café de Miel', description: 'Suave y dulce', image: '/imagenes/cafe/cafemiel.jpg' },
        'Jarabe de manzana': { name: 'Café con Jarabe de Manzana', description: 'Dulce frutal', image: '/imagenes/cafe/cafemiel.jpg' },
        Caramelizado: { name: 'Café Caramelizado', description: 'Tostado dulce', image: '/imagenes/cafe/cafemelaza.jpg' },
        Vainilla: { name: 'Café de Vainilla', description: 'Aromático dulce', image: '/imagenes/cafe/cafemiel.jpg' },
        'Aroma de vainilla': { name: 'Café con Aroma de Vainilla', description: 'Suave vainilla', image: '/imagenes/cafe/cafemiel.jpg' },
        'Dulce en general': { name: 'Café Dulce', description: 'Dulzor equilibrado', image: '/imagenes/cafe/cafemelaza.jpg' }
      } 
    },
    'ACIDO/FERMENTADO': { 
      description: 'Notas ácidas y fermentadas complejas', 
      subOptions: ['Acido','Alcohol/Fermentado'], 
      finalOptions: { 
        Acido: ['Aromaticos ácidos','Ácido acético','Ácido butírico','Ácido isovalérico','Ácido cítrico','Ácido málico'],
        'Alcohol/Fermentado': ['Vinoso','Whisky','Fermentado','Muy maduro']
      }, 
      products: { 
        'Aromaticos ácidos': { name: 'Café con Aromáticos Ácidos', description: 'Complejo ácido', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        'Ácido acético': { name: 'Café Ácido Acético', description: 'Ácido vibrante', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        'Ácido butírico': { name: 'Café Ácido Butírico', description: 'Ácido complejo', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        'Ácido isovalérico': { name: 'Café Ácido Isovalérico', description: 'Ácido intenso', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        'Ácido cítrico': { name: 'Café Ácido Cítrico', description: 'Ácido brillante', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        'Ácido málico': { name: 'Café Ácido Málico', description: 'Ácido fresco', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        Vinoso: { name: 'Café Vinoso', description: 'Fermentado vinoso', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        Whisky: { name: 'Café Whisky', description: 'Fermentado complejo', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        Fermentado: { name: 'Café Fermentado', description: 'Fermentado artesanal', image: '/imagenes/cafe/cafearomaticoacido.jpg' },
        'Muy maduro': { name: 'Café Muy Maduro', description: 'Fermentado maduro', image: '/imagenes/cafe/cafearomaticoacido.jpg' }
      } 
    },
    'VERDE/VEGETAL': { 
      description: 'Notas herbales y vegetales frescas', 
      subOptions: ['Verde/vegetativo','Otros'], 
      finalOptions: { 
        'Verde/vegetativo': ['Poco maduro','Peapod','Fresco'],
        Otros: ['Duro','Cartón']
      }, 
      products: { 
        'Poco maduro': { name: 'Café Poco Maduro', description: 'Verde fresco', image: '/imagenes/cafe/cafepocomaduro.jpg' },
        Peapod: { name: 'Café Peapod', description: 'Verde vegetal', image: '/imagenes/cafe/cafepocomaduro.jpg' },
        Fresco: { name: 'Café Fresco', description: 'Verde brillante', image: '/imagenes/cafe/cafepocomaduro.jpg' },
        Duro: { name: 'Café Duro', description: 'Robusto intenso', image: '/imagenes/cafe/cafeuro.jpg' },
        Cartón: { name: 'Café Cartón', description: 'Seco intenso', image: '/imagenes/cafe/cafeuro.jpg' }
      } 
    },
    OTROS: { 
      description: 'Notas especiales y únicas', 
      subOptions: ['Papel/Mohoso','Químico'], 
      finalOptions: { 
        'Papel/Mohoso': ['Duro','Cartón','Papel','Mohoso'],
        Químico: ['Químico','Medicinal']
      }, 
      products: { 
        Duro: { name: 'Café Duro', description: 'Intenso robusto', image: '/imagenes/cafe/cafeuro.jpg' },
        Cartón: { name: 'Café Cartón', description: 'Seco', image: '/imagenes/cafe/cafeuro.jpg' },
        Papel: { name: 'Café Papel', description: 'Seco suave', image: '/imagenes/cafe/cafeuro.jpg' },
        Mohoso: { name: 'Café Mohoso', description: 'Terroso', image: '/imagenes/cafe/cafeuro.jpg' },
        Químico: { name: 'Café Químico', description: 'Intenso', image: '/imagenes/cafe/cafeuro.jpg' },
        Medicinal: { name: 'Café Medicinal', description: 'Herbal intenso', image: '/imagenes/cafe/cafeuro.jpg' }
      } 
    },
    TOSTADO: { 
      description: 'Impresión de tostado profundo', 
      subOptions: ['Quemado','Cereal'], 
      finalOptions: { 
        Quemado: ['Acre','Ceniciento','Humo'],
        Cereal: ['Marrón','Tostado','Grano']
      }, 
      products: { 
        Acre: { name: 'Café Acre', description: 'Tostado intenso', image: '/imagenes/cafe/cafetostado.jpg' },
        Ceniciento: { name: 'Café Ceniciento', description: 'Tostado profundo', image: '/imagenes/cafe/cafetostado.jpg' },
        Humo: { name: 'Café Ahumado', description: 'Tostado ahumado', image: '/imagenes/cafe/cafetostado.jpg' },
        Marrón: { name: 'Café Marrón Tostado', description: 'Tostado medio', image: '/imagenes/cafe/cafetostado.jpg' },
        Tostado: { name: 'Café Tostado', description: 'Tostado clásico', image: '/imagenes/cafe/cafetostado.jpg' },
        Grano: { name: 'Café Grano Tostado', description: 'Cereal tostado', image: '/imagenes/cafe/cafetostado.jpg' }
      } 
    },
    ESPECIAS: { 
      description: 'Especias aromáticas y complejas', 
      subOptions: ['Especias marrón','Otras especias'], 
      finalOptions: { 
        'Especias marrón': ['Anís','Nuez moscada','Canela','Clavo'],
        'Otras especias': ['Pimienta','Jengibre','Cardamomo']
      }, 
      products: { 
        Anís: { name: 'Café de Anís', description: 'Especiado anisado', image: '/imagenes/cafe/cafeanis.jpg' },
        'Nuez moscada': { name: 'Café de Nuez Moscada', description: 'Especiado cálido', image: '/imagenes/cafe/cafeanis.jpg' },
        Canela: { name: 'Café de Canela', description: 'Especiado dulce', image: '/imagenes/cafe/cafeanis.jpg' },
        Clavo: { name: 'Café de Clavo', description: 'Especiado intenso', image: '/imagenes/cafe/cafeanis.jpg' },
        Pimienta: { name: 'Café de Pimienta', description: 'Especiado picante', image: '/imagenes/cafe/cafeanis.jpg' },
        Jengibre: { name: 'Café de Jengibre', description: 'Especiado vibrante', image: '/imagenes/cafe/cafeanis.jpg' },
        Cardamomo: { name: 'Café de Cardamomo', description: 'Especiado aromático', image: '/imagenes/cafe/cafeanis.jpg' }
      } 
    },
    'NUECES/CACAO': { 
      description: 'Nueces y cacao intensos', 
      subOptions: ['Nuez','Cacao'], 
      finalOptions: { 
        Nuez: ['Cacahuates','Avellana','Almendra','Nuez'],
        Cacao: ['Chocolate','Chocolate negro','Cacao']
      }, 
      products: { 
        Cacahuates: { name: 'Café de Cacahuate', description: 'Nueces tostadas', image: '/imagenes/cafe/cafecacahuate.jpg' },
        Avellana: { name: 'Café de Avellana', description: 'Nueces dulces', image: '/imagenes/cafe/cafecacahuate.jpg' },
        Almendra: { name: 'Café de Almendra', description: 'Nueces suaves', image: '/imagenes/cafe/cafecacahuate.jpg' },
        Nuez: { name: 'Café de Nuez', description: 'Nueces intensas', image: '/imagenes/cafe/cafecacahuate.jpg' },
        Chocolate: { name: 'Café de Chocolate', description: 'Cacao dulce', image: '/imagenes/cafe/cafecacahuate.jpg' },
        'Chocolate negro': { name: 'Café de Chocolate Negro', description: 'Cacao intenso', image: '/imagenes/cafe/cafecacahuate.jpg' },
        Cacao: { name: 'Café de Cacao', description: 'Cacao puro', image: '/imagenes/cafe/cafecacahuate.jpg' }
      } 
    }
  }), []);

  const sectores = [
    { name: 'AFRUTADO', color: '#FC031C' },
    { name: 'ACIDO/FERMENTADO', color: '#FFF94F' },
    { name: 'VERDE/VEGETAL', color: '#65FC26' },
    { name: 'OTROS', color: '#62CCBB' },
    { name: 'TOSTADO', color: '#BD6200' },
    { name: 'ESPECIAS', color: '#A1052E' },
    { name: 'NUECES/CACAO', color: '#8A583B' },
    { name: 'DULCE', color: '#FF9999' },
    { name: 'FLORAL', color: '#FF57B2' }
  ];

  // Dibuja la ruleta dentro del grupo SVG
  useEffect(() => {
    const wheelGroup = document.getElementById('wheelGroup');
    if (!wheelGroup) return;

    const cx = 250, cy = 250, outerR = 220, innerR = 60;
    const total = sectores.length;
    const anglePer = 360 / total;
    let currentAngle = 0;

    const polarToCartesian = (cxN, cyN, r, angleDeg) => {
      const angle = (angleDeg - 90) * Math.PI / 180;
      return { x: cxN + r * Math.cos(angle), y: cyN + r * Math.sin(angle) };
    };

    const createSectorPath = (startAngle, endAngle, rOuter, rInner) => {
      const oStart = polarToCartesian(cx, cy, rOuter, startAngle);
      const oEnd = polarToCartesian(cx, cy, rOuter, endAngle);
      const iStart = polarToCartesian(cx, cy, rInner, startAngle);
      const iEnd = polarToCartesian(cx, cy, rInner, endAngle);
      return `M ${oStart.x} ${oStart.y} A ${rOuter} ${rOuter} 0 0 1 ${oEnd.x} ${oEnd.y} L ${iEnd.x} ${iEnd.y} A ${rInner} ${rInner} 0 0 0 ${iStart.x} ${iStart.y} Z`;
    };

    wheelGroup.innerHTML = '';
  sectores.forEach((s) => {
      const start = currentAngle;
      const end = currentAngle + anglePer;
      const pathD = createSectorPath(start, end, outerR, innerR);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD);
      path.setAttribute('fill', s.color);
      path.setAttribute('class', 'sector');
      path.addEventListener('click', () => handleCategorySelect(s.name));
      wheelGroup.appendChild(path);

      // etiqueta centrada del sector con mejor posicionamiento
      const mid = start + anglePer / 2;
      const labelRadius = (outerR + innerR) / 2 + 15;
      const labelPos = polarToCartesian(cx, cy, labelRadius, mid);
      
      // Dividir texto largo en múltiples líneas
      const words = s.name.split('/');
      if (words.length > 1) {
        // Para categorías con '/', dividir en dos líneas
        words.forEach((word, idx) => {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', String(labelPos.x));
          text.setAttribute('y', String(labelPos.y + (idx - 0.5) * 14));
          text.setAttribute('class', 'sector-label');
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('dominant-baseline', 'middle');
          text.textContent = word.trim();
          wheelGroup.appendChild(text);
        });
      } else {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', String(labelPos.x));
        text.setAttribute('y', String(labelPos.y));
        text.setAttribute('class', 'sector-label');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.textContent = s.name;
        wheelGroup.appendChild(text);
      }

      currentAngle += anglePer;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* redibujar solo en montaje */]);

  // Cargar productos desde API para mapear opciones de la ruleta con productos reales
  useEffect(() => {
    let mounted = true;
    productoService.obtenerProductos()
      .then(data => { if (mounted) setProductosList(data || []); })
      .catch(err => console.error('Error cargando productos:', err));
    return () => { mounted = false; };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubOption(null);
    setSelectedFinalOption(null);
    setFinalProduct(null);
  };

  const handleSubOptionSelect = (sub) => {
    setSelectedSubOption(sub);
    setSelectedFinalOption(null);
    setFinalProduct(null);
  };

  const handleFinalOptionSelect = (finalOpt) => {
    setSelectedFinalOption(finalOpt);
    const template = wheelData[selectedCategory]?.products?.[finalOpt];
    // Buscar en productos cargados desde el backend por nombre
    const match = productosList.find(p => {
      if (!p.nombre) return false;
      const nombre = p.nombre.toLowerCase();
      return nombre.includes(finalOpt.toLowerCase()) || (template && template.name && nombre.includes(template.name.toLowerCase()));
    });

    if (match) {
      setFinalProduct(match);
    } else if (template) {
      // Si no hay match en DB, construir preview pero desactivar el add-to-cart real
      const price = calculatePrice(selectedCategory, finalOpt);
      setFinalProduct({ nombre: template.name || finalOpt, descripcion: template.description || '', imagen: template.image || template.imagen, precio: price, _external: true });
    } else {
      setFinalProduct(null);
    }
  };

  const addToCart = () => {
    if (!finalProduct) return;
    // Si el producto viene de la base de datos (tiene id), usar ese id
    if (finalProduct.id) {
      addItem({ id: finalProduct.id });
      alert(`${finalProduct.nombre} añadido al carrito`);
      return;
    }

    // Si el producto es sólo de preview (_external), no permitir añadir al carrito
    if (finalProduct._external) {
      alert('Este producto es una vista previa y no está disponible en el catálogo.');
      return;
    }

    alert('Producto no disponible para añadir al carrito');
  };

  return (
    <div className="main-container">
      <Header />

      <section className="page-title">
        <h1>Servicios</h1>
        <p>Descubre nuestros servicios de entrega, productos para empresas y la ruleta catadora para elegir tu sabor ideal.</p>
      </section>

      <section className="ruleta-section">
        <div className="wheel-area">
          <div className="wheel-container">
            <svg width="700" height="700" viewBox="0 0 500 500" aria-hidden className="flavor-wheel">
              <g id="wheelGroup"></g>
            </svg>
            <div className="wheel-center">
              <div className="center-logo">
                <i className="fas fa-coffee"></i>
                <span>Café</span>
              </div>
            </div>
          </div>
          <p className="wheel-instruction">👆 Haz clic en una sección para explorar sabores</p>
        </div>

        <div className="panel" aria-live="polite">
          <h2>{selectedCategory || 'Selecciona una categoría'}</h2>
          <p className="desc">{selectedCategory ? (wheelData[selectedCategory].description) : 'Haz clic en una sección de la ruleta para comenzar.'}</p>

          {selectedCategory && (
            <div className="suboptions">
              <h4>Opciones</h4>
              {wheelData[selectedCategory].subOptions.map((s) => (
                <button key={s} onClick={() => handleSubOptionSelect(s)} className={selectedSubOption === s ? 'active' : ''}>{s}</button>
              ))}
            </div>
          )}

          {selectedSubOption && (
            <div className="subsuboptions">
              <h4>Detalles</h4>
              {wheelData[selectedCategory].finalOptions[selectedSubOption].map((f) => (
                <button key={f} onClick={() => handleFinalOptionSelect(f)} className={selectedFinalOption === f ? 'active' : ''}>{f}</button>
              ))}
            </div>
          )}

                {finalProduct && (
            <div className="final-product">
              <div className="product-display">
                <img className="product-image" src={finalProduct.imagen || finalProduct.image} alt={finalProduct.nombre || finalProduct.name} />
                <div className="product-details">
                  <strong>{finalProduct.nombre || finalProduct.name}</strong>
                  <div className="description">{finalProduct.descripcion || finalProduct.description}</div>
                  <div className="price">${Number(finalProduct.precio || finalProduct.price || 0).toLocaleString('es-CO')} COP</div>
                  <button className="add-to-cart-final" onClick={addToCart}><i className="fas fa-shopping-cart"></i> Añadir al carrito</button>
                </div>
              </div>
            </div>
          )}

          <div className="panel-footer">
            <em>CaféSantander</em>
          </div>
        </div>
      </section>

      {/* Delivery / Business / CTA sections: se renderizan con la misma estructura y clases que en el HTML original */}
      <section className="delivery-services">
        <h2 className="section-title">Servicios de Entrega</h2>
        <div className="delivery-options">
            <div className="delivery-card">
            <span className="delivery-icon"><i className="fas fa-motorcycle"></i></span>
            <h3>Entrega Rápida</h3>
            <p>Recibe tu pedido en pocas horas en zonas seleccionadas.</p>
            <div className="delivery-price">Gratis</div>
            <ul>
              <li>Seguimiento en tiempo real</li>
              <li>Empaque seguro</li>
            </ul>
            <button className="info-btn">Más información</button>
          </div>
          <div className="delivery-card">
            <span className="delivery-icon"><i className="fas fa-box"></i></span>
            <h3>Paquetería Nacional</h3>
            <p>Envíos a todo el país con transporte confiable.</p>
            <div className="delivery-price">Desde $8.000</div>
            <ul>
              <li>Empaque resistente</li>
              <li>Seguro opcional</li>
            </ul>
            <button className="info-btn">Contratar</button>
          </div>
        </div>
      </section>

      <section className="business-services">
        <h2 className="section-title">Servicios para Empresas</h2>
        <div className="business-cards">
          <div className="business-card">
            <h3>Planes Corporativos</h3>
            <p>Soluciones para oficinas y eventos.</p>
            <ul>
              <li>Suministro periódico</li>
              <li>Precios especiales</li>
            </ul>
          </div>
          <div className="business-card">
            <h3>Eventos y Catering</h3>
            <p>Servicio profesional para tus reuniones.</p>
            <ul>
              <li>Baristas expertos</li>
              <li>Equipamiento incluido</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-services">
        <div className="cta-content">
          <h2>¿Necesitas un servicio personalizado?</h2>
          <p>Contáctanos para crear una experiencia de café única para tu hogar o negocio. Nuestro equipo está listo para asesorarte.</p>
          <Link className="cta-button" to="/contacto">Solicitar Cotización</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servicios;
