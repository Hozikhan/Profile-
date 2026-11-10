/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PORTFOLIO_DATA } from './config/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { ContactSection } from './components/ContactSection';
import { ShowcaseLabPage } from './components/ShowcaseLabPage';
import { EngineeringStationPage } from './components/EngineeringStationPage';
import { FloatingCartoonStickers } from './components/FloatingCartoonStickers';
import { Footer } from './components/Footer';
import { TelemetryBottomDock } from './components/TelemetryBottomDock';
import { PhotoInspectionModal } from './components/PhotoInspectionModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'lab' | 'station'>('home');
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Audio Context Ref for procedural cartoon/cybernetic sound FX (zero 404 external audio)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBlip = useCallback(() => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Subtle cartoon pop / blip sound effect
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1160, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [audioEnabled]);

  // Handle page switching with smooth scroll to top
  const handleSelectPage = (page: 'home' | 'lab' | 'station') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll listener & active section spy
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      if (currentPage === 'home') {
        const sections = ['hero', 'about', 'skills', 'projects', 'education', 'gallery', 'contact'];
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavigate = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col relative selection:bg-white/20 selection:text-white">
      {/* ========================================================================= */}
      {/* GLOBAL LOW-DENSITY WATERMARK BACKGROUND OF HUZAIFA'S PORTRAIT IMAGE       */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={PORTFOLIO_DATA.profile.heroBgImage}
          alt="Huzaifa Hussain Subtle Watermark Background"
          className="w-full h-full object-cover object-center filter grayscale opacity-[0.10] scale-105"
        />
        {/* Soft, rich contrast gradient so background has gentle density without obstructing content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/92 via-[#080808]/85 to-[#080808]/95" />
        <div className="absolute inset-0 comic-dots-bg opacity-30" />
      </div>

      {/* Floating 2D Cartoon Stickers & Emojis Drifting Across Background */}
      <FloatingCartoonStickers playBlip={playBlip} />

      {/* Sticky Dual-Page Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        playBlip={playBlip}
      />

      {/* Main Content Router */}
      <main className="flex-1 relative z-10">
        {currentPage === 'home' ? (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              scrollY={scrollY}
              playBlip={playBlip}
              onOpenShowcaseLab={() => handleSelectPage('lab')}
              onOpenEngineeringStation={() => handleSelectPage('station')}
            />

            <AboutSection
              scrollY={scrollY}
              playBlip={playBlip}
              onOpenPhotoModal={() => {
                playBlip();
                setIsPhotoModalOpen(true);
              }}
            />

            <SkillsSection playBlip={playBlip} />

            <ProjectsSection
              playBlip={playBlip}
              onOpenShowcaseLab={() => handleSelectPage('lab')}
              onOpenEngineeringStation={() => handleSelectPage('station')}
            />

            <EducationSection playBlip={playBlip} />

            <PhotoGallerySection playBlip={playBlip} />

            <ContactSection playBlip={playBlip} />
          </>
        ) : currentPage === 'lab' ? (
          <ShowcaseLabPage
            onBackToHome={() => handleSelectPage('home')}
            onOpenEngineeringStation={() => handleSelectPage('station')}
            onNavigateToContact={() => handleNavigate('contact')}
            playBlip={playBlip}
          />
        ) : (
          <EngineeringStationPage
            onBackToHome={() => handleSelectPage('home')}
            onOpenLabPage={() => handleSelectPage('lab')}
            onNavigateToContact={() => handleNavigate('contact')}
            playBlip={playBlip}
          />
        )}
      </main>

      {/* Footer with 3-Page Switcher */}
      <Footer
        playBlip={playBlip}
        currentPage={currentPage}
        onTogglePage={handleSelectPage}
      />

      {/* Collapsible Unified Bottom Telemetry Dock */}
      <TelemetryBottomDock
        scrollY={scrollY}
        activeSection={
          currentPage === 'home'
            ? activeSection
            : currentPage === 'lab'
            ? 'creative-lab'
            : 'dev-arcade'
        }
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        playBlip={playBlip}
        onOpenPhotoModal={() => {
          playBlip();
          setIsPhotoModalOpen(true);
        }}
      />

      {/* 3D Holographic Photo Inspection Modal */}
      <PhotoInspectionModal
        isOpen={isPhotoModalOpen}
        onClose={() => {
          playBlip();
          setIsPhotoModalOpen(false);
        }}
        playBlip={playBlip}
      />
    </div>
  );
}
