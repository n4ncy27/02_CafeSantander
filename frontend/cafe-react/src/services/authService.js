import fetchAPI from './api';

export const authService = {
  async register(userData) {
    return await fetchAPI('/auth/registro', {
      method: 'POST',
      body: userData,
    });
  },

  async login(credentials) {
    return await fetchAPI('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  async getProfile() {
    return await fetchAPI('/auth/perfil');
  },
};