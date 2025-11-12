// Archivo: authUtils.js
// Utilidades compartidas para autenticación

export const STORAGE_KEY = 'cafesantander_state';

export function readState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], user: null };
    return JSON.parse(raw);
  } catch {
    return { cart: [], user: null };
  }
}
