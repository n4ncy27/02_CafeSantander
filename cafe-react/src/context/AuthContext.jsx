// Archivo: AuthContext.jsx
// Contexto de autenticación: guarda usuario en localStorage y sincroniza entre ventanas.
import { createContext, useEffect, useState } from 'react';
import { STORAGE_KEY, readState } from './authUtils';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => readState().user ?? null);

  useEffect(() => {
    // sincronizar con otras pestañas/ventanas mediante storage event
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        const s = readState();
        setUser(s.user ?? null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const persistUser = (nextUser) => {
    try {
      const state = readState();
      const merged = { ...state, user: nextUser };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      // notificar también a listeners en la misma ventana (evento custom)
      try { 
        window.dispatchEvent(new CustomEvent('cafesantander_state_changed', { detail: merged })); 
      } catch {
        // ignorar errores de evento custom
      }
    } catch {
      // ignorar errores de persistencia
    }
  };

  const login = (u) => {
    setUser(u);
    persistUser(u);
  };

  const logout = () => {
    setUser(null);
    persistUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
