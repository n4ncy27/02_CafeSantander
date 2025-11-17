// ============================================
// CARRITO.JSX - PÁGINA DEL CARRITO DE COMPRAS
// ============================================
// REQUERIMIENTO: Página protegida (PrivateRoute) para gestionar carrito
// Características:
// - Vista completa de productos en el carrito
// - Actualización de cantidades (+ / -)
// - Eliminación de productos
// - Resumen de costos (subtotal, envío, descuento, total)
// - Botón para proceder al pago
// - Mensaje amigable cuando el carrito está vacío

import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import '../styles/carrito.css';
import useCart from '../hooks/useCart';

const Carrito = () => {
  // ============================================
  // HOOK DE CARRITO
  // ============================================
  // Obtener estado y funciones del carrito global
  // - cart: Array de items en el carrito
  // - removeItem: Función para eliminar producto
  // - updateQuantity: Función para actualizar cantidad
  // - total: Suma total de precios (precio × cantidad)
  // - count: Total de items (suma de cantidades)
  const { cart, removeItem, updateQuantity, total = 0, count = 0 } = useCart();

  // ============================================
  // CÁLCULOS DEL RESUMEN DE COMPRA
  // ============================================
  const shipping = 12000;  // Costo de envío fijo
  const discount = cart && cart.length > 0 ? 15000 : 0;  // Descuento si hay productos
  const finalTotal = (total || 0) + shipping - discount; // Total final

  // ============================================
  // HANDLERS DE ACCIONES DEL CARRITO
  // ============================================
  // Delegan al hook useCart que se comunica con el backend
  const handleRemove = (id) => {
    if (!id) return;
    removeItem(id);
  };
  
  const handleUpdateQuantity = (id, qty) => {
    if (!id || !qty || qty < 1) return;
    updateQuantity(id, qty);
  };

  return (
    <div className="cart-page">
  {/* Encabezado del sitio (igual que en Inicio) */}
      <Header />

  {/* Navegación de secciones (pills) para mantener paridad con Inicio */}
      <div className="container">
        <nav className="section-nav" id="section-nav">
          <NavLink to={{ pathname: '/', hash: '#productos' }} className={({ isActive }) => isActive ? 'active' : ''}>Productos</NavLink>
          <NavLink to={{ pathname: '/', hash: '#nosotros' }} className={({ isActive }) => isActive ? 'active' : ''}>Nosotros</NavLink>
          <NavLink to={{ pathname: '/', hash: '#proceso' }} className={({ isActive }) => isActive ? 'active' : ''}>Proceso</NavLink>
          <NavLink to={{ pathname: '/', hash: '#testimonios' }} className={({ isActive }) => isActive ? 'active' : ''}>Testimonios</NavLink>
          <NavLink to={{ pathname: '/', hash: '#blog' }} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
          {/* Contacto es una ruta separada */}
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>Contacto</NavLink>
        </nav>
      </div>
      <section className="cart-hero">
        <div className="container">
          <h1>Tu Carrito de Compras</h1>
          <p>Revisa tus productos antes de finalizar tu pedido</p>
        </div>
      </section>

      <div className="container cart-layout">
  {/* Columna principal: listado de items del carrito */}
  <main className="cart-left">
          {/* Si el carrito está vacío mostrar mensaje amigable */}
          {!cart || cart.length === 0 ? (
            <div className="empty-cart-centered">
              <div className="empty-cart-icon"><i className="fas fa-shopping-cart"></i></div>
              <h3>Tu carrito está vacío</h3>
              <p>Aún no has añadido productos. Ve a Inicio y agrega tus cafés favoritos.</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => {
                // Validar que el item tenga los datos necesarios
                if (!item || !item.id) return null;
                
                const itemQuantity = item.quantity || 0;
                const itemPrice = item.precio || 0;
                const itemName = item.nombre || 'Producto';
                const itemImage = item.imagen || '/imagenes/expreso.png';
                const itemDescription = item.description || '';
                
                return (
                  <article className="cart-card" key={item.id}>
                    <div className="card-thumb"><img src={itemImage} alt={itemName} /></div>
                    <div className="card-body">
                      <div className="card-title"><strong>{itemName}</strong></div>
                      <div className="card-desc">{itemDescription}</div>
                      <div className="card-actions">
                        <div className="qty-control">
                          <button className="qty-btn" onClick={() => handleUpdateQuantity(item.id, Math.max(1, itemQuantity - 1))}>-</button>
                          <span className="qty">{itemQuantity}</span>
                          <button className="qty-btn" onClick={() => handleUpdateQuantity(item.id, itemQuantity + 1)}>+</button>
                        </div>
                        <button className="link-remove" onClick={() => handleRemove(item.id)}><i className="fas fa-trash"></i> Eliminar</button>
                      </div>
                    </div>
                    <div className="card-price">${(itemPrice * itemQuantity).toLocaleString('es-CO')}</div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
        
        {/* Columna lateral: resumen y acciones del pedido */}
        <aside className="cart-right">
          <div className="summary-panel">
            <h3>Resumen del Pedido</h3>
            <div className="summary-row"><span>Subtotal ({count} productos)</span><span>${(total||0).toLocaleString('es-CO')}</span></div>
            <div className="summary-row"><span>Envío</span><span>${shipping.toLocaleString('es-CO')}</span></div>
            <div className="summary-row"><span>Descuento</span><span className="discount">-${discount.toLocaleString('es-CO')}</span></div>
            <div className="summary-row total-row"><span>Total</span><span className="total-amount">${finalTotal.toLocaleString('es-CO')}</span></div>
            <button className="checkout-btn"><i className="fas fa-lock"></i> Proceder al Pago</button>
            <NavLink to="/" className="continue-shopping">← Continuar Comprando</NavLink>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Carrito;
