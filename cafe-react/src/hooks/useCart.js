import { useEffect, useState, useCallback } from 'react';

// Archivo: useCart.js
// Hook para gestionar el carrito con persistencia y sincronización.
const STORAGE_KEY = 'cafesantander_state';
const OLD_CART_KEY = 'cafesantander_cart';

function migrateOldCartIfNeeded() {
  try {
    const old = localStorage.getItem(OLD_CART_KEY);
    const existing = localStorage.getItem(STORAGE_KEY);
    if (old && !existing) {
  const parsedOld = JSON.parse(old);
  // si la versión anterior es un array, usarla; si no, usar array vacío
  const state = { cart: Array.isArray(parsedOld) ? parsedOld : [], user: null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.removeItem(OLD_CART_KEY);
    }
  } catch {
    // ignorar errores
  }
}

function readStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], user: null };
    const parsed = JSON.parse(raw);
    return { cart: Array.isArray(parsed.cart) ? parsed.cart : [], user: parsed.user ?? null };
  } catch {
    return { cart: [], user: null };
  }
}

export default function useCart() {
  const [cart, setCart] = useState(() => {
    migrateOldCartIfNeeded();
    return readStateFromStorage().cart;
  });
  // id único por instancia para evitar reaccionar a eventos propios
  const senderId = (() => {
    // crear id estable por instancia usando una propiedad en window
    // esto mantiene el mismo id durante la carga de la página
    try {
      const key = '__cafesantander_sender_id__';
      if (!window[key]) window[key] = Math.random().toString(36).slice(2);
      return window[key];
    } catch {
      return Math.random().toString(36).slice(2);
    }
  })();

  // sincronizar instancias mediante un evento personalizado
  useEffect(() => {
    const onExternal = (event) => {
      try {
        // si el evento lo envié yo mismo, no hago nada
        if (event.detail && event.detail.__sender === senderId) {
          return;
        }
        const state = readStateFromStorage();
        setCart(state.cart);
      } catch {
        // si hay error, intento leer de nuevo por si acaso
        const state = readStateFromStorage();
        setCart(state.cart);
      }
    };
    window.addEventListener('cafesantander_state_changed', onExternal);
    return () => window.removeEventListener('cafesantander_state_changed', onExternal);
  }, [senderId]);

  const persist = useCallback((newCart) => {
    try {
      const existing = readStateFromStorage();
      const state = { cart: newCart, user: existing.user ?? null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // notify other hook instances in same window (with the new state as detail)
      try {
        const detail = { ...state, __sender: senderId };
        window.dispatchEvent(new CustomEvent('cafesantander_state_changed', { detail }));
      } catch {
        // ignorar errores de evento custom
      }
    } catch {
      // ignorar errores de persistencia
    }
  }, [senderId]);

  useEffect(() => {
    persist(cart);
  }, [cart, persist]);

  const addItem = useCallback((item) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      let next;
      if (found) {
        next = prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p));
      } else {
        next = [...prev, { ...item, quantity: 1 }];
      }
      return next;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(0, quantity) } : p)).filter(p => p.quantity > 0));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const count = cart.reduce((t, i) => t + (i.quantity || 0), 0);
  const total = cart.reduce((t, i) => t + (i.price * (i.quantity || 0)), 0);

  return { cart, addItem, removeItem, updateQuantity, clearCart, count, total };
}
