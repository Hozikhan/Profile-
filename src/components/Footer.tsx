import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  playBlip: () => void;
}

export const Footer: React.FC<FooterProps> = ({ playBlip }) => {
  const scrollToTop = () => {
    playBlip();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080808] border-t-2 border-zinc-800 py-12 text-zinc-300 font-comic text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Credit */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-base">
              <span>★ HUZAIFA HUSSAIN ★</span>
              <span className="bg-white text-black px-2 py-0.5 rounded-full text-[10px] font-bold border border-black">
                DIPLOMA IN CE
              </span>
            </div>
            <p className="text-white font-extrabold text-sm">
              Designed &amp; Developed by Huzaifa
            </p>
            <p className="text-zinc-400 font-sans text-xs">
              1st Year Diploma in Computer Engineering • Madhubani, Bihar, India • MMANTC
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141414] border-2 border-white text-white comic-shadow-sm font-bold">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>3D INTERACTIVE TOY BOX</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black border-2 border-black font-bold shadow-[2px_2px_0px_#ffffff]">
              <span>CARTOON NOIR THEME</span>
            </div>
          </div>

          {/* Return to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of portfolio"
            className="px-4 py-2.5 rounded-xl bg-white text-black font-comic font-bold text-xs border-2 border-black shadow-[2px_2px_0px_#ffffff] hover:translate-y-[-2px] transition-transform flex items-center gap-2 cursor-pointer"
          >
            <span>BACK TO TOP 🚀</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Ticker */}
        <div className="pt-6 border-t-2 border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-sans">
          <div>
            © {new Date().getFullYear()} Huzaifa Hussain. All Rights Reserved. Built with React, Tailwind &amp; Three.js.
          </div>
          <div className="text-zinc-300 flex items-center gap-1 font-hand text-sm">
            <span>Drawn &amp; coded with enthusiasm from Madhubani, Bihar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
