import { useEffect, useState, useCallback } from 'react';

// Archivo: useCart.ts
// Hook para gestionar el carrito con persistencia y sincronización.
const STORAGE_KEY = 'cafesantander_state';
const OLD_CART_KEY = 'cafesantander_cart';

export type CartItem = {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  image: string;
  quantity: number;
};

type AppState = {
  cart: CartItem[];
  user?: any | null;
};

function migrateOldCartIfNeeded() {
  try {
    const old = localStorage.getItem(OLD_CART_KEY);
    const existing = localStorage.getItem(STORAGE_KEY);
    if (old && !existing) {
  const parsedOld = JSON.parse(old);
  // si la versión anterior es un array, usarla; si no, usar array vacío
  const state: AppState = { cart: Array.isArray(parsedOld) ? parsedOld : [], user: null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.removeItem(OLD_CART_KEY);
    }
  } catch (e) {
    // ignorar errores
  }
}

function readStateFromStorage(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], user: null };
    const parsed = JSON.parse(raw);
    return { cart: Array.isArray(parsed.cart) ? parsed.cart : [], user: parsed.user ?? null };
  } catch (e) {
    return { cart: [], user: null };
  }
}

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    migrateOldCartIfNeeded();
    return readStateFromStorage().cart;
  });
  // id único por instancia para evitar reaccionar a eventos propios
  const senderId = (() => {
    // crear id estable por instancia usando una propiedad en window
    // esto mantiene el mismo id durante la carga de la página
    try {
      const key = '__cafesantander_sender_id__';
      // @ts-ignore
      if (!window[key]) window[key] = Math.random().toString(36).slice(2);
      // @ts-ignore
      return window[key] as string;
    } catch (e) {
      return Math.random().toString(36).slice(2);
    }
  })();

  // sincronizar instancias mediante un evento personalizado
  useEffect(() => {
    const onExternal = (e: Event) => {
      try {
        const ce = e as CustomEvent<any>;
        // si el evento viene de esta instancia, ignorar para evitar bucles
        if (ce?.detail?.__sender === senderId) return;
        const state = readStateFromStorage();
        setCart(state.cart);
      } catch (err) {
        const state = readStateFromStorage();
        setCart(state.cart);
      }
    };
    window.addEventListener('cafesantander_state_changed', onExternal as EventListener);
    return () => window.removeEventListener('cafesantander_state_changed', onExternal as EventListener);
  }, []);

  const persist = useCallback((newCart: CartItem[]) => {
    try {
      const existing = readStateFromStorage();
      const state: AppState = { cart: newCart, user: existing.user ?? null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // notify other hook instances in same window (with the new state as detail)
      try {
        const detail = { ...state, __sender: senderId };
        window.dispatchEvent(new CustomEvent('cafesantander_state_changed', { detail }));
      } catch (e) {}
    } catch (e) {}
  }, []);

  useEffect(() => {
    persist(cart);
  }, [cart, persist]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      let next: CartItem[];
      if (found) {
        next = prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p));
      } else {
        next = [...prev, { ...item, quantity: 1 } as CartItem];
      }
      return next;
    });
  }, []);

  const removeItem = useCallback((id: number | string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number | string, quantity: number) => {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(0, quantity) } : p)).filter(p => p.quantity > 0));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const count = cart.reduce((t, i) => t + (i.quantity || 0), 0);
  const total = cart.reduce((t, i) => t + (i.price * (i.quantity || 0)), 0);

  return { cart, addItem, removeItem, updateQuantity, clearCart, count, total } as const;
}
