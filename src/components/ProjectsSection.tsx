import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../config/portfolioData';
import { CyberTiltCard } from './CyberTiltCard';
import { ExternalLink, Github, CheckCircle2, Eye, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  playBlip: () => void;
  onOpenShowcaseLab?: () => void;
  onOpenEngineeringStation?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  playBlip,
  onOpenShowcaseLab,
  onOpenEngineeringStation,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = PORTFOLIO_DATA.projects;

  const getProjectAccent = (id: string) => {
    switch (id) {
      case 'dedon-ai':
        return { color: '#facc15', border: 'border-[#facc15]', shadow: 'comic-shadow-yellow', badgeBg: 'bg-[#facc15]' };
      case 'ict-shopping':
        return { color: '#38bdf8', border: 'border-[#38bdf8]', shadow: 'comic-shadow-cyan', badgeBg: 'bg-[#38bdf8]' };
      case 'portfolio-3d':
        return { color: '#4ade80', border: 'border-[#4ade80]', shadow: 'comic-shadow-green', badgeBg: 'bg-[#4ade80]' };
      case 'c-python-toolkit':
        return { color: '#fb923c', border: 'border-[#fb923c]', shadow: 'comic-shadow-orange', badgeBg: 'bg-[#fb923c]' };
      default:
        return { color: '#facc15', border: 'border-[#facc15]', shadow: 'comic-shadow-yellow', badgeBg: 'bg-[#facc15]' };
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 bg-[#080808] border-t-2 border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Looping Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-hand text-base text-[#38bdf8] mb-1 animate-text-bounce">
              <span>🚀 THINGS I'VE BUILT</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-comic font-extrabold tracking-tight text-white">
              FEATURED <span className="text-[#facc15] underline decoration-[#4ade80] decoration-wavy">PROJECTS</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-comic text-xs text-white">
            <span className="bg-[#38bdf8] text-black px-3.5 py-1.5 rounded-xl border-2 border-black font-extrabold shadow-[2px_2px_0px_#ffffff]">
              ★ WEB DIRECTORY • ICT • CODING TOOLKITS ★
            </span>
          </div>
        </div>

        {/* Comic Hover Cards Grid with Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const accent = getProjectAccent(project.id);
            return (
              <CyberTiltCard
                key={project.id}
                interactive={true}
                onClick={() => {
                  playBlip();
                  setSelectedProject(project);
                }}
                comicBadge="FEATURED"
                className="h-full"
              >
                <div className="space-y-4 flex flex-col justify-between h-full">
                  {/* Image Preview with Comic Frame & Grayscale */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border-2 border-white group-hover:border-[#facc15] transition-all">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                    {/* Category Pill with Pop Color */}
                    <div
                      className="absolute top-3 left-3 font-comic text-xs text-black font-extrabold px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_#000000]"
                      style={{ backgroundColor: accent.color }}
                    >
                      {project.category}
                    </div>

                    {project.metrics && (
                      <div className="absolute top-3 right-3 font-comic text-[11px] text-white font-bold bg-black/90 border border-white px-2.5 py-1 rounded-full">
                        {project.metrics}
                      </div>
                    )}

                    {/* Hover Inspect CTA */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-comic text-sm text-white font-bold gap-2">
                      <Eye className="w-5 h-5 text-[#facc15]" />
                      <span className="text-[#facc15]">[ CLICK TO EXPLORE ✦ ]</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2 flex-1">
                    <h3 className="font-comic font-bold text-2xl text-white group-hover:text-[#facc15] transition-colors">
                      {project.title}
                    </h3>

                    <p className="font-hand text-base text-zinc-300">
                      &gt; {project.tagline}
                    </p>

                    <p className="text-sm text-zinc-200 font-sans font-normal leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Badges with subtle color borders */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-black border border-zinc-700 text-zinc-200 font-comic text-xs font-bold hover:border-white transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t-2 border-zinc-800 flex items-center justify-between font-comic text-xs">
                    <span className="text-zinc-300 flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-4 h-4 text-[#facc15] animate-spin" style={{ animationDuration: '4s' }} />
                      <span className="text-white">STATUS: READY</span>
                    </span>
                    <span
                      className="font-bold underline"
                      style={{ color: accent.color }}
                    >
                      VIEW DETAILS →
                    </span>
                  </div>
                </div>
              </CyberTiltCard>
            );
          })}
        </div>

        {/* Comic Callout Banner linking to Page 2 & Page 3 */}
        <div className="mt-12 p-6 rounded-3xl bg-[#121217] border-2 border-white comic-shadow-cyan flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-comic text-xs font-bold text-[#facc15]">
              <Sparkles className="w-4 h-4 text-[#facc15]" />
              <span>EXPLORE ALL INTERCONNECTED PAGES</span>
            </div>
            <div className="font-comic text-lg sm:text-xl font-extrabold text-white">
              C/Python Terminal, Seminar Slides &amp; Dev Arcade!
            </div>
            <p className="font-sans text-xs text-zinc-300">
              Test sorting algorithms live in Page 2, or simulate digital logic gates and bug hunting in Page 3.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                playBlip();
                if (onOpenShowcaseLab) onOpenShowcaseLab();
              }}
              className="px-4 py-2.5 rounded-2xl bg-[#38bdf8] text-black font-comic font-extrabold text-xs border-2 border-black comic-shadow-cyan hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              PAGE 2: LAB 🧪
            </button>
            {onOpenEngineeringStation && (
              <button
                type="button"
                onClick={() => {
                  playBlip();
                  onOpenEngineeringStation();
                }}
                className="px-4 py-2.5 rounded-2xl bg-[#4ade80] text-black font-comic font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#ffffff] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                PAGE 3: ARCADE 🕹️
              </button>
            )}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-[#121212] border-[3px] border-white rounded-3xl p-6 sm:p-8 comic-shadow max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b-2 border-zinc-800 pb-4 mb-5">
                <div>
                  <div className="font-comic text-xs text-[#facc15] uppercase font-bold">
                    {selectedProject.category}
                  </div>
                  <h3 className="font-comic font-extrabold text-2xl sm:text-3xl text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="font-comic font-bold text-xs bg-white text-black px-3.5 py-1.5 rounded-xl border border-black cursor-pointer shadow-[2px_2px_0px_#ffffff]"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border-2 border-white mb-5">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-center filter grayscale contrast-110"
                />
              </div>

              <div className="space-y-4">
                <p className="text-sm sm:text-base text-zinc-200 font-sans leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Highlights */}
                <div className="p-4 rounded-2xl bg-black border-2 border-zinc-800 space-y-2">
                  <div className="font-comic text-xs font-bold text-[#facc15] uppercase tracking-wider">
                    ★ Key Highlights &amp; Features:
                  </div>
                  <ul className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-xl bg-white text-black font-comic font-bold text-xs border border-black"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links with Colorful buttons */}
                <div className="flex items-center gap-4 pt-4 border-t-2 border-zinc-800">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#facc15] text-black font-comic font-bold text-xs border-2 border-black shadow-[2px_2px_0px_#ffffff]"
                    >
                      <Github className="w-4 h-4" />
                      <span>GITHUB REPO</span>
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e1e1e] border-2 border-[#38bdf8] text-[#38bdf8] font-comic font-bold text-xs"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LIVE PREVIEW</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
