// Archivo: Carrito.tsx
// Página: gestión y resumen del carrito de compras.

import React from 'react';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import '../styles/carrito.css';
import useCart from '../hooks/useCart';

type CartItemType = { id: number | string; name: string; description?: string; price: number; image: string; quantity: number };

const Carrito: React.FC = () => {
  const { cart, removeItem, updateQuantity, total = 0, count = 0 } = useCart();

  const shipping = 12000;
  const discount = cart && cart.length > 0 ? 15000 : 0;
  const finalTotal = (total || 0) + shipping - discount;

  const handleRemove = (id: number | string) => removeItem(id);
  const handleUpdateQuantity = (id: number | string, qty: number) => updateQuantity(id, qty);

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
              {cart.map((item: CartItemType) => (
                <article className="cart-card" key={item.id}>
                  <div className="card-thumb"><img src={item.image} alt={item.name} /></div>
                  <div className="card-body">
                    <div className="card-title"><strong>{item.name}</strong></div>
                    <div className="card-desc">{item.description || ''}</div>
                    <div className="card-actions">
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => handleUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}>-</button>
                        <span className="qty">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => handleUpdateQuantity(item.id, (item.quantity || 0) + 1)}>+</button>
                      </div>
                      <button className="link-remove" onClick={() => handleRemove(item.id)}><i className="fas fa-trash"></i> Eliminar</button>
                    </div>
                  </div>
                  <div className="card-price">${(item.price * (item.quantity || 0)).toLocaleString()}</div>
                </article>
              ))}
            </div>
          )}
        </main>
        
        {/* Columna lateral: resumen y acciones del pedido */}
        <aside className="cart-right">
          <div className="summary-panel">
            <h3>Resumen del Pedido</h3>
            <div className="summary-row"><span>Subtotal ({count} productos)</span><span>${(total||0).toLocaleString()}</span></div>
            <div className="summary-row"><span>Envío</span><span>${shipping.toLocaleString()}</span></div>
            <div className="summary-row"><span>Descuento</span><span className="discount">-${discount.toLocaleString()}</span></div>
            <div className="summary-row total-row"><span>Total</span><span className="total-amount">${finalTotal.toLocaleString()}</span></div>
            <button className="checkout-btn"><i className="fas fa-lock"></i> Proceder al Pago</button>
            <NavLink to="/" className="continue-shopping">← Continuar Comprando</NavLink>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Carrito;
