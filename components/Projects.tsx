import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers, X, Clock, BookOpen } from 'lucide-react';
import { getProjects } from '../constants.tsx';
import { Project } from '../types.ts';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  liveDemoLabel: string;
  caseDetailsLabel: string;
  onSelectProject: (project: Project) => void;
}

const ProjectCard = memo<ProjectCardProps>(({ project, liveDemoLabel, caseDetailsLabel, onSelectProject }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group framer-card rounded-[28px] overflow-hidden flex flex-col justify-between p-4 bg-[#0e131f] border border-white/10 hover:border-pink-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/5"
    >
      {/* Image Preview Container */}
      <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-slate-900 mb-6">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

        {/* Top Category Tag + Read Time Indicator & Year Pill */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-black/60 text-pink-300 backdrop-blur-md border border-pink-500/30">
            {project.category || 'Featured'}
          </span>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-black/70 text-slate-200 backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-sm">
              <Clock className="w-3 h-3 text-pink-400 shrink-0" />
              <span>{project.readTime}</span>
            </span>
            {project.year && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-black/60 text-slate-300 backdrop-blur-md border border-white/10 hidden sm:inline-block">
                {project.year}
              </span>
            )}
          </div>
        </div>

        {/* Quick Link Button in Image corner */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
          title={liveDemoLabel}
        >
          <ArrowUpRight className="w-5 h-5" />
        </a>
      </div>

      {/* Card Content */}
      <div className="p-2 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-2xl font-display font-extrabold text-white group-hover:text-pink-400 transition-colors">
              {project.title}
            </h3>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[10px] font-mono font-semibold text-pink-300 mb-3">
            <Clock className="w-3 h-3 text-pink-400 shrink-0" />
            <span>{project.readTime}</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            {/* Primary Link: Live Demo */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold font-mono text-pink-400 hover:text-pink-300 uppercase tracking-widest group/link"
            >
              <span>{liveDemoLabel}</span>
              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>

            {/* Secondary Case Study Modal Toggle */}
            {project.caseStudyDetails && (
              <button
                onClick={() => onSelectProject(project)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3 h-3 text-pink-400" />
                <span>{caseDetailsLabel}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects: React.FC = () => {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language, t } = useLanguage();

  const projects = useMemo(() => getProjects(language), [language]);

  const categories = useMemo(() => [
    { key: 'all', label: t.projects.categories.all },
    { key: 'Web App', label: t.projects.categories.webApp },
    { key: 'UI/UX & Design', label: t.projects.categories.uiux },
    { key: 'AI & Systems', label: t.projects.categories.aiSystems }
  ], [t.projects.categories.all, t.projects.categories.webApp, t.projects.categories.uiux, t.projects.categories.aiSystems]);

  const filteredProjects = useMemo(() => {
    return activeCategoryKey === 'all' 
      ? projects 
      : projects.filter(p => p.category === activeCategoryKey);
  }, [activeCategoryKey, projects]);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#07090e]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Title + Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full framer-glass-pill border border-pink-500/20 text-pink-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.projects.sectionTag} ({projects.length})</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              {t.projects.title}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 framer-glass-pill p-1.5 rounded-full border border-white/10 overflow-x-auto max-w-full no-scrollbar shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategoryKey(cat.key)}
                className={`relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                  activeCategoryKey === cat.key
                    ? 'text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeCategoryKey === cat.key && (
                  <motion.div
                    layoutId="activeSoftwareTab"
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-full shadow-lg shadow-pink-500/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                liveDemoLabel={t.projects.liveDemo}
                caseDetailsLabel={t.projects.caseDetails}
                onSelectProject={handleSelectProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Case Study Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl framer-card rounded-[32px] p-6 sm:p-8 bg-[#0e131f] border border-pink-500/30 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-widest">
                      {selectedProject.category} • {selectedProject.year}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-pink-300 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                      <Clock className="w-3 h-3 text-pink-400" />
                      <span>{selectedProject.readTime}</span>
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Banner */}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Case Study Details Grid */}
              {selectedProject.caseStudyDetails && (
                <div className="space-y-4 text-sm">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <h4 className="font-mono text-xs text-rose-400 uppercase font-bold mb-1">{t.projects.modal.challenge}</h4>
                    <p className="text-slate-300 leading-relaxed">{selectedProject.caseStudyDetails.challenge}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <h4 className="font-mono text-xs text-pink-400 uppercase font-bold mb-1">{t.projects.modal.solution}</h4>
                    <p className="text-slate-300 leading-relaxed">{selectedProject.caseStudyDetails.solution}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20">
                    <h4 className="font-mono text-xs text-pink-300 uppercase font-bold mb-1">{t.projects.modal.impact}</h4>
                    <p className="text-pink-200 font-medium leading-relaxed">{selectedProject.caseStudyDetails.impact}</p>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                >
                  {t.projects.modal.close}
                </button>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-pink-500 text-white hover:bg-pink-400 transition-all flex items-center gap-2 shadow-lg shadow-pink-500/20"
                >
                  <span>{t.projects.modal.launchApp}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;

