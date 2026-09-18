import api from './api';

const DEMO_USER_KEY = 'cms_demo_admin_user';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      sessionStorage.removeItem(DEMO_USER_KEY);
      return response.data;
    } catch (err) {
      // Fallback for deployed preview when backend is on localhost or blocked by Mixed Content
      const email = credentials.email?.toLowerCase().trim();
      const pass = credentials.password;
      const isAllowedAdmin =
        email === 'anushkarao.cse@gmail.com' ||
        email === 'admin@portfolio.local';

      if (isAllowedAdmin && pass === 'Admin@123456') {
        const demoUser = {
          id: 'admin_demo_001',
          email: email,
          role: 'admin'
        };
        sessionStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
        return {
          message: 'Login successful (Cloud Demo Mode)',
          user: demoUser
        };
      }
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore network error on logout
    } finally {
      sessionStorage.removeItem(DEMO_USER_KEY);
    }
    return { message: 'Logout successful' };
  },

  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      const demoUserJson = sessionStorage.getItem(DEMO_USER_KEY);
      if (demoUserJson) {
        try {
          const user = JSON.parse(demoUserJson);
          return { user };
        } catch (e) {
          sessionStorage.removeItem(DEMO_USER_KEY);
        }
      }
      throw err;
    }
  }
};

