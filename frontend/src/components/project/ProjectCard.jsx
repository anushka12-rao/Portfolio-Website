import React from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';
import Badge from '../common/Badge';

export default function ProjectCard({ project }) {
  const {
    title,
    description,
    technologies = [],
    image,
    githubUrl,
    liveUrl,
    featured,
    date
  } = project;

  return (
    <div className="group relative flex flex-col bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1">
      {/* Image thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-slate-950 shadow-md">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          </div>
        )}

        {/* Action icons overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub repo for ${title}`}
              className="p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Live demo for ${title}`}
              className="p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-teal-400 hover:bg-slate-800 transition-colors shadow"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-teal-300 transition-colors line-clamp-1">
            {title}
          </h3>
          {date && (
            <span className="text-xs text-slate-500 whitespace-nowrap">{date}</span>
          )}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        {/* Technologies tag row */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
          {technologies.map((tech, idx) => (
            <Badge key={idx} variant="default" size="xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
