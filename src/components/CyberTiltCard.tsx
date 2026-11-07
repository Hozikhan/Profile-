import React, { useState, useRef } from 'react';

interface CyberTiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'white' | 'silver' | 'cyan' | 'blue' | 'teal';
  interactive?: boolean;
  cornerBrackets?: boolean;
  scanline?: boolean;
  comicBadge?: string;
  onClick?: () => void;
}

export const CyberTiltCard: React.FC<CyberTiltCardProps> = ({
  children,
  className = '',
  interactive = true,
  comicBadge,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div
        style={{
          transform: interactive
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${isHovered ? '-4px' : '0px'})`
            : 'none',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
        }}
        className={`relative h-full w-full rounded-2xl border-[2.5px] border-white bg-[#101010] p-6 transition-all duration-200 ${
          isHovered
            ? 'shadow-[7px_7px_0px_#ffffff] bg-[#161616]'
            : 'shadow-[4px_4px_0px_#ffffff]'
        }`}
      >
        {comicBadge && (
          <div className="absolute -top-3.5 right-4 z-20 bg-white text-black text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-black shadow-[2px_2px_0px_#000000]">
            {comicBadge}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
