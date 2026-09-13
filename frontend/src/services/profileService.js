import api from './api';

export const profileService = {
  getPublicProfile: async () => {
    const response = await api.get('/profile');
    return response.data.data;
  },
  updateProfile: async (data) => {
    const response = await api.patch('/admin/profile', data);
    return response.data;
  },
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data.stats;
  }
};
