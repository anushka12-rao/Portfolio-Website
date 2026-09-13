import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Projects from '../pages/public/Projects';
import TechStack from '../pages/public/TechStack';
import Achievements from '../pages/public/Achievements';
import Contact from '../pages/public/Contact';
import NotFound from '../pages/public/NotFound';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import ProjectsManager from '../pages/admin/ProjectsManager';
import TechnologiesManager from '../pages/admin/TechnologiesManager';
import AchievementsManager from '../pages/admin/AchievementsManager';
import MessagesManager from '../pages/admin/MessagesManager';
import ProfileManager from '../pages/admin/ProfileManager';
import Settings from '../pages/admin/Settings';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="technologies" element={<TechStack />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Admin Login Route (redirects to dashboard if already logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>

      {/* Protected Admin CMS Routes */}
      <Route element={<ProtectedRoute requireAdmin={true} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="technologies" element={<TechnologiesManager />} />
          <Route path="achievements" element={<AchievementsManager />} />
          <Route path="messages" element={<MessagesManager />} />
          <Route path="profile" element={<ProfileManager />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
