import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070b14] border-t border-slate-800/70 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-slate-950 text-sm">
                P
              </div>
              <span className="font-bold text-slate-100 text-base">Portfolio<span className="text-teal-400">CMS</span></span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              An extensible, production-ready portfolio and full-stack content management platform engineered with React, Express, and MongoDB.
            </p>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-teal-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-teal-300 transition-colors">About Me</Link></li>
              <li><Link to="/projects" className="hover:text-teal-300 transition-colors">Projects & Work</Link></li>
              <li><Link to="/technologies" className="hover:text-teal-300 transition-colors">Tech Stack</Link></li>
              <li><Link to="/achievements" className="hover:text-teal-300 transition-colors">Achievements</Link></li>
              <li><Link to="/contact" className="hover:text-teal-300 transition-colors">Get In Touch</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">Connect & Admin</h4>
            <div className="flex items-center gap-3 mb-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-teal-500/50 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-teal-500/50 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <Link to="/contact" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-teal-500/50 transition-all">
                <Mail className="w-4 h-4" />
              </Link>
            </div>
            <Link to="/admin/login" className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 underline underline-offset-4">
              Access Admin CMS
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Portfolio CMS. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>API & CMS Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
