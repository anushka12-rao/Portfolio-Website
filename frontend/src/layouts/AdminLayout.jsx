import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Terminal,
  Trophy,
  Mail,
  User,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { messageService } from '../services/messageService';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    messageService.getAdminMessages()
      .then((res) => {
        if (res?.unreadCount !== undefined) {
          setUnreadCount(res.unreadCount);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Tech Stack', path: '/admin/technologies', icon: Terminal },
    { name: 'Achievements', path: '/admin/achievements', icon: Trophy },
    {
      name: 'Messages',
      path: '/admin/messages',
      icon: Mail,
      badge: unreadCount > 0 ? unreadCount : null
    },
    { name: 'Profile Editor', path: '/admin/profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col md:flex-row">
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0f1d] border-r border-slate-800/80 p-5 shrink-0 justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
              P
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">CMS Admin</h2>
              <p className="text-[11px] text-teal-400 font-medium tracking-wide">PORTFOLIO MANAGER</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <p className="text-slate-400">Signed in as:</p>
            <p className="text-white font-medium truncate mt-0.5">{user?.email || 'admin@portfolio.local'}</p>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-teal-300 hover:bg-slate-800/60 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <header className="md:hidden flex items-center justify-between bg-[#0a0f1d] border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-slate-950 text-xs">
            P
          </div>
          <span className="font-bold text-sm text-white">Portfolio CMS Admin</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-slate-800 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800"
            >
              <span>{item.name}</span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-500 text-slate-950">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <a href="/" target="_blank" rel="noreferrer" className="text-xs text-teal-400">
              View Public Site
            </a>
            <button onClick={handleLogout} className="text-xs text-rose-400">
              Sign Out
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
