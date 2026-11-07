import React, { useState } from 'react';
import { PORTFOLIO_DATA, GalleryItem } from '../config/portfolioData';
import { CyberTiltCard } from './CyberTiltCard';
import { Eye, ZoomIn, Sparkles } from 'lucide-react';

interface PhotoGallerySectionProps {
  playBlip: () => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ playBlip }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const gallery = PORTFOLIO_DATA.gallery;

  const cardColors = ['#facc15', '#38bdf8', '#4ade80', '#fb923c'];

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 bg-[#080808] border-t-2 border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Looping Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-hand text-base text-[#facc15] mb-1 animate-text-bounce">
              <span>📸 SNAPSHOTS &amp; MEMORIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-comic font-extrabold tracking-tight text-white">
              PHOTO <span className="text-[#facc15] underline decoration-[#38bdf8] decoration-wavy">GALLERY</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-comic text-xs text-white">
            <span className="bg-[#facc15] text-black px-3.5 py-1.5 rounded-xl border-2 border-black font-extrabold shadow-[2px_2px_0px_#ffffff]">
              ★ 3D TILTING COMIC CARDS ★
            </span>
          </div>
        </div>

        {/* Gallery Grid of 3D Tilting Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, idx) => {
            const accent = cardColors[idx % cardColors.length];
            return (
              <CyberTiltCard
                key={item.id}
                interactive={true}
                onClick={() => {
                  playBlip();
                  setSelectedImage(item);
                }}
                comicBadge="SNAP"
                className="h-full"
              >
                <div className="space-y-3 flex flex-col justify-between h-full group">
                  {/* Image Container with Comic Frame */}
                  <div
                    className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black border-2 border-white group-hover:border-[#facc15] transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Category tag with pop color */}
                    <div
                      className="absolute top-2.5 left-2.5 font-comic text-[10px] font-extrabold text-black px-2.5 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000000]"
                      style={{ backgroundColor: accent }}
                    >
                      {item.category}
                    </div>

                    {/* Hover icon */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-comic text-xs font-bold gap-1.5 cursor-pointer">
                      <ZoomIn className="w-5 h-5 text-[#facc15]" />
                      <span className="text-[#facc15]">[ EXPAND ✦ ]</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <h3 className="font-comic font-bold text-base text-white group-hover:text-[#facc15] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-300 font-sans line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="pt-2 border-t-2 border-zinc-800 flex items-center justify-between font-comic text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1 text-zinc-300 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#facc15]" /> NOIR EDIT
                    </span>
                    <span
                      className="font-bold underline flex items-center gap-1"
                      style={{ color: accent }}
                    >
                      <Eye className="w-3 h-3" /> VIEW PHOTO
                    </span>
                  </div>
                </div>
              </CyberTiltCard>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-[#121212] border-[3px] border-white rounded-3xl p-6 comic-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 mb-4">
                <div>
                  <h3 className="font-comic font-bold text-xl text-white">
                    {selectedImage.title}
                  </h3>
                  <span className="font-comic text-xs text-[#facc15] font-bold">
                    {selectedImage.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="font-comic font-bold text-xs bg-white text-black px-3.5 py-1.5 rounded-xl border border-black cursor-pointer shadow-[2px_2px_0px_#ffffff]"
                >
                  ✕ CLOSE
                </button>
              </div>

              <div className="relative aspect-square sm:aspect-video w-full rounded-2xl overflow-hidden bg-black border-2 border-white mb-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              </div>

              <p className="text-sm text-zinc-200 font-sans leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
