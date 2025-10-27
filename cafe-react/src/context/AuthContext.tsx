// Archivo: AuthContext.tsx
// Contexto de autenticación: guarda usuario en localStorage y sincroniza entre ventanas.
import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'cafesantander_state';

// Tipo de usuario almacenado (o null si no hay sesión)
type User = { id: string; name: string; email: string } | null;

// Forma del contexto de autenticación expuesto a la app
type AuthContextValue = {
  user: User;
  isAuthenticated: boolean;
  login: (user: { id: string; name: string; email: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Lee el estado guardado en localStorage y maneja JSON inválido
function readState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], user: null } as any;
    return JSON.parse(raw);
  } catch (e) {
    return { cart: [], user: null } as any;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => readState().user ?? null);

  useEffect(() => {
    // sincronizar con otras pestañas/ventanas mediante storage event
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const s = readState();
        setUser(s.user ?? null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const persistUser = (nextUser: User) => {
    try {
      const state = readState();
      const merged = { ...state, user: nextUser };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      // notificar también a listeners en la misma ventana (evento custom)
      try { window.dispatchEvent(new CustomEvent('cafesantander_state_changed', { detail: merged })); } catch (e) {}
    } catch (e) {}
  };

  const login = (u: { id: string; name: string; email: string }) => {
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  // Validación: asegurar que el hook se use dentro del proveedor
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
