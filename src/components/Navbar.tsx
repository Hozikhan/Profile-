import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Mail, Sparkles, Home, FlaskConical, Gamepad2 } from 'lucide-react';

export type PageId = 'home' | 'lab' | 'station';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  playBlip: () => void;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  activeSection,
  onNavigate,
  audioEnabled,
  onToggleAudio,
  playBlip,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    playBlip();
    if (currentPage !== 'home') {
      onSelectPage('home');
      setTimeout(() => {
        onNavigate(id);
      }, 80);
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  const handlePageSwitch = (page: PageId) => {
    playBlip();
    onSelectPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b-2 border-white py-2 shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#facc15] text-black border-2 border-black flex items-center justify-center font-comic font-extrabold text-xl shadow-[3px_3px_0px_#ffffff] group-hover:rotate-6 transition-transform">
            H
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-comic font-extrabold text-lg tracking-wide text-white group-hover:text-[#facc15] transition-colors">
                HUZAIFA
              </span>
              <span className="bg-[#38bdf8] text-black font-comic text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000000]">
                DIPLOMA CE
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-hand text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
              <span>Madhubani • MMANTC</span>
            </div>
          </div>
        </button>

        {/* Center: 3-Page Interconnected Comic Switcher */}
        <div className="hidden lg:flex items-center gap-1 p-1 bg-[#121216] border-2 border-white rounded-2xl comic-shadow-sm">
          {/* Page 1 */}
          <button
            type="button"
            onClick={() => handlePageSwitch('home')}
            className={`px-3 py-1.5 rounded-xl font-comic text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'home'
                ? 'bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_#000000]'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>PAGE 1: PORTFOLIO</span>
          </button>

          {/* Page 2 */}
          <button
            type="button"
            onClick={() => handlePageSwitch('lab')}
            className={`px-3 py-1.5 rounded-xl font-comic text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'lab'
                ? 'bg-[#38bdf8] text-black border-2 border-black shadow-[2px_2px_0px_#000000]'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>PAGE 2: LAB</span>
          </button>

          {/* Page 3 */}
          <button
            type="button"
            onClick={() => handlePageSwitch('station')}
            className={`relative px-3 py-1.5 rounded-xl font-comic text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'station'
                ? 'bg-[#4ade80] text-black border-2 border-black shadow-[2px_2px_0px_#000000]'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>PAGE 3: DEV ARCADE</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#facc15] text-black text-[9px] font-black border border-black animate-pulse">
              NEW
            </span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick cycle page button for tablet screens */}
          <div className="hidden sm:inline-flex lg:hidden items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const next: Record<PageId, PageId> = {
                  home: 'lab',
                  lab: 'station',
                  station: 'home',
                };
                handlePageSwitch(next[currentPage]);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-[#38bdf8] text-black font-comic text-xs font-extrabold border-2 border-black shadow-[2px_2px_0px_#ffffff] cursor-pointer"
            >
              {currentPage === 'home'
                ? 'GO TO PAGE 2 🧪'
                : currentPage === 'lab'
                ? 'GO TO PAGE 3 🕹️'
                : 'GO TO PAGE 1 🏠'}
            </button>
          </div>

          {/* Audio Sound FX Toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            title={audioEnabled ? 'Mute Sounds' : 'Turn on Sound FX'}
            aria-label={audioEnabled ? 'Mute Sounds' : 'Turn on Sound FX'}
            className="p-2 rounded-xl border-2 border-white bg-[#141414] text-white comic-shadow-sm hover:translate-y-[-2px] transition-transform cursor-pointer"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-[#facc15]" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
          </button>

          {/* Contact CTA */}
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#facc15] text-black font-comic text-xs font-extrabold border-2 border-black shadow-[2px_2px_0px_#ffffff] hover:translate-y-[-2px] transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>SAY HELLO!</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-xl border-2 border-white bg-[#141414] text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d0d]/98 border-b-2 border-white px-4 py-4 space-y-3 font-comic text-sm">
          {/* 3-Page Switcher in Mobile Drawer */}
          <div className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider px-1">
            Switch Page:
          </div>
          <div className="grid grid-cols-3 gap-1.5 pb-3 border-b-2 border-zinc-800">
            <button
              type="button"
              onClick={() => handlePageSwitch('home')}
              className={`p-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 border-2 text-xs ${
                currentPage === 'home'
                  ? 'bg-[#facc15] text-black border-black shadow-[2px_2px_0px_#ffffff]'
                  : 'bg-[#18181b] text-zinc-300 border-zinc-700'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>1: Home</span>
            </button>
            <button
              type="button"
              onClick={() => handlePageSwitch('lab')}
              className={`p-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 border-2 text-xs ${
                currentPage === 'lab'
                  ? 'bg-[#38bdf8] text-black border-black shadow-[2px_2px_0px_#ffffff]'
                  : 'bg-[#18181b] text-zinc-300 border-zinc-700'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>2: Lab</span>
            </button>
            <button
              type="button"
              onClick={() => handlePageSwitch('station')}
              className={`p-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 border-2 text-xs ${
                currentPage === 'station'
                  ? 'bg-[#4ade80] text-black border-black shadow-[2px_2px_0px_#ffffff]'
                  : 'bg-[#18181b] text-zinc-300 border-zinc-700'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>3: Arcade ★</span>
            </button>
          </div>

          {/* Section links if on Home page */}
          {currentPage === 'home' && (
            <div className="space-y-1">
              <div className="text-[11px] font-sans text-zinc-400 uppercase tracking-wider px-2">
                Home Section Jumps:
              </div>
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl font-bold flex items-center justify-between text-xs ${
                      isActive
                        ? 'bg-white text-black border-2 border-black'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="text-black font-bold">★ CURRENT</span>}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fast page navigation shortcuts */}
          {currentPage !== 'home' && (
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handlePageSwitch('home')}
                className="w-full py-2 rounded-xl bg-white text-black font-bold border-2 border-black text-center cursor-pointer text-xs"
              >
                ← Return to Page 1: Main Portfolio
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('contact')}
                className="w-full py-2 rounded-xl bg-[#facc15] text-black font-bold border-2 border-black text-center cursor-pointer text-xs"
              >
                Send Huzaifa a Message 💬
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

