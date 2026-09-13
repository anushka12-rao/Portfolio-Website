import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Github, Linkedin, FileText, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';
import { profileService } from '../../services/profileService';
import { mockProfile } from '../../utils/mockData';

export default function About() {
  const [profile, setProfile] = useState(mockProfile);

  useEffect(() => {
    profileService.getPublicProfile()
      .then((data) => {
        if (data) setProfile(data);
      })
      .catch((err) => console.warn('Using default profile:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Hi, I'm {profile?.name || 'Alex Morgan'}.
          </h1>

          <p className="text-xl text-teal-400 font-medium">
            {profile?.headline || 'Full-Stack Software Engineer & Distributed Systems Architect'}
          </p>

          <div className="text-slate-300 text-base leading-relaxed space-y-4">
            <p>
              {profile?.bio || 'Passionate engineer with experience engineering high-performance web applications and robust cloud microservices.'}
            </p>
            <p>
              Throughout my engineering journey, I have focused on closing the loop between fluid frontend user experiences and resilient, fault-tolerant backend infrastructure. I believe strongly in type safety, comprehensive automated testing, and observable systems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {profile?.resumeUrl && profile.resumeUrl !== '#' && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                <Button variant="primary" size="md" icon={FileText}>
                  Download Resume
                </Button>
              </a>
            )}
            <Link to="/contact">
              <Button variant="secondary" size="md" icon={Mail}>
                Contact Me
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                alt={profile?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-200 font-medium">{profile?.location || 'San Francisco, CA / Remote'}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800">
                <span className="text-slate-500">Focus</span>
                <span className="text-slate-200 font-medium">React, Node, Cloud & Security</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2">
                <span className="text-slate-500">Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Open to Opportunities
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-4">
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-8">Core Engineering Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Scalable Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Designing systems with separation of concerns, defensive validation, and modular decoupling to allow seamless scaling as traffic grows.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Security by Default</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enforcing zero-trust security postures: strict CORS, HttpOnly SameSite cookie authentication, automated schema sanitation, and rate limiting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">Intuitive Craftsmanship</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Delivering polished, accessible, and fast web experiences with micro-animations, clear navigation, and responsive ergonomics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
