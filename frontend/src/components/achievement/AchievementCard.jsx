import React from 'react';
import { Award, Calendar, ExternalLink, Building2 } from 'lucide-react';

export default function AchievementCard({ achievement }) {
  const {
    title,
    organization,
    description,
    date,
    certificateUrl,
    image
  } = achievement;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/30 transition-all">
      {image && (
        <div className="w-full md:w-48 h-36 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col flex-grow">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
          </div>
          {date && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{date}</span>
            </div>
          )}
        </div>

        {organization && (
          <div className="flex items-center gap-1.5 text-sm text-teal-400 font-medium mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{organization}</span>
          </div>
        )}

        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        {certificateUrl && (
          <div className="pt-2">
            <a
              href={certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 underline underline-offset-4"
            >
              <span>View Credential / Certificate</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
