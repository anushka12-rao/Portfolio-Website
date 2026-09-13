import React from 'react';
import { 
  Code2, 
  FileCode, 
  Terminal, 
  Cpu, 
  Atom, 
  Layers, 
  Palette, 
  Sparkles, 
  Server, 
  Database, 
  Boxes, 
  Network, 
  Box, 
  Cloud, 
  GitBranch, 
  CheckCircle,
  Wrench
} from 'lucide-react';

const iconMap = {
  Code2,
  FileCode,
  Terminal,
  Cpu,
  Atom,
  Layers,
  Palette,
  Sparkles,
  Server,
  Database,
  Boxes,
  Network,
  Box,
  Cloud,
  GitBranch,
  CheckCircle,
  Wrench
};

export default function TechCard({ tech }) {
  const IconComponent = iconMap[tech.icon] || Wrench;

  return (
    <div className="group flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 hover:bg-slate-800/60 transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
        <IconComponent className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-200 group-hover:text-white text-sm">
          {tech.name}
        </h4>
        <p className="text-xs text-slate-500">{tech.category}</p>
      </div>
    </div>
  );
}
