import React, { useState, useMemo } from 'react';
import {
  Palette,
  Layers,
  Shield,
  Check,
  Upload,
  Plus,
  Trash2,
  Sparkles,
  EyeOff
} from 'lucide-react';
import {
  BackgroundConfig,
  BackgroundEffects,
  BackgroundMode,
  PosterContent
} from '../types/poster';
import {
  BACKGROUND_PRESETS,
  BackgroundPreset,
  CURATED_CYBER_PALETTES,
  PATTERN_OPTIONS,
  STORAGE_KEY_CUSTOM_GRADIENTS,
  STORAGE_KEY_SAVED_COLORS,
  SavedGradientPreset,
  hexToHsl,
  hexToRgb,
  hslToHex,
  normalizeHex,
  rgbToHex
} from '../data/backgroundPresets';
import {
  applyBackgroundPresetNonDestructive,
  buildGradientString,
  resolveBackgroundConfig
} from '../utils/posterEngine';

interface BackgroundStudioProps {
  content: PosterContent;
  onUpdateContent: (updates: Partial<PosterContent>) => void;
  onOpenImageLibrary: () => void;
}

const MODE_OPTIONS: { id: BackgroundMode; label: string; desc: string }[] = [
  { id: 'none', label: 'No Background', desc: 'Clean unstyled neutral canvas base' },
  { id: 'transparent', label: 'Transparent', desc: 'True alpha channel with checkerboard preview' },
  { id: 'solid', label: 'Solid Colour', desc: 'HEX / RGB / HSL & curated palettes' },
  { id: 'gradient', label: 'Gradient', desc: 'Linear, Radial & Conic 2-3 stops' },
  { id: 'pattern', label: 'Pattern', desc: '12 geometric cyber patterns & effects' },
  { id: 'image', label: 'Image', desc: 'Full-bleed backdrop photo & optics' },
  { id: 'preset', label: '32 Presets', desc: 'Curated cyber & atmospheric presets' }
];

