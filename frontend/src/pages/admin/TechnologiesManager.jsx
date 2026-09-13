import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { technologyService } from '../../services/technologyService';

export default function TechnologiesManager() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const initialForm = {
    name: '',
    category: 'Languages',
    icon: 'Code2',
    order: 0,
    visible: true
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const data = await technologyService.getAdminTechnologies();
      setTechnologies(data || []);
    } catch (err) {
      console.warn('Failed to load technologies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const openCreateModal = () => {
    setEditingTech(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (tech) => {
    setEditingTech(tech);
    setFormData({
      name: tech.name,
      category: tech.category,
      icon: tech.icon || 'Code2',
      order: tech.order || 0,
      visible: tech.visible !== false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        order: Number(formData.order) || 0
      };

      if (editingTech) {
        await technologyService.updateTechnology(editingTech._id, payload);
        setStatusMessage({ type: 'success', text: 'Technology updated successfully!' });
      } else {
        await technologyService.createTechnology(payload);
        setStatusMessage({ type: 'success', text: 'Technology added successfully!' });
      }

      setModalOpen(false);
      fetchTechnologies();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.customMessage || 'Failed to save technology' });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" from your tech stack?`)) return;

    try {
      await technologyService.deleteTechnology(id);
      setStatusMessage({ type: 'success', text: 'Technology removed successfully!' });
      fetchTechnologies();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.customMessage || 'Failed to delete technology' });
    }
  };

  const toggleVisibility = async (tech) => {
    try {
      await technologyService.updateTechnology(tech._id, { visible: !tech.visible });
      fetchTechnologies();
    } catch (err) {
      console.warn('Error toggling visibility:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Tech Stack Manager</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Organize skills by categories, adjust ordering, and toggle public visibility.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={openCreateModal}>
          Add Technology
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
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Icon ID</th>
                <th className="px-5 py-3.5">Visibility</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {technologies.map((tech) => (
                <tr key={tech._id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-teal-400 font-bold">
                    #{tech.order ?? 0}
                  </td>
                  <td className="px-5 py-4 font-semibold text-white">
                    {tech.name}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="teal" size="xs">
                      {tech.category}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">
                    {tech.icon || 'Code2'}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleVisibility(tech)}
                      className="inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {tech.visible ? (
                        <Badge variant="emerald" size="xs">
                          <Eye className="w-3 h-3 mr-1" /> Visible
                        </Badge>
                      ) : (
                        <Badge variant="default" size="xs">
                          <EyeOff className="w-3 h-3 mr-1" /> Hidden
                        </Badge>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(tech)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Edit Technology"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tech._id, tech.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Delete Technology"
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
          <div className="bg-[#0d1424] border border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingTech ? 'Edit Technology' : 'Add New Technology'}
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
                  Technology Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Next.js, Go, Redis"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value="Languages">Languages</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Lucide Icon Key
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Code2, Terminal, Atom, Database, Cloud"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
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
                    id="techVisible"
                    type="checkbox"
                    checked={formData.visible}
                    onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-500 bg-slate-900 border-slate-800 focus:ring-teal-500"
                  />
                  <label htmlFor="techVisible" className="text-xs text-slate-300 font-medium">
                    Visible on Site
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  {editingTech ? 'Save Changes' : 'Add Technology'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
