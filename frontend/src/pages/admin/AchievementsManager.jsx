import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  X,
  Upload
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { achievementService } from '../../services/achievementService';
import { mockAchievements } from '../../utils/mockData';

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const initialForm = {
    title: '',
    organization: '',
    description: '',
    date: '',
    certificateUrl: '',
    image: '',
    order: 0,
    visible: true
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const data = await achievementService.getAdminAchievements();
      setAchievements(data && data.length > 0 ? data : mockAchievements);
    } catch (err) {
      console.warn('Failed to load achievements, using demo data:', err);
      setAchievements(mockAchievements);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const openCreateModal = () => {
    setEditingAch(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (ach) => {
    setEditingAch(ach);
    setFormData({
      title: ach.title,
      organization: ach.organization,
      description: ach.description || '',
      date: ach.date || '',
      certificateUrl: ach.certificateUrl || '',
      image: ach.image || '',
      order: ach.order || 0,
      visible: ach.visible !== false
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await achievementService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      setStatusMessage({ type: 'success', text: 'Certificate image uploaded!' });
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
        order: Number(formData.order) || 0
      };

      if (editingAch) {
        await achievementService.updateAchievement(editingAch._id, payload);
        setStatusMessage({ type: 'success', text: 'Achievement updated successfully!' });
      } else {
        await achievementService.createAchievement(payload);
        setStatusMessage({ type: 'success', text: 'Achievement created successfully!' });
      }

      setModalOpen(false);
      fetchAchievements();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.customMessage || 'Failed to save achievement' });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete achievement "${title}"?`)) return;

    try {
      await achievementService.deleteAchievement(id);
      setStatusMessage({ type: 'success', text: 'Achievement deleted successfully!' });
      fetchAchievements();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.customMessage || 'Failed to delete achievement' });
    }
  };

  const toggleVisibility = async (ach) => {
    try {
      await achievementService.updateAchievement(ach._id, { visible: !ach.visible });
      fetchAchievements();
    } catch (err) {
      console.warn('Error toggling visibility:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Achievements Manager</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Manage your certifications, awards, hackathon victories, and honors.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={openCreateModal}>
          Add Achievement
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
                <th className="px-5 py-3.5">Achievement</th>
                <th className="px-5 py-3.5">Organization</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Visibility</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {achievements.map((ach) => (
                <tr key={ach._id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-teal-400 font-bold">
                    #{ach.order ?? 0}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{ach.title}</p>
                    {ach.certificateUrl && (
                      <a
                        href={ach.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-teal-400 hover:underline mt-0.5"
                      >
                        <span>Credential Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-300">
                    {ach.organization}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 font-medium">
                    {ach.date || 'N/A'}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleVisibility(ach)}
                      className="inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {ach.visible ? (
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
                        onClick={() => openEditModal(ach)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Edit Achievement"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ach._id, ach.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Delete Achievement"
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
          <div className="bg-[#0d1424] border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingAch ? 'Edit Achievement' : 'Add New Achievement'}
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
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Amazon Web Services, Linux Foundation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2024-03"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Certificate / Verification URL
                  </label>
                  <input
                    type="url"
                    value={formData.certificateUrl}
                    onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key competencies demonstrated or scope of achievement..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Badge / Certificate Image
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
                    id="achVisible"
                    type="checkbox"
                    checked={formData.visible}
                    onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-500 bg-slate-900 border-slate-800 focus:ring-teal-500"
                  />
                  <label htmlFor="achVisible" className="text-xs text-slate-300 font-medium">
                    Visible on Site
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  {editingAch ? 'Save Changes' : 'Create Achievement'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
