import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { ShrinkingPhotoCard } from './ShrinkingPhotoCard';
import { MapPin, GraduationCap, Edit3, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface AboutSectionProps {
  scrollY: number;
  playBlip: () => void;
  onOpenPhotoModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  scrollY,
  playBlip,
  onOpenPhotoModal,
}) => {
  const [profile, setProfile] = useState(PORTFOLIO_DATA.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(profile.bioLong.join('\n\n'));
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveBio = () => {
    playBlip();
    const updatedParagraphs = editedBio
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    setProfile((prev) => ({
      ...prev,
      bioLong: updatedParagraphs,
    }));
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 bg-[#080808] border-t-2 border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b-2 border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-hand text-base text-[#facc15] mb-1 animate-text-bounce">
              <span>✨ GET TO KNOW ME</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-comic font-extrabold tracking-tight text-white">
              ABOUT <span className="text-[#38bdf8] underline decoration-[#facc15] decoration-wavy">HUZAIFA</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playBlip();
                setIsEditing(!isEditing);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#facc15] text-black font-comic text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#ffffff] hover:translate-y-[-2px] transition-transform cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'CLOSE EDITOR' : 'EDIT MY STORY ✏️'}</span>
            </button>
          </div>
        </div>

        {/* Saved Toast Notification */}
        {saveToast && (
          <div className="mb-6 p-4 rounded-2xl bg-[#4ade80] text-black border-2 border-black font-comic text-xs font-bold flex items-center gap-2 shadow-[4px_4px_0px_#ffffff] animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-black" />
            <span>Awesome! Your updated story has been saved! 🎉</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Settled 3D Photo Card in About Section */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full">
              <div className="mb-3 font-comic text-xs text-zinc-300 flex items-center justify-between px-2">
                <span className="text-[#facc15] font-bold">★ 3D CHARACTER CARD ★</span>
                <span className="bg-[#38bdf8] text-black px-2 py-0.5 rounded-full font-bold text-[10px] border border-black shadow-[1px_1px_0px_#000000]">
                  ORIGIN: BIHAR
                </span>
              </div>

              {/* Shrinking photo card component */}
              <ShrinkingPhotoCard
                portraitImage={profile.portraitImage}
                scrollY={scrollY}
                fullName={profile.fullName}
                callsign={profile.callsign}
                institution={profile.currentInstitution}
                locationFormatted={profile.location.formatted}
                onOpenPhotoModal={onOpenPhotoModal}
              />

              <p className="mt-3 text-center font-hand text-sm text-[#facc15] animate-text-bounce">
                ✏️ Scroll smoothly to watch the 3D photo box settle right here!
              </p>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Credentials */}
          <div className="lg:col-span-7 space-y-6">
            {isEditing ? (
              <div className="p-6 rounded-3xl bg-[#121212] border-2 border-[#facc15] comic-shadow-yellow space-y-4">
                <div className="flex items-center justify-between font-comic text-xs text-white">
                  <span className="font-bold text-[#facc15]">📝 WRITE YOUR CUSTOM STORY</span>
                  <span className="text-zinc-400 font-sans">Double enter creates new paragraphs</span>
                </div>
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  rows={8}
                  className="w-full bg-black border-2 border-zinc-700 rounded-xl p-4 text-sm text-zinc-100 font-sans focus:outline-none focus:border-[#facc15] leading-relaxed"
                  placeholder="Share your background, passions, and goals..."
                />
                <div className="flex justify-end gap-3 font-comic">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl bg-transparent border-2 border-zinc-700 text-zinc-300 text-xs font-bold hover:bg-zinc-800 cursor-pointer"
                  >
                    DISCARD
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveBio}
                    className="px-5 py-2 rounded-xl bg-[#facc15] text-black font-bold text-xs border-2 border-black shadow-[2px_2px_0px_#ffffff] cursor-pointer"
                  >
                    SAVE CHANGES ✨
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-7 rounded-3xl bg-[#121212] border-[3px] border-white comic-shadow space-y-4 relative">
                {/* Comic Card Header with Colorful Tags */}
                <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-comic font-bold text-sm text-white">
                      HUZAIFA HUSSAIN
                    </span>
                    <span className="bg-[#4ade80] text-black font-comic text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000000]">
                      STORY &amp; JOURNEY
                    </span>
                  </div>
                  <span className="font-comic text-xs text-[#38bdf8] font-bold">
                    MMANTC DIPLOMA CE
                  </span>
                </div>

                <div className="space-y-4 text-zinc-200 text-base sm:text-lg leading-relaxed font-sans font-normal">
                  {profile.bioLong.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Fact Comic Grid with Color Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#121212] border-2 border-[#38bdf8] comic-shadow-cyan hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#38bdf8] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-comic text-[11px] text-[#38bdf8] font-bold uppercase">
                      CURRENT EDUCATION
                    </div>
                    <div className="font-comic font-bold text-base text-white">
                      Diploma in Computer Eng.
                    </div>
                    <div className="text-xs text-zinc-300 font-sans">
                      MMANTC Campus • 1st Year
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121212] border-2 border-[#facc15] comic-shadow-yellow hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-comic text-[11px] text-[#facc15] font-bold uppercase">
                      HOMETOWN &amp; BASE
                    </div>
                    <div className="font-comic font-bold text-base text-white">
                      Madhubani, Bihar, India
                    </div>
                    <div className="text-xs text-zinc-300 font-sans">
                      Heart of Mithila Region
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121212] border-2 border-[#4ade80] comic-shadow-green hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#4ade80] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-comic text-[11px] text-[#4ade80] font-bold uppercase">
                      FOUNDATION SCHOOL
                    </div>
                    <div className="font-comic font-bold text-base text-white">
                      DPS Kaluahi, Bihar
                    </div>
                    <div className="text-xs text-zinc-300 font-sans">
                      Science &amp; Computing Distinction
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121212] border-2 border-[#fb923c] comic-shadow-orange hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#fb923c] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-comic text-[11px] text-[#fb923c] font-bold uppercase">
                      CORE FOCUS
                    </div>
                    <div className="font-comic font-bold text-base text-white">
                      Coding &amp; Web Building
                    </div>
                    <div className="text-xs text-zinc-300 font-sans">
                      C, Python, React, AI Tools
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
