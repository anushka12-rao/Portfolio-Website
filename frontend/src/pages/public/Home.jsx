import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Sparkles, Award, ExternalLink, Terminal, ChevronRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProjectCard from '../../components/project/ProjectCard';
import TechCard from '../../components/technology/TechCard';
import AchievementCard from '../../components/achievement/AchievementCard';
import { mockProfile, mockProjects, mockTechnologies, mockAchievements } from '../../utils/mockData';

export default function Home({
  profile = mockProfile,
  projects = mockProjects,
  technologies = mockTechnologies,
  achievements = mockAchievements
}) {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const previewTech = technologies.slice(0, 8);
  const previewAchievements = achievements.slice(0, 2);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-28">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              <span>Available for engineering opportunities & consulting</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Building resilient software with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">clean code</span> & modern tools.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Hi, I'm <strong className="text-white font-semibold">{profile?.name || 'Alex Morgan'}</strong>. {profile?.headline || 'Full-Stack Software Engineer & Distributed Systems Architect'}.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/projects">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Explore Projects
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Get In Touch
                </Button>
              </Link>
              {profile?.resumeUrl && profile.resumeUrl !== '#' && (
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="lg">
                    Resume
                  </Button>
                </a>
              )}
            </div>

            {/* Quick stats strip */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-slate-800/80">
              {(profile?.stats || mockProfile.stats).map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Code2 className="w-4 h-4" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Projects</h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors group"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id || project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Tech Stack Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-1">
                <Terminal className="w-4 h-4" />
                <span>Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Core Technology Stack</h2>
            </div>
            <Link
              to="/technologies"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors group"
            >
              <span>Explore Full Stack</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewTech.map((tech) => (
              <TechCard key={tech._id || tech.name} tech={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Preview Section */}
      {previewAchievements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-1">
                <Award className="w-4 h-4" />
                <span>Recognition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Honors & Certifications</h2>
            </div>
            <Link
              to="/achievements"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors group"
            >
              <span>View All Achievements</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {previewAchievements.map((achievement) => (
              <AchievementCard key={achievement._id || achievement.title} achievement={achievement} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 border border-teal-500/30 p-8 sm:p-14 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Have a project or opportunity in mind?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              I'm always eager to collaborate on ambitious web applications, high-throughput backend services, or architectural consulting.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={Sparkles}>
                  Start a Conversation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
