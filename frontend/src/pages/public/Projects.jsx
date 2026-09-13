import React, { useState, useEffect, useMemo } from 'react';
import { Search, FolderGit2, Filter } from 'lucide-react';
import ProjectCard from '../../components/project/ProjectCard';
import { projectService } from '../../services/projectService';
import { mockProjects } from '../../utils/mockData';

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');

  useEffect(() => {
    projectService.getPublicProjects()
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch((err) => console.warn('Using default projects:', err))
      .finally(() => setLoading(false));
  }, []);

  const allTechTags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      (p.technologies || []).forEach((t) => set.add(t));
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech =
        selectedTech === 'All' || (p.technologies || []).includes(selectedTech);
      return matchesSearch && matchesTech;
    });
  }, [projects, searchTerm, selectedTech]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Portfolio Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Featured Engineering Projects
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          A showcase of full-stack web applications, microservices, developer tools, and systems architectures I've designed and delivered.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="text-white font-semibold">{filteredProjects.length}</span> of {projects.length} projects
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mr-1" />
          {allTechTags.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTech === tech
                  ? 'bg-teal-500 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id || project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-3">
          <p className="text-lg font-medium text-slate-300">No projects match your criteria</p>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or selecting "All" to view the complete catalog.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedTech('All');
            }}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-teal-400 bg-teal-950/40 border border-teal-500/30 hover:bg-teal-950/70 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
