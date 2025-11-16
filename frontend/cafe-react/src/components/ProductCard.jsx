// ============================================
// PRODUCTCARD.JSX - TARJETA DE PRODUCTO
// ============================================
// REQUERIMIENTO: Componente reutilizable para mostrar productos
// Características:
// - Muestra imagen, nombre, precio del producto
// - Botón para añadir al carrito
// - Indicador visual de cantidad en carrito
// - Feedback inmediato al añadir (animación)
// - Sincronización en tiempo real con el carrito global

import React from 'react';
import useCart from '../hooks/useCart';
import { useState, useEffect } from 'react';

const ProductCard = ({ product, onAdd }) => {
  // ============================================
  // INTEGRACIÓN CON CARRITO GLOBAL
  // ============================================
  // Hook personalizado que proporciona acceso al carrito
  // y sincronización automática entre componentes
  const { cart } = useCart();

  // ============================================
  // ESTADO LOCAL PARA FEEDBACK VISUAL
  // ============================================
  // Control de animación breve al añadir producto
  const [justAdded, setJustAdded] = useState(false);

  // ============================================
  // CÁLCULO DE CANTIDAD EN CARRITO
  // ============================================
  // useMemo optimiza el cálculo evitando búsquedas innecesarias
  // Busca este producto en el carrito y retorna su cantidad
  // Si no está en el carrito, retorna 0
  const inCartQty = React.useMemo(() => {
    const found = cart.find((c) => c.id === product.id);
    return found ? found.quantity : 0;
  }, [cart, product.id]);

  // Efecto: cuando la cantidad en carrito para este producto cambia, mostrar feedback corto
  useEffect(() => {
    if (inCartQty > 0) {
      setJustAdded(true);
      const t = setTimeout(() => setJustAdded(false), 1400);
      return () => clearTimeout(t);
    }
  }, [inCartQty]);

  // Manejador al pulsar añadir: delega al padre y muestra feedback inmediato
  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imagen || '/imagenes/expreso.png'} alt={product.nombre} />
      </div>
      <div className="product-info">
        <h3>{product.nombre}</h3>
        {product.descripcion && <p>{product.descripcion}</p>}
        <div className="product-price">
          <div>
            <div className="price">${Number(product.precio).toLocaleString('es-CO')} COP</div>
          </div>
          <button
            className={`add-to-cart ${inCartQty > 0 || justAdded ? 'added' : ''}`}
            onClick={handleAdd}
            aria-pressed={inCartQty > 0}
          >
            {inCartQty > 0 ? `Añadido (${inCartQty})` : (justAdded ? 'Añadido' : 'Añadir al carrito')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
