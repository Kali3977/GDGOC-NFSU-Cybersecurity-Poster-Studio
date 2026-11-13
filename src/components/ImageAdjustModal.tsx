import React from 'react';
import { 
  X, 
  ZoomIn, 
  RotateCw, 
  Move, 
  Sliders, 
  Sparkles, 
  Undo, 
  Check, 
  Layers
} from 'lucide-react';
import { PosterContent } from '../types/poster';
import { SmartPosterImage } from './SmartPosterImage';

interface ImageAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: PosterContent;
  onUpdateContent: (updates: Partial<PosterContent>) => void;
  onOpenLibrary: () => void;
}

export function ImageAdjustModal({
  isOpen,
  onClose,
  content,
  onUpdateContent,
  onOpenLibrary
}: ImageAdjustModalProps) {
  if (!isOpen) return null;

  const currentZoom = content.imageZoom || 100;
  const currentFocalX = content.imageFocalX ?? 50;
  const currentFocalY = content.imageFocalY ?? 50;
  const currentRotation = content.imageRotation || 0;
  const currentOpacity = content.imageOpacity ?? 100;
  const currentFilter = content.imageFilter || 'none';

  const filters = [
    { id: 'none', label: 'Original', preview: 'Natural high-definition clarity' },
    { id: 'duotone', label: 'Cyberpunk Duotone', preview: 'Electric cyan & neon magenta contrast' },
    { id: 'high_contrast', label: 'High-Contrast B&W', preview: 'Crisp editorial monochrome noir' },
    { id: 'matrix_green', label: 'Matrix Terminal', preview: 'Terminal phosphor emerald luminescence' },
    { id: 'ice_cyan', label: 'Ice Cyan Glaze', preview: 'Deep subterranean nocturnal sapphire' },
    { id: 'warm_amber', label: 'Warm Amber Brass', preview: 'Institutional academic gilding' },
    { id: 'invert', label: 'Cyber Invert', preview: 'Negative x-ray semiconductor contrast' }
  ] as const;

  const handleReset = () => {
    onUpdateContent({
      imageZoom: 100,
      imageFocalX: 50,
      imageFocalY: 50,
      imageRotation: 0,
      imageOpacity: 100,
      imageFilter: 'none'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-xl border border-sky-500/30 bg-[#070B16] text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0A1022]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Advanced Poster Image Studio
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Crop, focal repositioning, optical zoom, and cybernetic filters
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLibrary}
              className="px-3 py-1.5 text-xs font-mono rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" /> Replace Image
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Live Preview Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative aspect-[16/10] rounded-lg border border-white/20 overflow-hidden bg-black/60 shadow-inner">
              <SmartPosterImage
                src={content.customImageUrl}
                alt={content.headline}
                zoom={currentZoom}
                focalX={currentFocalX}
                focalY={currentFocalY}
                rotation={currentRotation}
                opacity={currentOpacity}
                filter={currentFilter}
                className="w-full h-full"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-white/20 text-[10px] font-mono text-slate-300 pointer-events-none">
                Zoom: {currentZoom}% · Pan: ({currentFocalX}%, {currentFocalY}%)
              </div>
            </div>

            {/* Quick Presets & Status */}
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-sky-500/20 bg-sky-950/20 text-xs font-mono text-sky-200">
                <div className="flex items-center gap-2 font-bold text-sky-300 mb-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Professional Geometry
                </div>
                Adjust image focal coordinates to maintain typography legibility and prevent critical subject occlusion by headlines or QR badges.
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateContent({ imageZoom: 100, imageFocalX: 50, imageFocalY: 50 })}
                  className="flex-1 py-1.5 text-xs font-mono rounded bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 transition-colors"
                >
                  Center Fit
                </button>
                <button
                  onClick={() => onUpdateContent({ imageZoom: 140, imageFocalX: 50, imageFocalY: 30 })}
                  className="flex-1 py-1.5 text-xs font-mono rounded bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 transition-colors"
                >
                  Top Focus (140%)
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-xs font-mono rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors flex items-center gap-1"
                >
                  <Undo className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* Adjustment Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
            {/* Zoom Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" /> Optical Zoom
                </span>
                <span className="text-sky-400 font-bold">{currentZoom}%</span>
              </div>
              <input
                type="range"
                min="100"
                max="250"
                step="5"
                value={currentZoom}
                onChange={(e) => onUpdateContent({ imageZoom: Number(e.target.value) })}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            {/* Rotation Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-emerald-400" /> Rotation
                </span>
                <span className="text-emerald-400 font-bold">{currentRotation}°</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                step="1"
                value={currentRotation}
                onChange={(e) => onUpdateContent({ imageRotation: Number(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Horizontal Focal Point (X) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1">
                  <Move className="w-3.5 h-3.5 text-cyan-400" /> Pan Horizontal (X)
                </span>
                <span className="text-cyan-400 font-bold">{currentFocalX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="2"
                value={currentFocalX}
                onChange={(e) => onUpdateContent({ imageFocalX: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Vertical Focal Point (Y) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1">
                  <Move className="w-3.5 h-3.5 text-cyan-400" /> Pan Vertical (Y)
                </span>
                <span className="text-cyan-400 font-bold">{currentFocalY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="2"
                value={currentFocalY}
                onChange={(e) => onUpdateContent({ imageFocalY: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Color & Filter Palette */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
              Cybernetic Image Filters
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {filters.map((f) => {
                const isSelected = currentFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => onUpdateContent({ imageFilter: f.id })}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-sky-400 bg-sky-500/20 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{f.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {f.preview}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/10 px-6 py-3.5 bg-[#0A1022] flex justify-between items-center">
          <span className="text-xs font-mono text-slate-400">
            All adjustments update the live poster canvas instantly.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Done Adjusting
          </button>
        </div>
      </div>
    </div>
  );
}
