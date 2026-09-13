import api from './api';

export const achievementService = {
  getPublicAchievements: async () => {
    const response = await api.get('/achievements');
    return response.data.data;
  },
  getAdminAchievements: async () => {
    const response = await api.get('/admin/achievements');
    return response.data.data;
  },
  createAchievement: async (data) => {
    const response = await api.post('/admin/achievements', data);
    return response.data;
  },
  updateAchievement: async (id, data) => {
    const response = await api.patch(`/admin/achievements/${id}`, data);
    return response.data;
  },
  deleteAchievement: async (id) => {
    const response = await api.delete(`/admin/achievements/${id}`);
    return response.data;
  },
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/admin/achievements/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.url;
  }
};
