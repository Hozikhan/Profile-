import React, { useState } from 'react';

interface FloatingSticker {
  id: string;
  emoji: string;
  label: string;
  color: string;
  initialTop: string;
  initialLeft: string;
  animationClass: string;
  sizeClass: string;
  rotateDeg: number;
}

const STICKERS: FloatingSticker[] = [
  {
    id: 'rocket-1',
    emoji: '🚀',
    label: 'Rocket Launch!',
    color: '#fb923c',
    initialTop: '12%',
    initialLeft: '8%',
    animationClass: 'animate-drift-slow-1',
    sizeClass: 'text-3xl sm:text-4xl',
    rotateDeg: 15,
  },
  {
    id: 'star-1',
    emoji: '⭐',
    label: 'Diploma Star',
    color: '#facc15',
    initialTop: '25%',
    initialLeft: '88%',
    animationClass: 'animate-drift-slow-2',
    sizeClass: 'text-2xl sm:text-3xl',
    rotateDeg: -12,
  },
  {
    id: 'laptop-1',
    emoji: '💻',
    label: 'C & Python Code',
    color: '#38bdf8',
    initialTop: '48%',
    initialLeft: '5%',
    animationClass: 'animate-drift-slow-3',
    sizeClass: 'text-3xl sm:text-4xl',
    rotateDeg: -8,
  },
  {
    id: 'books-1',
    emoji: '📚',
    label: 'CE Textbooks',
    color: '#4ade80',
    initialTop: '65%',
    initialLeft: '86%',
    animationClass: 'animate-drift-slow-1',
    sizeClass: 'text-3xl sm:text-4xl',
    rotateDeg: 10,
  },
  {
    id: 'zap-1',
    emoji: '⚡',
    label: 'Fast Logic',
    color: '#facc15',
    initialTop: '80%',
    initialLeft: '12%',
    animationClass: 'animate-drift-slow-4',
    sizeClass: 'text-2xl sm:text-3xl',
    rotateDeg: 20,
  },
  {
    id: 'coffee-1',
    emoji: '☕',
    label: 'Chai & Code',
    color: '#fb923c',
    initialTop: '35%',
    initialLeft: '48%',
    animationClass: 'animate-drift-slow-2',
    sizeClass: 'text-2xl sm:text-3xl',
    rotateDeg: -5,
  },
  {
    id: 'palette-1',
    emoji: '🎨',
    label: 'Creative UI',
    color: '#38bdf8',
    initialTop: '75%',
    initialLeft: '62%',
    animationClass: 'animate-drift-slow-3',
    sizeClass: 'text-2xl sm:text-3xl',
    rotateDeg: 12,
  },
  {
    id: 'idea-1',
    emoji: '💡',
    label: 'Bright Ideas',
    color: '#fde047',
    initialTop: '90%',
    initialLeft: '78%',
    animationClass: 'animate-drift-slow-4',
    sizeClass: 'text-2xl sm:text-3xl',
    rotateDeg: -10,
  },
  {
    id: 'ufo-1',
    emoji: '🛸',
    label: 'Exploring AI',
    color: '#4ade80',
    initialTop: '5%',
    initialLeft: '70%',
    animationClass: 'animate-drift-slow-1',
    sizeClass: 'text-3xl sm:text-4xl',
    rotateDeg: 8,
  },
  {
    id: 'target-1',
    emoji: '🎯',
    label: 'Goal Driven',
    color: '#f87171',
    initialTop: '58%',
    initialLeft: '28%',
    animationClass: 'animate-drift-slow-2',
    sizeClass: 'text-2xl sm:text-3xl',
    rotateDeg: -15,
  },
];

interface FloatingCartoonStickersProps {
  playBlip?: () => void;
}

export const FloatingCartoonStickers: React.FC<FloatingCartoonStickersProps> = ({ playBlip }) => {
  const [clickedSticker, setClickedSticker] = useState<string | null>(null);

  const handleClick = (id: string) => {
    if (playBlip) playBlip();
    setClickedSticker(id);
    setTimeout(() => {
      setClickedSticker((prev) => (prev === id ? null : prev));
    }, 1200);
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
    >
      {STICKERS.map((s) => {
        const isClicked = clickedSticker === s.id;
        return (
          <div
            key={s.id}
            style={{
              top: s.initialTop,
              left: s.initialLeft,
            }}
            className={`absolute ${s.animationClass} transition-transform duration-300`}
          >
            <button
              type="button"
              onClick={() => handleClick(s.id)}
              className={`group pointer-events-auto cursor-pointer relative p-2.5 rounded-2xl bg-[#141416]/85 border-2 border-white backdrop-blur-[2px] transition-all duration-300 hover:scale-125 hover:bg-[#202024] active:scale-95 flex items-center justify-center ${
                isClicked ? 'scale-150 rotate-[360deg] shadow-[0_0_20px_#facc15]' : 'comic-shadow-sm'
              }`}
              style={{
                transform: `rotate(${s.rotateDeg}deg)`,
                borderColor: s.color,
              }}
              title={s.label}
              aria-label={s.label}
            >
              {/* Emoji graphic with cartoon drop shadow */}
              <span className={`${s.sizeClass} filter drop-shadow-[0_3px_2px_rgba(0,0,0,0.8)] inline-block`}>
                {s.emoji}
              </span>

              {/* Floating Comic Label on Hover or Click */}
              <span
                className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-lg bg-black text-white font-comic text-[10px] font-extrabold border border-white shadow-[2px_2px_0px_#000000] pointer-events-none transition-all duration-200 ${
                  isClicked
                    ? 'opacity-100 translate-y-0 scale-110'
                    : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                }`}
                style={{ color: s.color }}
              >
                {s.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
