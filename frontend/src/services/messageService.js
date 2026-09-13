import api from './api';

export const messageService = {
  sendMessage: async (data) => {
    const response = await api.post('/messages', data);
    return response.data;
  },
  getAdminMessages: async () => {
    const response = await api.get('/admin/messages');
    return response.data;
  },
  markAsRead: async (id) => {
    const response = await api.patch(`/admin/messages/${id}/read`);
    return response.data;
  },
  deleteMessage: async (id) => {
    const response = await api.delete(`/admin/messages/${id}`);
    return response.data;
  }
};
