import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/useAuthHook';
import { API_BASE_URL } from '../services/api';

export default function useCart() {
  const { isAuthenticated, token } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // senderId para evitar reaccionar a nuestros propios eventos
  const senderId = (() => {
    try {
      const key = '__cafesantander_cart_sender_id__';
      if (!window[key]) window[key] = Math.random().toString(36).slice(2);
      return window[key];
    } catch {
      return Math.random().toString(36).slice(2);
    }
  })();

  const broadcastCart = (newCart) => {
    try {
      const detail = { cart: newCart, count: (newCart || []).reduce((t, i) => t + (i.quantity || 0), 0), __sender: senderId };
      window.dispatchEvent(new CustomEvent('cafesantander_cart_updated', { detail }));
    } catch (err) {
      // ignorar
    }
  };

  // Obtener carrito del backend
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setCart([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/carrito`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener carrito');
      }

      const data = await response.json();
      // Convertir el formato de API al formato esperado por la UI
      const cartItems = (data.items || []).map(item => ({
        id: item.producto_id,
        itemId: item.id, // ID de carrito_items para actualizaciones
        nombre: item.nombre,
        imagen: item.imagen,
        precio: item.precio,
        quantity: item.cantidad
      }));
      setCart(cartItems);
      // Broadcast para sincronizar otras instancias del hook (Header, etc.)
      broadcastCart(cartItems);
    } catch (err) {
      console.error('Error al cargar carrito:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  // Cargar carrito al montar o cuando cambia autenticación
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Escuchar actualizaciones externas del carrito y sincronizar
  useEffect(() => {
    const handler = (e) => {
      try {
        const detail = e?.detail;
        if (!detail) return;
        if (detail.__sender === senderId) return; // evento propio
        const incoming = Array.isArray(detail.cart) ? detail.cart : [];
        setCart(incoming);
      } catch {
        // ignorar
      }
    };
    window.addEventListener('cafesantander_cart_updated', handler);
    return () => window.removeEventListener('cafesantander_cart_updated', handler);
  }, [senderId]);

  const addItem = useCallback(async (item) => {
    if (!isAuthenticated || !token) {
      console.log('Usuario no autenticado');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/carrito/agregar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: item.id,
          quantity: 1
        })
      });

      if (!response.ok) {
        throw new Error('Error al agregar producto');
      }

      // Recargar carrito después de agregar
      await fetchCart();
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      setError(err.message);
    }
  }, [isAuthenticated, token, fetchCart]);

  const removeItem = useCallback(async (id) => {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      // Buscar el itemId (ID de carrito_items) desde el carrito actual
      const item = cart.find(i => i.id === id);
      if (!item || !item.itemId) {
        throw new Error('Item no encontrado');
      }

      const response = await fetch(`${API_BASE_URL}/carrito/eliminar/${item.itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      // Recargar carrito
      await fetchCart();
    } catch (err) {
      console.error('Error al eliminar del carrito:', err);
      setError(err.message);
    }
  }, [isAuthenticated, token, cart, fetchCart]);

  const updateQuantity = useCallback(async (id, quantity) => {
    if (!isAuthenticated || !token) {
      return;
    }

    if (quantity <= 0) {
      await removeItem(id);
      return;
    }

    try {
      const item = cart.find(i => i.id === id);
      if (!item || !item.itemId) {
        throw new Error('Item no encontrado');
      }

      const response = await fetch(`${API_BASE_URL}/carrito/actualizar/${item.itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar cantidad');
      }

      // Recargar carrito
      await fetchCart();
    } catch (err) {
      console.error('Error al actualizar carrito:', err);
      setError(err.message);
    }
  }, [isAuthenticated, token, cart, fetchCart, removeItem]);

  const clearCart = useCallback(async () => {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/carrito/vaciar`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al vaciar carrito');
      }

      setCart([]);
      broadcastCart([]);
    } catch (err) {
      console.error('Error al vaciar carrito:', err);
      setError(err.message);
    }
  }, [isAuthenticated, token]);

  const count = cart.reduce((t, i) => t + (i.quantity || 0), 0);
  const total = cart.reduce((t, i) => t + (i.precio * (i.quantity || 0)), 0);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    count,
    total,
    loading,
    error
  };
}
