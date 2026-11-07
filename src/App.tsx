/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TelemetryBottomDock } from './components/TelemetryBottomDock';
import { PhotoInspectionModal } from './components/PhotoInspectionModal';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Audio Context Ref for procedural cybernetic sound FX (zero 404 external audio)
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

      // Elegant subtle click / blip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1160, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [audioEnabled]);

  // Scroll listener & active section spy
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      // Section spy
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col relative selection:bg-white/20 selection:text-white">


      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        playBlip={playBlip}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onNavigate={handleNavigate}
          scrollY={scrollY}
          playBlip={playBlip}
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

        <ProjectsSection playBlip={playBlip} />

        <EducationSection playBlip={playBlip} />

        <PhotoGallerySection playBlip={playBlip} />

        <ContactSection playBlip={playBlip} />
      </main>

      {/* Footer */}
      <Footer playBlip={playBlip} />

      {/* Collapsible Unified Bottom Telemetry Dock */}
      <TelemetryBottomDock
        scrollY={scrollY}
        activeSection={activeSection}
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
