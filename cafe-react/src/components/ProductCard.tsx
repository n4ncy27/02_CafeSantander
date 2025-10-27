// Archivo: ProductCard.tsx
// Tarjeta visual para un producto: muestra imagen, nombre, descripción, precio y botón para añadir al carrito.

import React from 'react';
import useCart from '../hooks/useCart';
import { useState, useEffect } from 'react';

// Tipo de producto usado por la tarjeta
type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
};

const ProductCard: React.FC<{ product: Product; onAdd: (p: Product) => void }> = ({ product, onAdd }) => {
  // Hook personalizado para acceder al carrito (persistencia y sincronización)
  const { cart } = useCart();

  // Estado local para micro-feedback al añadir (animación/estilo breve)
  const [justAdded, setJustAdded] = useState(false);

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
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        {product.description && <p>{product.description}</p>}
        <div className="product-price">
          <div>
            <div className="price">${product.price.toLocaleString()} COP</div>
            {inCartQty > 0 && <div className="in-cart-note">En carrito: {inCartQty}</div>}
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
