import React, { useState } from 'react';
import { calculateScrollShrink } from '../utils/portfolioLogic';
import { MapPin, Award, Eye, Sparkles } from 'lucide-react';

interface ShrinkingPhotoCardProps {
  portraitImage: string;
  scrollY: number;
  fullName: string;
  callsign: string;
  institution: string;
  locationFormatted: string;
  onOpenPhotoModal?: () => void;
}

export const ShrinkingPhotoCard: React.FC<ShrinkingPhotoCardProps> = ({
  portraitImage,
  scrollY,
  fullName,
  institution,
  locationFormatted,
  onOpenPhotoModal,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  // Get scroll shrink calculations
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const { progress, rotateX, rotateY } = calculateScrollShrink(scrollY, heroHeight);

  return (
    <div
      className="relative w-full max-w-md mx-auto group select-none"
      style={{
        perspective: '1200px',
      }}
    >
      <div
        style={{
          transform: `rotateX(${(1 - progress) * rotateX * 0.4}deg) rotateY(${(1 - progress) * rotateY * 0.4}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative rounded-3xl bg-[#121212] border-[3px] border-[#38bdf8] p-5 comic-shadow-cyan transition-all duration-300 group-hover:shadow-[8px_8px_0px_#38bdf8]"
      >
        {/* Playful Cartoon Header Badge */}
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#4ade80] border border-black inline-block animate-ping" />
            <span className="font-comic font-bold text-sm text-white tracking-wide">
              {fullName}
            </span>
          </div>
          <span className="bg-[#facc15] text-black text-[10px] font-comic font-extrabold px-2.5 py-0.5 rounded-full border border-black shadow-[2px_2px_0px_#000000]">
            DIPLOMA CE
          </span>
        </div>

        {/* Main Photo Viewport with Comic Outline & deep contrast */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black border-2 border-white group-hover:border-[#facc15] transition-all">
          <img
            src={portraitImage}
            alt={`${fullName} - Diploma in Computer Engineering`}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-top filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Loading Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-zinc-400 font-comic text-xs">
              <span className="animate-pulse">LOADING PORTRAIT...</span>
            </div>
          )}

          {/* Yellow Cartoon Speech Bubble Tag with Looping Wobble */}
          <div className="absolute top-3 left-3 bg-[#fef08a] text-black font-hand text-sm font-bold px-3 py-1 rounded-xl border border-black shadow-[2px_2px_0px_#000000] rotate-[-2deg] animate-text-wiggle">
            👋 Salam &amp; Hello!
          </div>

          <div className="absolute bottom-3 right-3 bg-black text-[#facc15] font-comic text-[11px] font-bold px-3 py-1 rounded-xl border-2 border-[#facc15] shadow-[2px_2px_0px_#000000]">
            ★ 1ST YEAR DIPLOMA ★
          </div>

          {/* Hover Inspect Overlay */}
          <button
            type="button"
            onClick={onOpenPhotoModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 font-comic text-sm font-bold cursor-pointer z-20"
          >
            <div className="w-11 h-11 rounded-full bg-[#facc15] text-black flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000000] animate-bounce">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-[#facc15]">[ OPEN 3D VIEW ✦ ]</span>
          </button>
        </div>

        {/* Cartoon Student Dossier Footer */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center justify-between text-white font-comic text-sm">
            <span className="font-bold flex items-center gap-1.5 text-[#38bdf8]">
              <Sparkles className="w-4 h-4 text-[#facc15]" />
              Diploma in Computer Eng.
            </span>
            <span className="text-[11px] font-bold bg-[#4ade80] text-black px-2 py-0.5 rounded-lg border border-black shadow-[1px_1px_0px_#000000]">
              1ST YEAR
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-300 font-sans text-xs">
            <Award className="w-4 h-4 text-[#facc15] shrink-0" />
            <span className="truncate">{institution}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 font-sans text-xs">
            <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <span className="truncate">{locationFormatted}</span>
          </div>

          <div className="pt-3 border-t-2 border-zinc-800 flex items-center justify-between font-comic text-[11px] text-zinc-300">
            <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/20 text-[#facc15]">
              ⚡ C • Python • Web
            </span>
            <span className="text-[#38bdf8] font-bold">
              ✦ MMANTC CAMPUS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
