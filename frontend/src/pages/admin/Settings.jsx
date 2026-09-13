import React from 'react';
import { Shield, Lock } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">System & Security Settings</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Overview of security configurations, session parameters, and runtime environment.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Authentication Protocol</h3>
              <p className="text-xs text-slate-400">HttpOnly SameSite secure cookie-backed sessions</p>
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
            <p>Session Storage: <span className="text-teal-400 font-mono">connect-mongo (MongoDB cluster)</span></p>
            <p>Cookie Flag: <span className="text-teal-400 font-mono">HttpOnly=true, SameSite=lax</span></p>
            <p>Protection: <span className="text-emerald-400">Immune to XSS token exfiltration</span></p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Security Middleware</h3>
              <p className="text-xs text-slate-400">HTTP headers and traffic guardrails</p>
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
            <p>Helmet: <span className="text-emerald-400">Active (CSP, nosniff, frameguard)</span></p>
            <p>Rate Limiting: <span className="text-emerald-400">Active (Auth login: 10/15min, Contact: 10/hr)</span></p>
            <p>Validation: <span className="text-emerald-400">Zod schemas on all write endpoints</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
