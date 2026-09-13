import React, { useMemo } from 'react';
import { Cpu, Terminal, Sparkles, Layers } from 'lucide-react';
import TechCard from '../../components/technology/TechCard';
import { mockTechnologies } from '../../utils/mockData';

export default function TechStack({ technologies = mockTechnologies }) {
  const visibleTech = useMemo(() => {
    return technologies
      .filter((t) => t.visible !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [technologies]);

  const categories = ['Languages', 'Frontend', 'Backend', 'Tools'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          <span>Skills & Tooling</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Modern Technology Stack
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          The foundational languages, frameworks, databases, and cloud infrastructure tools I leverage daily to engineer robust software solutions.
        </p>
      </div>

      {/* Categorized Grids */}
      <div className="space-y-12">
        {categories.map((cat) => {
          const catTech = visibleTech.filter(
            (t) => t.category?.toLowerCase() === cat.toLowerCase()
          );

          if (catTech.length === 0) return null;

          return (
            <div key={cat} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                <h2 className="text-xl font-bold text-white tracking-tight">{cat}</h2>
                <span className="text-xs text-slate-500 font-medium ml-auto">
                  {catTech.length} {catTech.length === 1 ? 'skill' : 'skills'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {catTech.map((tech) => (
                  <TechCard key={tech._id || tech.name} tech={tech} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
