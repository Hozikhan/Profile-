import React, { useState } from 'react';
import { PORTFOLIO_DATA, SkillItem } from '../config/portfolioData';
import { CyberTiltCard } from './CyberTiltCard';
import { Code2, Cpu, Layout, FileCode, Palette, Atom, Box, GitBranch, TerminalSquare, CircuitBoard, Network, Star, CheckCircle } from 'lucide-react';

interface SkillsSectionProps {
  playBlip: () => void;
}

const CATEGORIES = ['All', 'Languages', 'Web Tech', 'AI & Tools', 'Core Engineering'] as const;

export const SkillsSection: React.FC<SkillsSectionProps> = ({ playBlip }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const skills = PORTFOLIO_DATA.skills;

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const getSkillTheme = (category: string, idx: number) => {
    switch (category) {
      case 'Languages':
        return { color: '#facc15', bg: 'bg-[#facc15]', text: 'text-[#facc15]', border: 'border-[#facc15]' };
      case 'Web Tech':
        return { color: '#38bdf8', bg: 'bg-[#38bdf8]', text: 'text-[#38bdf8]', border: 'border-[#38bdf8]' };
      case 'AI & Tools':
        return { color: '#4ade80', bg: 'bg-[#4ade80]', text: 'text-[#4ade80]', border: 'border-[#4ade80]' };
      case 'Core Engineering':
        return { color: '#fb923c', bg: 'bg-[#fb923c]', text: 'text-[#fb923c]', border: 'border-[#fb923c]' };
      default: {
        const colors = [
          { color: '#facc15', bg: 'bg-[#facc15]', text: 'text-[#facc15]', border: 'border-[#facc15]' },
          { color: '#38bdf8', bg: 'bg-[#38bdf8]', text: 'text-[#38bdf8]', border: 'border-[#38bdf8]' },
          { color: '#4ade80', bg: 'bg-[#4ade80]', text: 'text-[#4ade80]', border: 'border-[#4ade80]' },
          { color: '#fb923c', bg: 'bg-[#fb923c]', text: 'text-[#fb923c]', border: 'border-[#fb923c]' },
        ];
        return colors[idx % colors.length];
      }
    }
  };

  const getSkillIcon = (iconName: string, iconBg: string) => {
    const iconClass = 'w-5 h-5 text-black';
    switch (iconName) {
      case 'Code2':
        return <Code2 className={iconClass} />;
      case 'Terminal':
        return <TerminalSquare className={iconClass} />;
      case 'FileCode':
        return <FileCode className={iconClass} />;
      case 'Layout':
        return <Layout className={iconClass} />;
      case 'Palette':
        return <Palette className={iconClass} />;
      case 'Atom':
        return <Atom className={iconClass} />;
      case 'Box':
        return <Box className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'GitBranch':
        return <GitBranch className={iconClass} />;
      case 'TerminalSquare':
        return <TerminalSquare className={iconClass} />;
      case 'CircuitBoard':
        return <CircuitBoard className={iconClass} />;
      case 'Network':
        return <Network className={iconClass} />;
      default:
        return <Code2 className={iconClass} />;
    }
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 bg-[#080808] border-t-2 border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Looping Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-hand text-base text-[#4ade80] mb-1 animate-text-bounce">
              <span>⚡ TOOLS &amp; TALENTS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-comic font-extrabold tracking-tight text-white">
              MY <span className="text-[#facc15] underline decoration-[#38bdf8] decoration-wavy">SKILLS &amp; TOOLKIT</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-comic text-xs text-white">
            <span className="bg-[#facc15] text-black px-3.5 py-1.5 rounded-xl border-2 border-black font-extrabold shadow-[2px_2px_0px_#ffffff] animate-pulse">
              ★ 1ST YEAR DIPLOMA CE FOUNDATION ★
            </span>
          </div>
        </div>

        {/* Category Cartoon Tabs with Colors */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {CATEGORIES.map((cat, i) => {
            const isActive = activeCategory === cat;
            const tabColors = ['#facc15', '#38bdf8', '#4ade80', '#fb923c', '#facc15'];
            const activeColor = tabColors[i % tabColors.length];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playBlip();
                  setActiveCategory(cat);
                }}
                style={isActive ? { backgroundColor: activeColor, color: '#000000', borderColor: '#000000' } : {}}
                className={`px-4 py-2 rounded-2xl font-comic text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'border-2 shadow-[3px_3px_0px_#ffffff] scale-105'
                    : 'bg-[#141414] text-zinc-300 hover:text-white border-2 border-zinc-700 hover:border-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid with Pop Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => {
            const theme = getSkillTheme(skill.category, idx);
            return (
              <CyberTiltCard
                key={skill.name}
                interactive={true}
                onClick={() => {
                  playBlip();
                  setSelectedSkill(skill);
                }}
                comicBadge={`${skill.level}%`}
                className="h-full"
              >
                <div className="space-y-3 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]"
                      style={{ backgroundColor: theme.color }}
                    >
                      {getSkillIcon(skill.icon, theme.bg)}
                    </div>
                    <div>
                      <h3 className="font-comic font-bold text-lg text-white">
                        {skill.name}
                      </h3>
                      <span className="font-comic text-[11px] font-bold" style={{ color: theme.color }}>
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Comic Level Bar with Theme Color */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between font-comic text-xs text-zinc-300">
                      <span className="flex items-center gap-1 font-bold" style={{ color: theme.color }}>
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Proficiency
                      </span>
                      <span className="font-extrabold text-white">{skill.level}%</span>
                    </div>
                    <div className="w-full h-3.5 bg-black rounded-full border-2 border-zinc-700 p-0.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%`, backgroundColor: theme.color }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 font-sans line-clamp-2 leading-relaxed pt-1">
                    {skill.description}
                  </p>

                  <div className="pt-2 border-t-2 border-zinc-800 flex items-center justify-between font-comic text-[11px] text-zinc-400">
                    <span className="text-white font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full inline-block animate-ping" style={{ backgroundColor: theme.color }} />
                      ACTIVE &amp; READY
                    </span>
                    <span className="underline font-bold" style={{ color: theme.color }}>
                      [ DETAILS ✦ ]
                    </span>
                  </div>
                </div>
              </CyberTiltCard>
            );
          })}
        </div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className="relative w-full max-w-md bg-[#121212] border-[3px] border-white rounded-3xl p-6 comic-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#facc15] flex items-center justify-center border-2 border-black">
                    {getSkillIcon(selectedSkill.icon, 'bg-[#facc15]')}
                  </div>
                  <div>
                    <h3 className="font-comic font-bold text-xl text-white">
                      {selectedSkill.name}
                    </h3>
                    <span className="font-comic text-xs text-[#facc15] font-bold">
                      {selectedSkill.category}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="font-comic font-bold text-sm bg-white text-black px-3 py-1 rounded-xl border border-black cursor-pointer"
                >
                  ✕ CLOSE
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-zinc-200 font-sans leading-relaxed">
                  {selectedSkill.description}
                </p>

                <div className="p-3 bg-black rounded-2xl border-2 border-zinc-700">
                  <div className="flex justify-between font-comic text-xs text-white mb-1.5">
                    <span>Coursework &amp; Project Mastery</span>
                    <span className="font-bold text-[#facc15]">{selectedSkill.level}%</span>
                  </div>
                  <div className="w-full h-3 bg-zinc-900 rounded-full border border-white p-0.5">
                    <div
                      className="h-full bg-[#facc15] rounded-full"
                      style={{ width: `${selectedSkill.level}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-comic text-[#4ade80]">
                  <CheckCircle className="w-4 h-4 text-[#4ade80]" />
                  <span>Integrated in Huzaifa's 1st Year Diploma curriculum &amp; builds</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
