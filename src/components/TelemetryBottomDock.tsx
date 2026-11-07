import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Volume2, VolumeX, Eye, Sparkles, MapPin, RefreshCw } from 'lucide-react';

interface TelemetryBottomDockProps {
  scrollY: number;
  activeSection: string;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  playBlip: () => void;
  onOpenPhotoModal: () => void;
}

export const TelemetryBottomDock: React.FC<TelemetryBottomDockProps> = ({
  activeSection,
  audioEnabled,
  onToggleAudio,
  playBlip,
  onOpenPhotoModal,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300 w-[94vw] max-w-2xl pointer-events-auto select-none"
      style={{
        transform: isCollapsed
          ? 'translateX(-50%) translateY(calc(100% - 24px))'
          : 'translateX(-50%) translateY(0)',
      }}
    >
      {/* Collapse / Expand Toggle Button */}
      <div className="flex justify-center -mb-px">
        <button
          type="button"
          onClick={() => {
            playBlip();
            setIsCollapsed(!isCollapsed);
          }}
          className="px-4 py-1 rounded-t-xl bg-[#141414] border-t-2 border-x-2 border-white text-white font-comic text-[11px] font-bold flex items-center gap-1.5 hover:bg-zinc-800 transition-colors cursor-pointer shadow-[0_-4px_12px_rgba(0,0,0,0.8)]"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-[#facc15]" />
              <span className="text-[#facc15]">SHOW DOCK ✦</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-white" />
              <span>MINIMIZE</span>
            </>
          )}
        </button>
      </div>

      {/* Main Unified Horizontal Comic Action Bar with Pop Colors */}
      <div className="rounded-2xl bg-[#121212]/95 border-2 border-white p-2.5 sm:px-4 sm:py-2.5 backdrop-blur-md shadow-[4px_4px_0px_#facc15] flex flex-wrap items-center justify-between gap-3 text-white font-comic text-xs">
        {/* Left Item */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#facc15] text-black font-extrabold flex items-center justify-center border border-black text-xs shadow-[1px_1px_0px_#000000]">
            H
          </span>
          <div className="flex items-center gap-1.5 font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="text-zinc-200">Madhubani • MMANTC</span>
          </div>
        </div>

        {/* Center Current Section */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 font-sans text-xs">Viewing:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#4ade80] text-black font-extrabold uppercase text-[11px] border border-black shadow-[1px_1px_0px_#000000]">
            {activeSection}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPhotoModal}
            className="px-3.5 py-1.5 rounded-xl bg-[#facc15] text-black font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-y-[-1px] flex items-center gap-1.5 cursor-pointer transition-transform"
            title="Inspect 3D Photo"
          >
            <Eye className="w-3.5 h-3.5 text-black" />
            <span>3D PHOTO ✦</span>
          </button>

          <button
            type="button"
            onClick={onToggleAudio}
            className="p-1.5 rounded-xl bg-black border border-white text-white hover:bg-zinc-800 cursor-pointer"
            title={audioEnabled ? 'Mute Sound FX' : 'Turn on Sound FX'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-[#facc15]" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
          </button>
        </div>
      </div>
    </div>
  );
};
