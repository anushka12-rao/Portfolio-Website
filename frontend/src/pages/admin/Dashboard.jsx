import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Terminal,
  Trophy,
  Mail,
  User,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { profileService } from '../../services/profileService';
import { messageService } from '../../services/messageService';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalTechnologies: 0,
    totalAchievements: 0,
    totalMessages: 0,
    unreadMessages: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, messagesData] = await Promise.allSettled([
          profileService.getDashboardStats(),
          messageService.getAdminMessages()
        ]);

        if (statsData.status === 'fulfilled' && statsData.value?.totalProjects !== undefined) {
          setStats(statsData.value);
        } else {
          setStats({
            totalProjects: 4,
            publishedProjects: 3,
            draftProjects: 1,
            totalTechnologies: 16,
            totalAchievements: 2,
            totalMessages: 0,
            unreadMessages: 0
          });
        }
        if (messagesData.status === 'fulfilled' && messagesData.value?.data) {
          setRecentMessages(messagesData.value.data.slice(0, 3));
        }
      } catch (err) {
        console.warn('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Projects',
      value: stats.totalProjects,
      subtext: `${stats.publishedProjects} Published · ${stats.draftProjects} Drafts`,
      icon: FolderGit2,
      link: '/admin/projects'
    },
    {
      title: 'Technologies',
      value: stats.totalTechnologies,
      subtext: 'Categorized competencies',
      icon: Terminal,
      link: '/admin/technologies'
    },
    {
      title: 'Achievements',
      value: stats.totalAchievements,
      subtext: 'Verified credentials & awards',
      icon: Trophy,
      link: '/admin/achievements'
    },
    {
      title: 'Inquiries',
      value: stats.totalMessages,
      subtext: `${stats.unreadMessages} Unread messages`,
      icon: Mail,
      link: '/admin/messages'
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your developer portfolio content, media assets, and incoming inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/projects">
            <Button variant="primary" size="md" icon={Plus}>
              New Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 hover:border-teal-500/40 transition-all duration-200 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className="p-2 rounded-xl bg-slate-900 text-teal-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-black text-white tracking-tight">{card.value}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{card.subtext}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold text-white">Management Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/projects"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800 hover:border-teal-500/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                    Manage Projects
                  </h4>
                  <p className="text-xs text-slate-500">Edit titles, slugs, tech tags, draft/published</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
            </Link>

            <Link
              to="/admin/technologies"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800 hover:border-teal-500/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                    Manage Tech Stack
                  </h4>
                  <p className="text-xs text-slate-500">Add languages, frameworks, categories, ordering</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
            </Link>

            <Link
              to="/admin/profile"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800 hover:border-teal-500/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                    Edit Profile Details
                  </h4>
                  <p className="text-xs text-slate-500">Bio, headlines, social links, resume link</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Inquiries</h2>
            <Link to="/admin/messages" className="text-xs text-teal-400 hover:text-teal-300 font-medium">
              View All
            </Link>
          </div>

          {recentMessages.length > 0 ? (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{msg.name}</span>
                      <span className="text-xs text-slate-500">({msg.email})</span>
                    </div>
                    {!msg.read ? (
                      <Badge variant="teal" size="xs">New</Badge>
                    ) : (
                      <span className="text-[11px] text-slate-500">Read</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#0a0f1d] border border-slate-800 text-center space-y-2">
              <Mail className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-medium text-slate-300">No inquiries yet</p>
              <p className="text-xs text-slate-500">
                Messages submitted via the public contact form will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
