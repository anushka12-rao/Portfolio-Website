import api from './api';

export const technologyService = {
  getPublicTechnologies: async () => {
    const response = await api.get('/technologies');
    return response.data.data;
  },
  getAdminTechnologies: async () => {
    const response = await api.get('/admin/technologies');
    return response.data.data;
  },
  createTechnology: async (data) => {
    const response = await api.post('/admin/technologies', data);
    return response.data;
  },
  updateTechnology: async (id, data) => {
    const response = await api.patch(`/admin/technologies/${id}`, data);
    return response.data;
  },
  deleteTechnology: async (id) => {
    const response = await api.delete(`/admin/technologies/${id}`);
    return response.data;
  }
};
