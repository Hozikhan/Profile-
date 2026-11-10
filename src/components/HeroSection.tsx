import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { CyberHeroCanvas } from './CyberHeroCanvas';
import { ArrowRight, Mail, Sparkles, MapPin, Download, Star, Code, Flame } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  scrollY: number;
  playBlip: () => void;
  onOpenShowcaseLab?: () => void;
  onOpenEngineeringStation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  scrollY,
  playBlip,
  onOpenShowcaseLab,
  onOpenEngineeringStation,
}) => {
  const profile = PORTFOLIO_DATA.profile;

  // Typing animation for roles
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = profile.typingRoles;
    const currentFullText = roles[currentRoleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 60);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, profile.typingRoles]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center pt-28 pb-16 overflow-hidden comic-dots-bg"
    >
      {/* Background Image with Controlled Low-Density / Low-Brightness 5-Second Breathing Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={profile.heroBgImage}
          alt="Huzaifa Hussain Background"
          className="w-full h-full object-cover object-center animate-bg-pulse-5s transition-all duration-700 opacity-15"
        />
        {/* Deep, Rich Contrast Low-Density Overlays (Not overpowering, crystal clear text) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/95 via-[#080808]/90 to-[#080808]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.7),transparent_85%)]" />
      </div>

      {/* Looping Infinite Marquee Ticker at the top of Hero */}
      <div className="relative z-20 w-full overflow-hidden bg-[#18181b] border-y-2 border-white py-2 mb-8 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-comic text-xs font-bold tracking-wider">
          <span className="text-[#facc15] flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" /> 1ST YEAR DIPLOMA IN COMPUTER ENGINEERING
          </span>
          <span className="text-white">✦</span>
          <span className="text-[#38bdf8]">MMANTC CAMPUS</span>
          <span className="text-white">✦</span>
          <span className="text-[#4ade80]">HUZAIFA HUSSAIN</span>
          <span className="text-white">✦</span>
          <span className="text-[#fb923c]">C • PYTHON • FULL-STACK WEB</span>
          <span className="text-white">✦</span>
          <span className="text-white">MADHUBANI, BIHAR, INDIA</span>
          <span className="text-white">✦</span>
          <span className="text-[#facc15]">OPEN TO COLLABORATION &amp; PROJECTS</span>
          <span className="text-white">✦</span>
          {/* Repeated for continuous seamless loop */}
          <span className="text-[#facc15] flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" /> 1ST YEAR DIPLOMA IN COMPUTER ENGINEERING
          </span>
          <span className="text-white">✦</span>
          <span className="text-[#38bdf8]">MMANTC CAMPUS</span>
          <span className="text-white">✦</span>
          <span className="text-[#4ade80]">HUZAIFA HUSSAIN</span>
          <span className="text-white">✦</span>
          <span className="text-[#fb923c]">C • PYTHON • FULL-STACK WEB</span>
          <span className="text-white">✦</span>
          <span className="text-white">MADHUBANI, BIHAR, INDIA</span>
          <span className="text-white">✦</span>
          <span className="text-[#facc15]">OPEN TO COLLABORATION &amp; PROJECTS</span>
          <span className="text-white">✦</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          {/* Left Column: Comic Typography with Looping Animations & Pop Colors */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Playful Yellow Speech Bubble with subtle looping wobble */}
            <div className="inline-block relative">
              <div className="bg-[#fef08a] text-black font-hand text-base sm:text-lg font-bold px-4 py-1.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#facc15] animate-text-wiggle flex items-center gap-2">
                <span className="text-xl">👋</span>
                <span>Hey there! Welcome to my creative portfolio!</span>
              </div>
            </div>

            {/* Name with Looping Shimmer Animation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-comic text-xs sm:text-sm text-zinc-300">
                <Star className="w-4 h-4 text-[#facc15] fill-[#facc15] animate-spin" style={{ animationDuration: '6s' }} />
                <span className="tracking-wider uppercase font-bold text-[#facc15] animate-pulse">
                  1ST YEAR DIPLOMA IN COMPUTER ENGINEERING
                </span>
              </div>

              {/* Looping Shimmering & Bouncing Heading */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-comic font-extrabold tracking-tight text-white leading-none">
                <span className="animate-text-shimmer inline-block">
                  {profile.fullName}
                </span>
              </h1>
            </div>

            {/* Dynamic Typing Roles in Cartoon Container with Cyan Border */}
            <div className="inline-flex items-center bg-[#101014] border-2 border-[#38bdf8] px-4 py-2 rounded-2xl comic-shadow-cyan min-h-[52px]">
              <span className="font-comic text-[#38bdf8] font-bold text-base sm:text-xl animate-text-bounce">
                ⚡ {displayText}
              </span>
              <span className="w-2.5 h-5 ml-1.5 bg-[#38bdf8] inline-block animate-pulse" />
            </div>

            {/* Short Bio Tagline */}
            <p className="text-base sm:text-lg text-zinc-200 max-w-2xl leading-relaxed font-sans font-normal">
              {profile.bioShort}
            </p>

            {/* Comic Pop Colorful Sticker Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1 font-comic text-xs font-bold">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141414] border-2 border-[#38bdf8] text-[#38bdf8] comic-shadow-sm hover:scale-105 transition-transform">
                <MapPin className="w-4 h-4" />
                <span>{profile.location.formatted}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141414] border-2 border-[#4ade80] text-[#4ade80] comic-shadow-sm hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
                <span>MMANTC Diploma in CE</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_#ffffff] hover:scale-105 transition-transform">
                <Code className="w-4 h-4" />
                <span>1st Year Diploma</span>
              </div>
            </div>

            {/* Cartoon CTA Buttons with Colorful Shadows */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  playBlip();
                  if (onOpenShowcaseLab) {
                    onOpenShowcaseLab();
                  } else {
                    onNavigate('projects');
                  }
                }}
                className="group relative inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#38bdf8] text-black font-comic font-extrabold text-xs sm:text-sm tracking-wide border-2 border-black comic-shadow-cyan comic-shadow-hover-cyan cursor-pointer"
              >
                <span>PAGE 2: LAB 🧪</span>
              </button>

              {onOpenEngineeringStation && (
                <button
                  type="button"
                  onClick={() => {
                    playBlip();
                    onOpenEngineeringStation();
                  }}
                  className="group relative inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-[#4ade80] text-black font-comic font-extrabold text-xs sm:text-sm tracking-wide border-2 border-black shadow-[3px_3px_0px_#ffffff] hover:translate-y-[-2px] transition-transform cursor-pointer"
                >
                  <span>PAGE 3: ARCADE 🕹️</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#facc15] text-black text-[9px] font-black border border-black animate-pulse">
                    NEW
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  playBlip();
                  onNavigate('projects');
                }}
                className="group relative inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#facc15] text-black font-comic font-bold text-sm tracking-wide border-2 border-black comic-shadow-yellow comic-shadow-hover-yellow cursor-pointer"
              >
                <span>EXPLORE PROJECTS 🚀</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playBlip();
                  onNavigate('contact');
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#18181b] border-2 border-white text-white font-comic font-bold text-sm tracking-wide comic-shadow-sm comic-shadow-hover cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#facc15]" />
                <span>GET IN TOUCH 💬</span>
              </button>
            </div>

            {/* Quick Cartoon Stat Boxes with Color Accents */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t-2 border-zinc-800">
              {PORTFOLIO_DATA.stats.map((s, idx) => {
                const colors = ['#facc15', '#38bdf8', '#4ade80', '#fb923c'];
                const color = colors[idx % colors.length];
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#141414] border-2 border-zinc-700 comic-shadow-sm text-center hover:border-white transition-colors"
                  >
                    <div
                      className="font-comic text-xl sm:text-2xl font-extrabold"
                      style={{ color }}
                    >
                      {s.value}
                    </div>
                    <div className="font-comic text-[11px] text-zinc-200 font-bold uppercase mt-0.5">
                      {s.label}
                    </div>
                    <div className="font-sans text-[10px] text-zinc-400">
                      {s.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Cartoon 3D Toy Box Frame with Increased Size and 360 Slide Rotation */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[440px] lg:min-h-[540px]">
            {/* Comic Frame Card containing the 3D Canvas with Increased Size */}
            <div className="w-full max-w-lg lg:max-w-xl aspect-square relative rounded-3xl border-[4px] border-white bg-[#121212] p-3 sm:p-4 flex flex-col justify-between comic-shadow-yellow overflow-hidden">
              {/* Comic Top Bar */}
              <div className="flex justify-between items-center font-comic text-xs font-bold text-white z-20 pointer-events-none pb-2 border-b-2 border-zinc-800">
                <span className="flex items-center gap-1.5 text-[#facc15]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#facc15] inline-block animate-ping" />
                  ✦ 3D PHOTO BOX
                </span>
                <span className="bg-[#facc15] text-black px-2.5 py-0.5 rounded-full border border-black text-[10px] font-extrabold shadow-[1px_1px_0px_#000000]">
                  TOUCH &amp; DRAG TO SPIN
                </span>
              </div>

              {/* Mounted Three.js 3D Canvas */}
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <CyberHeroCanvas
                  portraitUrl={profile.portraitImage}
                  circuitBgUrl={profile.heroBgImage}
                  scrollY={scrollY}
                  playBlip={playBlip}
                />
              </div>

              {/* Bottom Comic Footer */}
              <div className="flex justify-between items-center font-comic text-xs z-20 pointer-events-none pt-2 border-t-2 border-zinc-800">
                <span className="bg-black/90 px-3 py-1 rounded-xl border border-white text-white font-bold">
                  ★ HUZAIFA HUSSAIN ★
                </span>
                <span className="bg-[#38bdf8] text-black px-2.5 py-1 rounded-xl border border-black font-extrabold text-[11px]">
                  DIPLOMA CE
                </span>
              </div>
            </div>

            {/* Instruction badge below */}
            <div className="mt-4 text-center">
              <span className="inline-block bg-[#161616] text-[#facc15] font-hand text-sm px-4 py-1.5 rounded-full border-2 border-[#facc15] comic-shadow-sm animate-text-bounce">
                ✨ Slide &amp; drag anywhere across the box to rotate 360° or tap to spin!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Playful Scroll Indicator */}
      <div className="relative mt-4 flex flex-col items-center gap-1 font-comic text-xs text-white pointer-events-none">
        <span className="font-bold text-[#facc15] animate-bounce">SCROLL DOWN 👇</span>
        <div className="w-5 h-8 rounded-full border-2 border-white flex items-start justify-center p-1 bg-black">
          <div className="w-1.5 h-2 bg-[#facc15] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
