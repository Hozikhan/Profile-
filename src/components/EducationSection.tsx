import React from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { CyberTiltCard } from './CyberTiltCard';
import { GraduationCap, Calendar, MapPin, CheckCircle2, Award, Star } from 'lucide-react';

interface EducationSectionProps {
  playBlip: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ playBlip }) => {
  const education = PORTFOLIO_DATA.education;

  return (
    <section
      id="education"
      className="relative min-h-screen py-24 bg-[#080808] border-t-2 border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Looping Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-2 border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-hand text-base text-[#facc15] mb-1 animate-text-bounce">
              <span>🎒 MY ACADEMIC PATH</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-comic font-extrabold tracking-tight text-white">
              EDUCATION &amp; <span className="text-[#38bdf8] underline decoration-[#facc15] decoration-wavy">JOURNEY</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-comic text-xs text-white">
            <span className="bg-[#4ade80] text-black px-3.5 py-1.5 rounded-xl border-2 border-black font-extrabold shadow-[2px_2px_0px_#ffffff]">
              DPS KALUAHI ➔ MMANTC DIPLOMA CE
            </span>
          </div>
        </div>

        {/* Timeline Sequence with Pop Colored Nodes */}
        <div className="relative border-l-4 border-white ml-4 md:ml-32 space-y-12">
          {education.map((item, index) => {
            const isFirst = index === 0;
            const nodeBg = isFirst ? 'bg-[#facc15]' : 'bg-[#38bdf8]';
            const badgeColor = isFirst ? 'text-[#facc15]' : 'text-[#38bdf8]';

            return (
              <div key={item.id} className="relative pl-6 sm:pl-10 group">
                {/* Timeline Cartoon Node with Pop Color */}
                <div
                  className={`absolute -left-[22px] top-1.5 w-10 h-10 rounded-full ${nodeBg} border-2 border-black flex items-center justify-center text-black font-comic font-extrabold text-sm shadow-[3px_3px_0px_#ffffff] group-hover:scale-110 transition-transform`}
                >
                  0{index + 1}
                </div>

                {/* Outer Card */}
                <CyberTiltCard
                  interactive={true}
                  onClick={playBlip}
                  comicBadge={item.badge}
                >
                  <div className="space-y-4">
                    {/* Period Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-zinc-800 pb-3">
                      <span className={`font-comic text-xs font-bold tracking-wider flex items-center gap-1.5 ${badgeColor}`}>
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {item.badge}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-comic text-zinc-300">
                        <Calendar className="w-4 h-4 text-[#facc15]" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Institution & Degree */}
                    <div>
                      <h3 className="font-comic font-bold text-2xl text-white group-hover:text-[#facc15] transition-colors">
                        {item.institution}
                      </h3>
                      <div className="text-base sm:text-lg text-white font-comic mt-1 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-[#38bdf8] shrink-0" />
                        <span className="font-bold text-[#38bdf8]">{item.degree}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs font-comic text-zinc-300">
                      <MapPin className="w-4 h-4 text-[#4ade80] shrink-0" />
                      <span>{item.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-200 font-sans font-normal leading-relaxed">
                      {item.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="pt-3 border-t-2 border-zinc-800 space-y-2">
                      <div className="font-comic text-xs text-[#facc15] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        <span>HIGHLIGHTS &amp; MILESTONES:</span>
                      </div>
                      <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-zinc-300">
                        {item.keyAchievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CyberTiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
