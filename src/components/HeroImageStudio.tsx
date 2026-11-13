import React from 'react';
import {
  Image as ImageIcon,
  Upload,
  Eye,
  EyeOff,
  RotateCcw,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { PosterContent, HeroImageConfig } from '../types/poster';
import { resolveHeroImageConfig, setImageRole } from '../utils/posterEngine';
import { validateImageUrl } from '../utils/imageValidation';

interface HeroImageStudioProps {
  content: PosterContent;
  onChange: (updated: PosterContent) => void;
  onOpenImageLibrary: () => void;
}

export function HeroImageStudio({
  content,
  onChange,
  onOpenImageLibrary
}: HeroImageStudioProps) {
  const hero = resolveHeroImageConfig(content);
  const validation = hero.src ? validateImageUrl(hero.src) : null;

  const patchHero = (updates: Partial<HeroImageConfig>) => {
    onChange({
      ...content,
      heroImage: {
        ...hero,
        ...updates
      }
    });
  };

  const handleUploadHero = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(setImageRole(content, reader.result, 'hero', { title: file.name }));
      }
    };
    reader.readAsDataURL(file);
  };

  const resetHeroAdjustments = () => {
    patchHero({
      fit: 'cover',
      zoom: 100,
      focalX: 50,
      focalY: 50,
      rotation: 0,
      opacity: 100,
      brightness: 100,
      contrast: 105,
      saturation: 105,
      hue: 0,
      blur: 0,
      filter: 'none',
      borderWidth: 1,
      borderRadius: 12,
      maskShape: 'rounded',
      shadow: 'glow'
    });
  };

  return (
    <div className="bg-[#090D15]/95 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-5 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 uppercase tracking-widest">
            <ImageIcon className="w-3.5 h-3.5" /> HERO IMAGE &amp; PHOTO EDITING
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
            Independent Foreground Hero Image Slot
          </h3>
        </div>

        <button
          type="button"
          onClick={() => patchHero({ enabled: !hero.enabled })}
          className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 ${
            hero.enabled
              ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300'
              : 'bg-slate-900 border-slate-700 text-slate-300'
          }`}
        >
          {hero.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>{hero.enabled ? 'Hero Visible' : 'Hero Hidden'}</span>
        </button>
      </div>

      <p className="text-xs text-slate-300 bg-[#040711] p-2.5 rounded-lg border border-slate-800">
        Hero Image is strictly decoupled from your canvas background. Replacing, hiding, or masking this image preserves your Background Studio fills and patterns.
      </p>

      {/* Source Actions */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer px-3 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs font-mono flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>Replace via Upload</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleUploadHero} />
          </label>
          <button
            type="button"
            onClick={onOpenImageLibrary}
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold"
          >
            Choose from 100+ Library
          </button>
          <button
            type="button"
            onClick={resetHeroAdjustments}
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>

        <div>
          <label htmlFor="hero-url-input" className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
            Direct Hero Image URL (Preserves Mask &amp; Optical Controls)
          </label>
          <input
            id="hero-url-input"
            type="url"
            value={hero.src || ''}
            onChange={(e) => onChange(setImageRole(content, e.target.value, 'hero'))}
            placeholder="https://... or /assets/..."
            className="w-full px-3 py-2 rounded-lg bg-[#040711] border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-sky-400"
          />
          {validation && !validation.valid && (
            <div className="mt-1.5 p-2 rounded bg-rose-500/15 border border-rose-500/40 text-rose-300 text-[11px] font-mono flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validation.reason}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mask Shapes & Fit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 uppercase block">Frame Mask Shape</span>
          <div className="grid grid-cols-3 gap-1.5">
            {(['none', 'rounded', 'circle', 'hex', 'arch'] as const).map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => patchHero({ maskShape: shape })}
                className={`py-1.5 rounded border capitalize text-[10.5px] ${
                  hero.maskShape === shape
                    ? 'bg-sky-500 text-black border-sky-400 font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800'
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 uppercase block">Fit &amp; Optical Preset</span>
          <div className="grid grid-cols-3 gap-1.5">
            {(['cover', 'contain', 'fill'] as const).map((fitMode) => (
              <button
                key={fitMode}
                type="button"
                onClick={() => patchHero({ fit: fitMode })}
                className={`py-1.5 rounded border capitalize text-[10.5px] ${
                  hero.fit === fitMode
                    ? 'bg-sky-500 text-black border-sky-400 font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800'
                }`}
              >
                {fitMode}
              </button>
            ))}
          </div>
          <select
            aria-label="Hero optical preset filter"
            value={hero.filter}
            onChange={(e) => patchHero({ filter: e.target.value as any })}
            className="w-full mt-1 bg-slate-950 border border-slate-700 rounded p-1.5 text-[11px] text-white"
          >
            <option value="none">Original Color</option>
            <option value="duotone">Cyber Duotone</option>
            <option value="high_contrast">High-Contrast Monochrome</option>
            <option value="matrix_green">Matrix Terminal</option>
            <option value="ice_cyan">Ice Cyan Shift</option>
            <option value="warm_amber">Warm Amber</option>
            <option value="invert">Invert Polarity</option>
          </select>
        </div>
      </div>

      {/* Crop & Optical Sliders */}
      <div className="p-3.5 rounded-xl border border-slate-800 bg-[#040711] space-y-3">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 uppercase font-bold">
          <Sliders className="w-3.5 h-3.5" /> Crop, Color &amp; Border Controls
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] font-mono">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Zoom</span>
              <span>{hero.zoom}%</span>
            </div>
            <input
              type="range"
              aria-label="Hero image zoom"
              min={80}
              max={240}
              value={hero.zoom}
              onChange={(e) => patchHero({ zoom: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Focal X</span>
              <span>{hero.focalX}%</span>
            </div>
            <input
              type="range"
              aria-label="Hero focal X"
              min={0}
              max={100}
              value={hero.focalX}
              onChange={(e) => patchHero({ focalX: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Focal Y</span>
              <span>{hero.focalY}%</span>
            </div>
            <input
              type="range"
              aria-label="Hero focal Y"
              min={0}
              max={100}
              value={hero.focalY}
              onChange={(e) => patchHero({ focalY: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Brightness</span>
              <span>{hero.brightness}%</span>
            </div>
            <input
              type="range"
              aria-label="Hero brightness"
              min={40}
              max={160}
              value={hero.brightness}
              onChange={(e) => patchHero({ brightness: Number(e.target.value) })}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Contrast</span>
              <span>{hero.contrast}%</span>
            </div>
            <input
              type="range"
              aria-label="Hero contrast"
              min={40}
              max={170}
              value={hero.contrast}
              onChange={(e) => patchHero({ contrast: Number(e.target.value) })}
              className="w-full accent-emerald-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Saturation</span>
              <span>{hero.saturation}%</span>
            </div>
            <input
              type="range"
              aria-label="Hero saturation"
              min={0}
              max={200}
              value={hero.saturation}
              onChange={(e) => patchHero({ saturation: Number(e.target.value) })}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Hue Shift</span>
              <span>{hero.hue}°</span>
            </div>
            <input
              type="range"
              aria-label="Hero hue rotation"
              min={-180}
              max={180}
              value={hero.hue}
              onChange={(e) => patchHero({ hue: Number(e.target.value) })}
              className="w-full accent-purple-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Soft Blur</span>
              <span>{hero.blur}px</span>
            </div>
            <input
              type="range"
              aria-label="Hero blur"
              min={0}
              max={16}
              value={hero.blur}
              onChange={(e) => patchHero({ blur: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Opacity</span>
              <span>{hero.opacity}%</span>
            </div>
            <input
              type="range"
              aria-label="Hero opacity"
              min={15}
              max={100}
              value={hero.opacity}
              onChange={(e) => patchHero({ opacity: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>
        </div>

        {/* Border, Radius, Rotation, Shadow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800 text-[11px] font-mono">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Border</span>
              <span>{hero.borderWidth}px</span>
            </div>
            <input
              type="range"
              aria-label="Hero border width"
              min={0}
              max={8}
              value={hero.borderWidth}
              onChange={(e) => patchHero({ borderWidth: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>
          <div>
            <span className="text-slate-300 block mb-1">Border Color</span>
            <input
              type="color"
              aria-label="Hero border color"
              value={hero.borderColor.startsWith('#') ? hero.borderColor : '#38BDF8'}
              onChange={(e) => patchHero({ borderColor: e.target.value })}
              className="w-full h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Rotation</span>
              <span>{hero.rotation}°</span>
            </div>
            <input
              type="range"
              aria-label="Hero rotation"
              min={-25}
              max={25}
              value={hero.rotation}
              onChange={(e) => patchHero({ rotation: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>
          <div>
            <span className="text-slate-300 block mb-1">Drop Shadow</span>
            <select
              aria-label="Hero shadow style"
              value={hero.shadow}
              onChange={(e) => patchHero({ shadow: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white"
            >
              <option value="none">None</option>
              <option value="soft">Soft Drop</option>
              <option value="glow">Cyan Glow</option>
              <option value="hard">Hard Poster</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
