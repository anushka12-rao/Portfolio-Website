import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import { mockProjects } from '../utils/mockData';

export const useProjects = (isPublic = true) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = isPublic
        ? await projectService.getPublicProjects()
        : await projectService.getAdminProjects();
      setProjects(data && data.length > 0 ? data : (isPublic ? mockProjects : []));
      setError(null);
    } catch (err) {
      console.warn('Error fetching projects, fallback to default data:', err);
      if (isPublic) {
        setProjects(mockProjects);
      }
      setError(err.customMessage || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [isPublic]);

  return { projects, loading, error, refetch: fetchProjects };
};
