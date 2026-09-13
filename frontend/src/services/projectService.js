import api from './api';

export const projectService = {
  getPublicProjects: async () => {
    const response = await api.get('/projects');
    return response.data.data;
  },
  getProjectBySlug: async (slug) => {
    const response = await api.get(`/projects/${slug}`);
    return response.data.data;
  },
  getAdminProjects: async () => {
    const response = await api.get('/admin/projects');
    return response.data.data;
  },
  createProject: async (projectData) => {
    const response = await api.post('/admin/projects', projectData);
    return response.data;
  },
  updateProject: async (id, projectData) => {
    const response = await api.patch(`/admin/projects/${id}`, projectData);
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/admin/projects/${id}`);
    return response.data;
  },
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/admin/projects/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.url;
  }
};
