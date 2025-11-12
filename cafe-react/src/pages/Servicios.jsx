// Archivo: Servicios.jsx
// Página: servicios ofrecidos, ruleta de sabores y opciones para empresas.
import { useEffect, useState, useMemo } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/servicios.css';
import useCart from '../hooks/useCart';

// Nota: se porta la lógica original de `cafes/Servicios.html` a React.
const Servicios = () => {
  // ref eliminado (no usado)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [selectedFinalOption, setSelectedFinalOption] = useState(null);
  const [finalProduct, setFinalProduct] = useState(null);
  const { addItem } = useCart();

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
        Mora: { name: 'Café con Mora', description: 'Aromático dulce...', image: '/imagenes/cafe/temora.jpg' },
        Frambuesa: { name: 'Café con Frambuesa', description: 'Aromático...', image: '/imagenes/cafe/teframbuesa.jpg' },
        Arandano: { name: 'Café con Arándano', description: 'Aromático...', image: '/imagenes/cafe/tearanonos.jpg' },
        Fresa: { name: 'Café con Fresa', description: 'Aromático...', image: '/imagenes/cafe/tefresas.jpg' },
        'Pasas de uva': { name: 'Café con Pasas de Uva', description: 'Aromático...', image: '/imagenes/cafe/teuvaspasas.jpg' },
        'Pasas de ciruela': { name: 'Café con Pasas de Ciruela', description: 'Aromático...', image: '/imagenes/cafe/tepasasciruela.jpg' },
        Coco: { name: 'Café con Coco', description: 'Aromático...', image: '/imagenes/cafe/cafecoco.jpg' },
        Cereza: { name: 'Café con Cereza', description: 'Aromático...', image: '/imagenes/cafe/cafecereza.jpg' },
        Granada: { name: 'Café con Granada', description: 'Aromático...', image: '/imagenes/cafe/cafegranada.jpg' },
        Piña: { name: 'Café con Piña', description: 'Aromático...', image: '/imagenes/cafe/cafepiña.jpg' },
        Uva: { name: 'Café con Uva', description: 'Aromático...', image: '/imagenes/cafe/cafeuva.jpg' },
        Manzana: { name: 'Café con Manzana', description: 'Aromático...', image: '/imagenes/cafe/cafemanzana.jpg' },
        Melocotón: { name: 'Café con Melocotón', description: 'Aromático...', image: '/imagenes/cafe/cafedurazno.jpg' },
        Pera: { name: 'Café con Pera', description: 'Aromático...', image: '/imagenes/cafe/cafepera.jpg' },
        Pomelo: { name: 'Café con Pomelo', description: 'Aromático...', image: '/imagenes/cafe/cafepomelo.jpg' },
        Naranja: { name: 'Café con Naranja', description: 'Aromático...', image: '/imagenes/cafe/cafenaranja.jpg' },
        Limón: { name: 'Café con Limón', description: 'Aromático...', image: '/imagenes/cafe/cafelimon.jpg' },
        Lima: { name: 'Café con Lima', description: 'Aromático...', image: '/imagenes/cafe/cafelima.jpg' }
      }
    },
    FLORAL: { description: 'Aromas florales', subOptions: ['Floral','Té negro'], finalOptions: { Floral: ['Manzanilla','Jazmín','Rosa'] }, products: { Manzanilla: { name: 'Café con Manzanilla', image: '/imagenes/cafe/temanzanilla.jpg' }, Jazmín: { name: 'Café con Jazmín', image: '/imagenes/cafe/tejazmin.jpg' }, Rosa: { name: 'Café con Rosas', image: '/imagenes/cafe/terosa.jpg' } } },
    DULCE: { description: 'Frutas secas y especiadas', subOptions: ['Azucar morena','Azucarados'], finalOptions: { 'Azucar morena': ['Melaza','Jarabe de manzana','Caramelizado','Miel'] }, products: { Melaza: { name: 'Café de Melaza', image: '/imagenes/cafe/cafemelaza.jpg' }, Miel: { name: 'Café de Miel', image: '/imagenes/cafe/cafemiel.jpg' } } },
    'ACIDO/FERMENTADO': { description: 'Notas ácidas', subOptions: ['Acido','Alcohol/Fermentado'], finalOptions: { Acido: ['Aromaticos ácidos','Ácido acético'] }, products: { 'Aromaticos ácidos': { name: 'Café con Aromáticos Ácidos', image: '/imagenes/cafe/cafearomaticoacido.jpg' } } },
    'VERDE/VEGETAL': { description: 'Notas herbales', subOptions: ['Verde/vegetativo','Otros'], finalOptions: { 'Verde/vegetativo': ['Poco mauduro','Peapod','Fresco'] }, products: { 'Poco mauduro': { name: 'Café Poco Maduro', image: '/imagenes/cafe/cafepocomaduro.jpg' } } },
    OTROS: { description: 'Notas variadas', subOptions: ['Papel/Mohoso','Químico'], finalOptions: { 'Papel/Mohoso': ['Duro','Cartón'] }, products: { Duro: { name: 'Café Duro', image: '/imagenes/cafe/cafeuro.jpg' } } },
    TOSTADO: { description: 'Impresión de tostado', subOptions: ['Quemado','Cereal'], finalOptions: { Quemado: ['Acre','Ceniciento'] }, products: { 'Marrón,Tostado': { name: 'Café Tostado', image: '/imagenes/cafe/cafetostado.jpg' } } },
    ESPECIAS: { description: 'Especias', subOptions: ['Especias marrón','Otras especias'], finalOptions: { 'Especias marrón': ['Anís','Nuez moscada','Canela','Clavo'] }, products: { Anís: { name: 'Café de Anís', image: '/imagenes/cafe/cafeanis.jpg' } } },
    'NUECES/CACAO': { description: 'Nueces y cacao', subOptions: ['Nuez','Cacao'], finalOptions: { Nuez: ['Cacahuates','Avellana'] }, products: { Cacahuates: { name: 'Café de Cacahuate', image: '/imagenes/cafe/cafecacahuate.jpg' } } }
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

    const cx = 250, cy = 250, outerR = 200, innerR = 90;
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

  // etiqueta centrada del sector
  const mid = start + anglePer / 2;
      const labelPos = polarToCartesian(cx, cy, (outerR + innerR) / 2, mid);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', String(labelPos.x));
      text.setAttribute('y', String(labelPos.y));
      text.setAttribute('class', 'sector-label');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = s.name;
      wheelGroup.appendChild(text);

      currentAngle += anglePer;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* redibujar solo en montaje */]);

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
    const product = wheelData[selectedCategory]?.products?.[finalOpt];
    if (product) {
      const price = calculatePrice(selectedCategory, finalOpt);
      setFinalProduct({ ...product, price, category: selectedCategory, option: finalOpt });
    }
  };

  const addToCart = () => {
    if (!finalProduct) return;
    const product = { id: `${finalProduct.category}-${finalProduct.option}`, name: finalProduct.name, description: finalProduct.description, price: finalProduct.price, image: finalProduct.image };
    addItem(product);
    // feedback mínimo
    alert(`${finalProduct.name} añadido al carrito`);
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
          <svg width="520" height="520" viewBox="0 0 500 500" aria-hidden>
                  <g id="wheelGroup"></g>
                </svg>
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
                <img className="product-image" src={finalProduct.image} alt={finalProduct.name} />
                <div className="product-details">
                  <strong>{finalProduct.name}</strong>
                  <div className="description">{finalProduct.description}</div>
                  <div className="price">${finalProduct.price.toLocaleString()} COP</div>
                  <button className="add-to-cart-final" onClick={addToCart}><i className="fas fa-shopping-cart"></i> Añadir al carrito</button>
                </div>
              </div>
            </div>
          )}
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
