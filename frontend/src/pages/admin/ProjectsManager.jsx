import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  Star,
  Eye,
  EyeOff
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { projectService } from '../../services/projectService';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const initialForm = {
    title: '',
    slug: '',
    description: '',
    technologies: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
    published: true
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAdminProjects();
      setProjects(data || []);
    } catch (err) {
      console.warn('Failed to load admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      description: proj.description,
      technologies: (proj.technologies || []).join(', '),
      image: proj.image || '',
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      featured: Boolean(proj.featured),
      order: proj.order || 0,
      published: proj.published !== false
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await projectService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      setStatusMessage({ type: 'success', text: 'Image uploaded successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.customMessage || 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        order: Number(formData.order) || 0
      };

      if (editingProject) {
        await projectService.updateProject(editingProject._id, payload);
        setStatusMessage({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await projectService.createProject(payload);
        setStatusMessage({ type: 'success', text: 'Project created successfully!' });
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.customMessage || 'Failed to save project' });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await projectService.deleteProject(id);
      setStatusMessage({ type: 'success', text: 'Project deleted successfully!' });
      fetchProjects();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.customMessage || 'Failed to delete project' });
    }
  };

  const togglePublish = async (proj) => {
    try {
      await projectService.updateProject(proj._id, { published: !proj.published });
      fetchProjects();
    } catch (err) {
      console.warn('Error updating status:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Projects Manager</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Create, edit, sort, and publish portfolio project showcases.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={openCreateModal}>
          Add Project
        </Button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/30 text-rose-300'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-[#0a0f1d] border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Order</th>
                <th className="px-5 py-3.5">Project</th>
                <th className="px-5 py-3.5">Technologies</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Featured</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((proj) => (
                <tr key={proj._id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-teal-400 font-bold">
                    #{proj.order ?? 0}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {proj.image ? (
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-950 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 flex-shrink-0">
                          <FolderGit2 className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white">{proj.title}</p>
                        <p className="text-xs text-slate-500 font-mono">/{proj.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(proj.technologies || []).slice(0, 3).map((t, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 text-[11px] text-slate-400 border border-slate-800">
                          {t}
                        </span>
                      ))}
                      {(proj.technologies || []).length > 3 && (
                        <span className="text-[11px] text-slate-500">
                          +${(proj.technologies || []).length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => togglePublish(proj)}
                      className="inline-flex items-center gap-1.5 cursor-pointer"
                      title="Click to toggle status"
                    >
                      {proj.published ? (
                        <Badge variant="emerald" size="xs">
                          <Eye className="w-3 h-3 mr-1" /> Published
                        </Badge>
                      ) : (
                        <Badge variant="default" size="xs">
                          <EyeOff className="w-3 h-3 mr-1" /> Draft
                        </Badge>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    {proj.featured ? (
                      <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-medium">
                        <Star className="w-3.5 h-3.5 fill-current" /> Yes
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">No</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj._id, proj.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d1424] border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Distributed Cache Mesh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Custom Slug (optional, auto-generated if blank)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="distributed-cache-mesh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the problem solved, architecture, and results..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Go, Docker"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Project Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://... or upload below"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                  <label className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Numeric Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-500 bg-slate-900 border-slate-800 focus:ring-teal-500"
                  />
                  <label htmlFor="featured" className="text-xs text-slate-300 font-medium">
                    Featured
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    id="published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-500 bg-slate-900 border-slate-800 focus:ring-teal-500"
                  />
                  <label htmlFor="published" className="text-xs text-slate-300 font-medium">
                    Published
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
