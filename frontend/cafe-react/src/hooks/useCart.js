// ============================================
// USECART.JS - HOOK PERSONALIZADO DEL CARRITO
// ============================================
// REQUERIMIENTO: Hook para gestión global del carrito de compras
// Proporciona estado y funciones para manipular el carrito
// Sincronización en tiempo real entre componentes mediante eventos

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/useAuthHook';
import { API_BASE_URL } from '../services/api';

export default function useCart() {
  // Obtener estado de autenticación del AuthContext
  const { isAuthenticated, token } = useAuth();
  
  // ============================================
  // ESTADO LOCAL DEL HOOK
  // ============================================
  const [cart, setCart] = useState([]);        // Items del carrito
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null);     // Errores de operaciones

  // ============================================
  // GENERADOR DE ID ÚNICO PARA SINCRONIZACIÓN
  // ============================================
  // senderId: Identificador único de esta instancia del hook
  // Propósito: Evitar reaccionar a eventos generados por esta misma instancia
  // Caso de uso: Múltiples instancias de useCart (Header, Carrito, ProductCard)
  const senderId = (() => {
    try {
      const key = '__cafesantander_cart_sender_id__';
      if (!window[key]) window[key] = Math.random().toString(36).slice(2);
      return window[key];
    } catch {
      return Math.random().toString(36).slice(2);
    }
  })();

  // ============================================
  // broadcastCart() - Emitir evento de actualización del carrito
  // ============================================
  // Propósito: Sincronizar cambios del carrito entre componentes
  // Evento: 'cafesantander_cart_updated'
  // Detail: { cart, count, __sender }
  const broadcastCart = (newCart) => {
    try {
      const detail = { 
        cart: newCart, 
        count: (newCart || []).reduce((t, i) => t + (i.quantity || 0), 0), 
        __sender: senderId 
      };
      window.dispatchEvent(new CustomEvent('cafesantander_cart_updated', { detail }));
    } catch (err) {
      // Ignorar errores de broadcast (no críticos)
    }
  };

  // ============================================
  // fetchCart() - Obtener carrito desde el backend o localStorage
  // ============================================
  // Si autenticado: GET /api/carrito (backend)
  // Si NO autenticado: Cargar desde localStorage
  // Comportamiento: Convierte formato de API a formato de UI
  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Si está autenticado, obtener del backend
      if (isAuthenticated && token) {
        // Petición al backend con token JWT
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
        
        // ============================================
        // TRANSFORMACIÓN DE DATOS API → UI
        // ============================================
        // Backend retorna: { items: [{ id, producto_id, nombre, precio, cantidad, imagen }] }
        // UI espera: [{ id, itemId, nombre, precio, quantity, imagen }]
        const cartItems = (data.items || []).map(item => ({
          id: item.producto_id,        // ID del producto (para identificación)
          itemId: item.id,              // ID de carrito_items (para actualizaciones/eliminación)
          nombre: item.nombre,
          imagen: item.imagen,
          precio: item.precio,
          quantity: item.cantidad
        }));
        
        setCart(cartItems);
        broadcastCart(cartItems);
      } else {
        // FALLBACK: Si NO está autenticado, cargar desde localStorage
        const localCart = JSON.parse(localStorage.getItem('cafesantander_cart') || '[]');
        setCart(localCart);
        broadcastCart(localCart);
      }
    } catch (err) {
      console.error('Error al cargar carrito:', err);
      setError(err.message);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  // ============================================
  // EFECTO: Cargar carrito al montar o cuando cambia autenticación
  // ============================================
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ============================================
  // EFECTO: Sincronización entre instancias del hook
  // ============================================
  // Escucha eventos 'cafesantander_cart_updated' de otras instancias
  // Evita loops infinitos verificando __sender
  useEffect(() => {
    const handler = (e) => {
      try {
        const detail = e?.detail;
        if (!detail) return;
        
        // Ignorar eventos propios (generados por esta instancia)
        if (detail.__sender === senderId) return;
        
        // Actualizar carrito local con datos del evento
        const incoming = Array.isArray(detail.cart) ? detail.cart : [];
        setCart(incoming);
      } catch {
        // Ignorar errores de sincronización
      }
    };
    
    // Registrar listener al montar
    window.addEventListener('cafesantander_cart_updated', handler);
    
    // Limpiar listener al desmontar
    return () => window.removeEventListener('cafesantander_cart_updated', handler);
  }, [senderId]);

  // ============================================
  // addItem() - Agregar producto al carrito
  // ============================================
  // Parámetros: item { id } - Objeto con ID del producto
  // Endpoint: POST /api/carrito/agregar (si autenticado)
  // Fallback: Guardar en localStorage si no está autenticado
  // Comportamiento: Si el producto ya existe, incrementa cantidad
  const addItem = useCallback(async (item) => {
    try {
      // Si está autenticado, usar backend
      if (isAuthenticated && token) {
        // Petición POST para agregar producto
        const response = await fetch(`${API_BASE_URL}/carrito/agregar`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: item.id,  // ID del producto a agregar
            quantity: 1          // Por defecto 1 unidad
          })
        });

        if (!response.ok) {
          throw new Error('Error al agregar producto');
        }

        // Recargar carrito completo desde el backend
        // Esto actualiza el estado y emite evento de sincronización
        await fetchCart();
      } else {
        // FALLBACK: Si NO está autenticado, usar localStorage
        const currentCart = JSON.parse(localStorage.getItem('cafesantander_cart') || '[]');
        const existingItem = currentCart.find(i => i.id === item.id);

        if (existingItem) {
          existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
          currentCart.push({
            id: item.id,
            quantity: 1,
            // Información que obtendremos del producto
            nombre: item.nombre || 'Producto',
            precio: item.precio || 0,
            imagen: item.imagen || '/imagenes/expreso.png'
          });
        }

        localStorage.setItem('cafesantander_cart', JSON.stringify(currentCart));
        setCart(currentCart);
        broadcastCart(currentCart);
      }
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      setError(err.message);
    }
  }, [isAuthenticated, token, fetchCart]);

  // ============================================
  // removeItem() - Eliminar producto del carrito
  // ============================================
  // Parámetros: id - ID del producto
  // Si autenticado: DELETE /api/carrito/eliminar/:itemId
  // Si NO autenticado: Eliminar de localStorage
  const removeItem = useCallback(async (id) => {
    try {
      if (isAuthenticated && token) {
        // Modo autenticado: usar backend
        const item = cart.find(i => i.id === id);
        if (!item || !item.itemId) {
          throw new Error('Item no encontrado');
        }

        // Petición DELETE con itemId en la URL
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

        // Recargar carrito desde backend
        await fetchCart();
      } else {
        // FALLBACK: Si NO está autenticado, eliminar de localStorage
        const currentCart = JSON.parse(localStorage.getItem('cafesantander_cart') || '[]');
        const filteredCart = currentCart.filter(item => item.id !== id);
        localStorage.setItem('cafesantander_cart', JSON.stringify(filteredCart));
        setCart(filteredCart);
        broadcastCart(filteredCart);
      }
    } catch (err) {
      console.error('Error al eliminar del carrito:', err);
      setError(err.message);
    }
  }, [isAuthenticated, token, cart, fetchCart]);

  // ============================================
  // updateQuantity() - Actualizar cantidad de un producto
  // ============================================
  // Parámetros:
  //   - id: ID del producto
  //   - quantity: Nueva cantidad (si es 0 o negativo, elimina el item)
  // Si autenticado: PUT /api/carrito/actualizar/:itemId
  // Si NO autenticado: Actualizar en localStorage
  const updateQuantity = useCallback(async (id, quantity) => {
    try {
      // Si la cantidad es 0 o negativa, eliminar el item
      if (quantity <= 0) {
        await removeItem(id);
        return;
      }

      if (isAuthenticated && token) {
        // Modo autenticado: usar backend
        const item = cart.find(i => i.id === id);
        if (!item || !item.itemId) {
          throw new Error('Item no encontrado');
        }

        // Petición PUT para actualizar cantidad
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

        // Recargar carrito desde backend
        await fetchCart();
      } else {
        // FALLBACK: Si NO está autenticado, actualizar en localStorage
        const currentCart = JSON.parse(localStorage.getItem('cafesantander_cart') || '[]');
        const itemIndex = currentCart.findIndex(i => i.id === id);
        if (itemIndex >= 0) {
          currentCart[itemIndex].quantity = quantity;
          localStorage.setItem('cafesantander_cart', JSON.stringify(currentCart));
          setCart(currentCart);
          broadcastCart(currentCart);
        }
      }
    } catch (err) {
      console.error('Error al actualizar carrito:', err);
      setError(err.message);
    }
  }, [isAuthenticated, token, cart, fetchCart, removeItem]);

  // ============================================
  // clearCart() - Vaciar carrito completamente
  // ============================================
  // Endpoint: DELETE /api/carrito/vaciar
  // Comportamiento: Elimina todos los items del carrito activo
  const clearCart = useCallback(async () => {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      // Petición DELETE para vaciar carrito
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

      // Actualizar estado local a carrito vacío
      setCart([]);
      
      // Emitir evento de sincronización con carrito vacío
      broadcastCart([]);
    } catch (err) {
      console.error('Error al vaciar carrito:', err);
      setError(err.message);
    }
  }, [isAuthenticated, token]);

  // ============================================
  // CÁLCULOS DERIVADOS
  // ============================================
  // count: Total de items (suma de cantidades)
  const count = cart.reduce((t, i) => t + (i.quantity || 0), 0);
  
  // total: Precio total del carrito (suma de precio × cantidad)
  const total = cart.reduce((t, i) => t + (i.precio * (i.quantity || 0)), 0);

  // ============================================
  // RETORNO DEL HOOK
  // ============================================
  // Proporciona estado y funciones para gestionar carrito
  return {
    cart,           // Array de items del carrito
    addItem,        // Función para agregar producto
    removeItem,     // Función para eliminar producto
    updateQuantity, // Función para actualizar cantidad
    clearCart,      // Función para vaciar carrito
    count,          // Total de items (número)
    total,          // Precio total (número)
    loading,        // Estado de carga (boolean)
    error           // Error si hubo alguno (string | null)
  };
}
