// Archivo: InlineCartPreview.jsx
// Componente: vista previa rápida del carrito (panel lateral pequeño).
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuthHook';

const InlineCartPreview = () => {
  const { cart, removeItem, updateQuantity, total = 0, count = 0 } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si no está autenticado, no mostrar el panel
  if (!isAuthenticated) {
    return null;
  }

  // Costos y totales
  const shipping = 12000; // costo fijo de envío mostrado aquí
  const discount = cart && cart.length > 0 ? 15000 : 0; // descuento condicional
  const finalTotal = (total || 0) + shipping - discount; // total final mostrado

  return (
    <aside className="inline-cart-panel">
      {/* Cabecera del panel con ícono y contador */}
      <div className="inline-cart-header">
        <div className="cart-badge"><i className="fas fa-shopping-cart"></i><span className="count">{count}</span></div>
      </div>
      {!cart || cart.length === 0 ? (
        <div className="inline-empty">No hay productos aún. Añade algo desde la sección de productos.</div>
      ) : (
        <div className="inline-items">
            {cart.map((item) => (
            <div className="inline-item" key={item.id}>
              <div className="inline-thumb">
                <img
                  src={item.imagen || '/imagenes/expreso.png'}
                  alt={item.nombre}
                  onError={(e) => { e.target.onerror = null; e.target.src = '/imagenes/expreso.png'; }}
                />
              </div>
              <div className="inline-meta">
                <div className="inline-name">{item.nombre}</div>
                {/* Controles: disminuir/aumentar cantidad y eliminar */}
                <div className="inline-controls">
                  <button className="q" onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}>-</button>
                  <span className="qty">{item.quantity}</span>
                  <button className="q" onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}>+</button>
                  <button className="remove" onClick={() => removeItem(item.id)}>Eliminar</button>
                </div>
              </div>
              <div className="inline-price">${(item.precio || 0).toLocaleString('es-CO')}</div>
            </div>
          ))}

          {/* Resumen con subtotal, envío, descuento y total final */}
          <div className="inline-summary">
            <div className="row"><span>Subtotal ({count})</span><span>${(total||0).toLocaleString('es-CO')}</span></div>
            <div className="row"><span>Envío</span><span>${shipping.toLocaleString('es-CO')}</span></div>
            <div className="row"><span>Descuento</span><span className="discount">-${discount.toLocaleString('es-CO')}</span></div>
            <div className="row total"><span>Total</span><span>${finalTotal.toLocaleString('es-CO')}</span></div>
            <button className="checkout" onClick={() => navigate('/carrito')}>Ir al Carrito</button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default InlineCartPreview;