export function BackgroundStudio({
  content,
  onUpdateContent,
  onOpenImageLibrary
}: BackgroundStudioProps) {
  const bg = resolveBackgroundConfig(content);
  const [presetFilter, setPresetFilter] = useState<'all' | BackgroundPreset['category']>('all');
  const [newGradName, setNewGradName] = useState('');

  const [savedColors, setSavedColors] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVED_COLORS);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : ['#050814', '#0A1026', '#001F2B', '#18051C', '#021208', '#14060A'];
    } catch {
      return ['#050814', '#0A1026', '#001F2B'];
    }
  });

  const [customGradients, setCustomGradients] = useState<SavedGradientPreset[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_GRADIENTS);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const patchBg = (updates: Partial<BackgroundConfig>) => {
    onUpdateContent({
      backgroundConfig: {
        ...bg,
        ...updates,
        effects: {
          ...bg.effects,
          ...(updates.effects || {})
        }
      }
    });
  };

  const patchEffect = (key: keyof BackgroundEffects) => {
    patchBg({
      effects: {
        ...bg.effects,
        [key]: !bg.effects[key]
      }
    });
  };

  const rgb = useMemo(() => hexToRgb(bg.solidColor), [bg.solidColor]);
  const hsl = useMemo(() => hexToHsl(bg.solidColor), [bg.solidColor]);

  const commitSolidColor = (hex: string) => {
    const norm = normalizeHex(hex);
    patchBg({ mode: 'solid', solidColor: norm });
  };

  const saveCurrentSolidColor = () => {
    const norm = normalizeHex(bg.solidColor);
    const next = [norm, ...savedColors.filter((c) => c !== norm)].slice(0, 14);
    setSavedColors(next);
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_COLORS, JSON.stringify(next));
    } catch {
      // ignore quota error
    }
  };

  const saveCurrentGradient = () => {
    const entry: SavedGradientPreset = {
      id: `grad_${Date.now()}`,
      name: newGradName.trim() || `Custom ${bg.gradientType.toUpperCase()} (${bg.gradientStops.length})`,
      gradientType: bg.gradientType,
      gradientAngle: bg.gradientAngle,
      gradientStops: bg.gradientStops
    };
    const next = [entry, ...customGradients].slice(0, 12);
    setCustomGradients(next);
    setNewGradName('');
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_GRADIENTS, JSON.stringify(next));
    } catch {
      // ignore quota error
    }
  };

  const handleUploadBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        patchBg({ mode: 'image', imageUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredPresets = useMemo(() => {
    if (presetFilter === 'all') return BACKGROUND_PRESETS;
    return BACKGROUND_PRESETS.filter((p) => p.category === presetFilter);
  }, [presetFilter]);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Palette className="w-4 h-4" /> DEDICATED BACKGROUND STUDIO
          </div>
          <h3 className="text-base font-bold text-white mt-0.5">
            7-Mode Canvas Backdrop Engine (Independent from Hero Image)
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-mono transition-colors flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-emerald-400" /> Upload BG Image
            <input type="file" accept="image/*" className="hidden" onChange={handleUploadBackground} />
          </label>
          <button
            type="button"
            onClick={onOpenImageLibrary}
            className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/30 text-xs font-mono transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" /> Pick from 100+ Library
          </button>
        </div>
      </div>

      {/* Mode Switcher (7 Modes) */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
          Background Mode
        </span>
        <div className="flex flex-wrap gap-2">
          {MODE_OPTIONS.map((m) => {
            const active = bg.mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => patchBg({ mode: m.id })}
                title={m.desc}
                className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all whitespace-nowrap ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/20 text-white font-bold shadow'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MODE: NO BACKGROUND */}
      {bg.mode === 'none' && (
        <div className="p-4 rounded-xl border border-slate-700 bg-[#040711] flex items-center gap-3 text-xs">
          <EyeOff className="w-5 h-5 text-slate-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">No Background Active</span>
            <p className="text-slate-300 mt-0.5">
              Background fills, gradients, patterns, and background photos are disabled. Your Hero Image, Brand Logos, Decorative Elements, and Typography remain intact.
            </p>
          </div>
        </div>
      )}

      {/* MODE: TRANSPARENT */}
      {bg.mode === 'transparent' && (
        <div className="p-4 rounded-xl border border-cyan-500/40 bg-cyan-950/20 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-cyan-300 uppercase">
              True Alpha Transparency Enabled
            </span>
            <span className="px-2 py-0.5 rounded bg-black/50 border border-cyan-400/30 text-[10px] font-mono text-cyan-200">
              Checkerboard UI · Alpha Export
            </span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            The canvas shows a checkerboard indicator only in the editor viewport. Exporting as PNG or Transparent PNG outputs genuine transparent pixels; JPEG export automatically prompts for a fallback solid fill color.
          </p>
        </div>
      )}

      {/* MODE: SOLID COLOUR */}
      {bg.mode === 'solid' && (
        <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-[#040711]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase">
              Solid Color Studio (HEX / RGB / HSL)
            </span>
            <button
              type="button"
              onClick={saveCurrentSolidColor}
              className="px-2.5 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 text-[11px] font-mono flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Save Swatch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center text-xs font-mono">
            <div className="flex items-center gap-2">
              <input
                type="color"
                aria-label="Solid background color picker"
                value={normalizeHex(bg.solidColor)}
                onChange={(e) => commitSolidColor(e.target.value)}
                className="w-10 h-10 rounded border border-white/20 bg-transparent cursor-pointer shrink-0"
              />
              <div className="flex-1">
                <label htmlFor="bg-hex-input" className="text-[10px] text-slate-400 block">
                  HEX
                </label>
                <input
                  id="bg-hex-input"
                  type="text"
                  value={bg.solidColor}
                  onChange={(e) => patchBg({ mode: 'solid', solidColor: e.target.value })}
                  onBlur={(e) => commitSolidColor(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white"
                />
              </div>
            </div>

            {/* RGB Inputs */}
            <div className="grid grid-cols-3 gap-1.5">
              <div>
                <label htmlFor="bg-rgb-r" className="text-[10px] text-slate-400 block">R</label>
                <input
                  id="bg-rgb-r"
                  type="number"
                  min={0}
                  max={255}
                  value={rgb.r}
                  onChange={(e) => commitSolidColor(rgbToHex(Number(e.target.value), rgb.g, rgb.b))}
                  className="w-full px-1.5 py-1 rounded bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="bg-rgb-g" className="text-[10px] text-slate-400 block">G</label>
                <input
                  id="bg-rgb-g"
                  type="number"
                  min={0}
                  max={255}
                  value={rgb.g}
                  onChange={(e) => commitSolidColor(rgbToHex(rgb.r, Number(e.target.value), rgb.b))}
                  className="w-full px-1.5 py-1 rounded bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="bg-rgb-b" className="text-[10px] text-slate-400 block">B</label>
                <input
                  id="bg-rgb-b"
                  type="number"
                  min={0}
                  max={255}
                  value={rgb.b}
                  onChange={(e) => commitSolidColor(rgbToHex(rgb.r, rgb.g, Number(e.target.value)))}
                  className="w-full px-1.5 py-1 rounded bg-slate-950 border border-slate-700 text-white"
                />
              </div>
            </div>

            {/* HSL Inputs */}
            <div className="grid grid-cols-3 gap-1.5 md:col-span-2">
              <div>
                <label htmlFor="bg-hsl-h" className="text-[10px] text-slate-400 block">H°</label>
                <input
                  id="bg-hsl-h"
                  type="number"
                  min={0}
                  max={360}
                  value={hsl.h}
                  onChange={(e) => commitSolidColor(hslToHex(Number(e.target.value), hsl.s, hsl.l))}
                  className="w-full px-1.5 py-1 rounded bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="bg-hsl-s" className="text-[10px] text-slate-400 block">S%</label>
                <input
                  id="bg-hsl-s"
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.s}
                  onChange={(e) => commitSolidColor(hslToHex(hsl.h, Number(e.target.value), hsl.l))}
                  className="w-full px-1.5 py-1 rounded bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label htmlFor="bg-hsl-l" className="text-[10px] text-slate-400 block">L%</label>
                <input
                  id="bg-hsl-l"
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.l}
                  onChange={(e) => commitSolidColor(hslToHex(hsl.h, hsl.s, Number(e.target.value)))}
                  className="w-full px-1.5 py-1 rounded bg-slate-950 border border-slate-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Saved & Recent Swatches */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">
              Saved &amp; Recent Swatches
            </span>
            <div className="flex flex-wrap gap-2">
              {savedColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  title={c}
                  aria-label={`Apply color ${c}`}
                  onClick={() => commitSolidColor(c)}
                  className={`w-7 h-7 rounded-md border transition-transform hover:scale-105 ${
                    normalizeHex(bg.solidColor) === normalizeHex(c)
                      ? 'border-cyan-400 ring-2 ring-cyan-400/50'
                      : 'border-white/20'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* 12 Curated Cybersecurity Color Palettes */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">
              12 Curated Cybersecurity Palettes
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CURATED_CYBER_PALETTES.map((pal) => (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => commitSolidColor(pal.primary)}
                  className="p-2 rounded-lg border border-white/10 hover:border-cyan-400 bg-slate-950/70 text-left flex items-center gap-2.5"
                >
                  <div className="flex -space-x-1 shrink-0">
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: pal.primary }} />
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: pal.secondary }} />
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: pal.accent }} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate">{pal.name}</span>
                    <span className="text-[9.5px] font-mono text-slate-400 block truncate">{pal.primary}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE: GRADIENT */}
      {bg.mode === 'gradient' && (
        <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-[#040711]">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="font-bold text-white uppercase">Multi-Stop Gradient Builder</span>
            <div className="flex items-center gap-1.5">
              {(['linear', 'radial', 'conic'] as const).map((gt) => (
                <button
                  key={gt}
                  type="button"
                  onClick={() => patchBg({ mode: 'gradient', gradientType: gt })}
                  className={`px-2.5 py-1 rounded border capitalize ${
                    bg.gradientType === gt
                      ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  {gt}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Strip */}
          <div
            className="h-10 rounded-lg border border-white/15"
            style={{ background: buildGradientString(bg), opacity: (bg.gradientOpacity ?? 100) / 100 }}
          />

          {/* Color Stops (2 or 3) */}
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Gradient Color Stops ({bg.gradientStops.length})</span>
              {bg.gradientStops.length < 3 && (
                <button
                  type="button"
                  onClick={() =>
                    patchBg({
                      gradientStops: [...bg.gradientStops, { color: '#0B3A53', position: 50 }].sort(
                        (a, b) => a.position - b.position
                      )
                    })
                  }
                  className="px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add 3rd Stop
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {bg.gradientStops.map((stop, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Stop {idx + 1} ({stop.position}%)</span>
                    {bg.gradientStops.length > 2 && (
                      <button
                        type="button"
                        aria-label={`Remove gradient stop ${idx + 1}`}
                        onClick={() =>
                          patchBg({
                            gradientStops: bg.gradientStops.filter((_, sIdx) => sIdx !== idx)
                          })
                        }
                        className="text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      aria-label={`Gradient stop ${idx + 1} color`}
                      value={normalizeHex(stop.color)}
                      onChange={(e) => {
                        const updated = bg.gradientStops.map((s, sIdx) =>
                          sIdx === idx ? { ...s, color: e.target.value } : s
                        );
                        patchBg({ gradientStops: updated });
                      }}
                      className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="range"
                      aria-label={`Gradient stop ${idx + 1} position`}
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) => {
                        const updated = bg.gradientStops.map((s, sIdx) =>
                          sIdx === idx ? { ...s, position: Number(e.target.value) } : s
                        );
                        patchBg({ gradientStops: updated });
                      }}
                      className="flex-1 accent-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Angle, Position & Opacity */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Angle</span>
                <span>{bg.gradientAngle}°</span>
              </div>
              <input
                type="range"
                aria-label="Gradient angle"
                min={0}
                max={360}
                value={bg.gradientAngle}
                onChange={(e) => patchBg({ gradientAngle: Number(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Center X</span>
                <span>{bg.gradientPosition.x}%</span>
              </div>
              <input
                type="range"
                aria-label="Gradient center X"
                min={0}
                max={100}
                value={bg.gradientPosition.x}
                onChange={(e) =>
                  patchBg({ gradientPosition: { ...bg.gradientPosition, x: Number(e.target.value) } })
                }
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Center Y</span>
                <span>{bg.gradientPosition.y}%</span>
              </div>
              <input
                type="range"
                aria-label="Gradient center Y"
                min={0}
                max={100}
                value={bg.gradientPosition.y}
                onChange={(e) =>
                  patchBg({ gradientPosition: { ...bg.gradientPosition, y: Number(e.target.value) } })
                }
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Opacity</span>
                <span>{bg.gradientOpacity}%</span>
              </div>
              <input
                type="range"
                aria-label="Gradient opacity"
                min={10}
                max={100}
                value={bg.gradientOpacity}
                onChange={(e) => patchBg({ gradientOpacity: Number(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          {/* Save Custom Gradient */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs font-mono">
            <input
              type="text"
              value={newGradName}
              onChange={(e) => setNewGradName(e.target.value)}
              placeholder="Custom gradient name..."
              className="flex-1 min-w-[160px] px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white"
            />
            <button
              type="button"
              onClick={saveCurrentGradient}
              className="px-3 py-1.5 rounded bg-cyan-500 text-black font-bold"
            >
              Save Custom Gradient
            </button>
          </div>

          {customGradients.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {customGradients.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() =>
                    patchBg({
                      mode: 'gradient',
                      gradientType: g.gradientType,
                      gradientAngle: g.gradientAngle,
                      gradientStops: g.gradientStops
                    })
                  }
                  className="p-2 rounded border border-white/10 hover:border-cyan-400 bg-slate-950 text-left text-[11px] font-mono text-white truncate"
                >
                  {g.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODE: IMAGE */}
      {bg.mode === 'image' && (
        <div className="space-y-4 p-4 rounded-xl border border-cyan-500/30 bg-[#040711]">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono font-bold text-cyan-300 uppercase block">
                Background Image Layer (Independent of Hero Image)
              </span>
              <span className="text-slate-300 font-mono text-[11px] block mt-0.5 truncate max-w-md">
                {bg.imageUrl ? bg.imageUrl.slice(0, 68) : 'No background photo selected yet'}
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenImageLibrary}
              className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold"
            >
              Browse 100+ Library
            </button>
          </div>

          {/* Image Fit */}
          <div className="grid grid-cols-4 gap-2 text-xs font-mono">
            {(['cover', 'contain', 'stretch', 'custom'] as const).map((fit) => (
              <button
                key={fit}
                type="button"
                onClick={() => patchBg({ imageFit: fit })}
                className={`py-1.5 rounded border capitalize ${
                  bg.imageFit === fit
                    ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800'
                }`}
              >
                {fit}
              </button>
            ))}
          </div>

          {bg.imageFit === 'custom' && (
            <div className="grid grid-cols-3 gap-3 text-[11px] font-mono">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Zoom</span>
                  <span>{bg.imageZoom}%</span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={240}
                  value={bg.imageZoom}
                  onChange={(e) => patchBg({ imageZoom: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Offset X</span>
                  <span>{bg.imageOffsetX}%</span>
                </div>
                <input
                  type="range"
                  min={-40}
                  max={40}
                  value={bg.imageOffsetX}
                  onChange={(e) => patchBg({ imageOffsetX: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Offset Y</span>
                  <span>{bg.imageOffsetY}%</span>
                </div>
                <input
                  type="range"
                  min={-40}
                  max={40}
                  value={bg.imageOffsetY}
                  onChange={(e) => patchBg({ imageOffsetY: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          )}

          {/* Optical Sliders */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] font-mono">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Blur</span>
                <span>{bg.imageBlur}px</span>
              </div>
              <input
                type="range"
                aria-label="Background blur"
                min={0}
                max={24}
                value={bg.imageBlur}
                onChange={(e) => patchBg({ imageBlur: Number(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Brightness</span>
                <span>{bg.imageBrightness}%</span>
              </div>
              <input
                type="range"
                aria-label="Background brightness"
                min={40}
                max={160}
                value={bg.imageBrightness}
                onChange={(e) => patchBg({ imageBrightness: Number(e.target.value) })}
                className="w-full accent-amber-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Contrast</span>
                <span>{bg.imageContrast}%</span>
              </div>
              <input
                type="range"
                aria-label="Background contrast"
                min={40}
                max={160}
                value={bg.imageContrast}
                onChange={(e) => patchBg({ imageContrast: Number(e.target.value) })}
                className="w-full accent-emerald-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Saturation</span>
                <span>{bg.imageSaturation}%</span>
              </div>
              <input
                type="range"
                aria-label="Background saturation"
                min={0}
                max={200}
                value={bg.imageSaturation}
                onChange={(e) => patchBg({ imageSaturation: Number(e.target.value) })}
                className="w-full accent-sky-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Hue Shift</span>
                <span>{bg.imageHue}°</span>
              </div>
              <input
                type="range"
                aria-label="Background hue"
                min={-180}
                max={180}
                value={bg.imageHue}
                onChange={(e) => patchBg({ imageHue: Number(e.target.value) })}
                className="w-full accent-purple-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Opacity</span>
                <span>{bg.imageOpacity}%</span>
              </div>
              <input
                type="range"
                aria-label="Background image opacity"
                min={10}
                max={100}
                value={bg.imageOpacity}
                onChange={(e) => patchBg({ imageOpacity: Number(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODE: 32 PRESETS */}
      {bg.mode === 'preset' && (
        <div className="space-y-3 p-4 rounded-xl border border-white/10 bg-[#040711]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 uppercase">
              <Sparkles className="w-4 h-4" /> 32 Curated Background Presets
            </div>
            <div className="flex flex-wrap gap-1 text-[10px] font-mono">
              {(['all', 'Dark Cyber', 'Gradients', 'Tech Patterns', 'Minimal & Print', 'High Energy'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPresetFilter(cat)}
                    className={`px-2 py-1 rounded border ${
                      presetFilter === cat
                        ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                        : 'bg-slate-950 text-slate-300 border-slate-800'
                    }`}
                  >
                    {cat === 'all' ? 'All (32)' : cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-80 overflow-y-auto pr-1">
            {filteredPresets.map((preset) => {
              const active = bg.presetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onUpdateContent(applyBackgroundPresetNonDestructive(content, preset))}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    active
                      ? 'border-cyan-400 bg-cyan-500/15 ring-1 ring-cyan-400'
                      : 'border-white/10 hover:border-sky-400/50 bg-slate-950'
                  }`}
                >
                  <div
                    className="h-12 rounded border border-white/15 mb-1.5"
                    style={{ background: preset.previewCss }}
                  />
                  <span className="text-[11px] font-bold text-white block truncate">{preset.name}</span>
                  <span className="text-[9px] font-mono text-slate-400 block truncate">{preset.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* PATTERNS & ATMOSPHERIC EFFECTS (Available across solid, gradient, pattern, image, preset) */}
      {bg.mode !== 'transparent' && bg.mode !== 'none' && (
        <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-[#040711]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase">
              Cyber Patterns &amp; Ambient FX Layers
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span>Pattern Opacity: {bg.patternOpacity}%</span>
              <input
                type="range"
                aria-label="Pattern opacity"
                min={0}
                max={100}
                value={bg.patternOpacity}
                onChange={(e) => patchBg({ patternOpacity: Number(e.target.value) })}
                className="w-24 accent-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PATTERN_OPTIONS.map((p) => {
              const isSelected = bg.patternId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => patchBg({ patternId: p.id })}
                  className={`py-1.5 px-2.5 rounded-lg border text-xs font-mono text-left flex items-center justify-between gap-1 ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/20 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{p.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Toggleable Ambient Effects */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-[11px] font-mono">
            {(
              [
                ['grid', 'Tech Grid'],
                ['matrix', 'Matrix Stream'],
                ['circuit', 'Circuit Bus'],
                ['network', 'Mesh Nodes'],
                ['particles', 'Particles'],
                ['geometricLines', 'Iso Geometry'],
                ['glow', 'Corner Glow'],
                ['radialLight', 'Radial Light']
              ] as [keyof BackgroundEffects, string][]
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => patchEffect(k)}
                className={`py-1.5 px-2 rounded border text-left flex items-center justify-between ${
                  bg.effects[k]
                    ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-200 font-bold'
                    : 'border-white/10 bg-slate-950 text-slate-400'
                }`}
              >
                <span>{label}</span>
                <span>{bg.effects[k] ? 'ON' : 'OFF'}</span>
              </button>
            ))}
          </div>

          {/* Vignette, Noise & Contrast Scrim */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-[11px] font-mono">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Vignette</span>
                <span>{bg.vignette}%</span>
              </div>
              <input
                type="range"
                aria-label="Background vignette"
                min={0}
                max={100}
                value={bg.vignette}
                onChange={(e) => patchBg({ vignette: Number(e.target.value) })}
                className="w-full accent-sky-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Film Noise</span>
                <span>{bg.noiseIntensity}%</span>
              </div>
              <input
                type="range"
                aria-label="Background film noise"
                min={0}
                max={100}
                value={bg.noiseIntensity}
                onChange={(e) => patchBg({ noiseIntensity: Number(e.target.value) })}
                className="w-full accent-sky-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-400" /> Scrim Overlay
                </span>
                <span>{bg.overlayOpacity}%</span>
              </div>
              <input
                type="range"
                aria-label="Background contrast scrim overlay"
                min={0}
                max={100}
                value={bg.overlayOpacity}
                onChange={(e) => patchBg({ overlayOpacity: Number(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
