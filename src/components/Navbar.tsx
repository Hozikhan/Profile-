import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Mail, Sparkles } from 'lucide-react';

interface NavbarProps {
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
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b-2 border-white py-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 font-comic text-xs">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_#ffffff]'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
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

          {/* Contact CTA in Pop Yellow */}
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#facc15] text-black font-comic text-xs font-extrabold border-2 border-black shadow-[2px_2px_0px_#ffffff] hover:translate-y-[-2px] transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>SAY HELLO!</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-xl border-2 border-white bg-[#141414] text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d0d]/98 border-b-2 border-white px-4 py-4 space-y-2 font-comic text-sm">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-bold flex items-center justify-between ${
                  isActive
                    ? 'bg-[#facc15] text-black border-2 border-black'
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
    </header>
  );
};
