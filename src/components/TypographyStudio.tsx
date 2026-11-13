import React, { useState, useMemo, useEffect } from 'react';
import {
  Type,
  Search,
  Check,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Sparkles,
  Languages,
  AlertCircle,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import {
  PosterContent,
  TextElementStyle,
  TypographyElementKey
} from '../types/poster';
import {
  GOOGLE_FONT_OPTIONS,
  FONT_PAIRING_PRESETS,
  FontCategory,
  CustomFontRecord,
  containsDevanagari,
  verifyAndLoadFont,
  loadStoredCustomFonts,
  saveStoredCustomFonts,
  registerCustomFontFace
} from '../data/fonts';
import { applyFontPairingNonDestructive, updateElementTypography } from '../utils/posterEngine';

interface TypographyStudioProps {
  content: PosterContent;
  onChange: (updated: PosterContent) => void;
}

const ELEMENT_TARGETS: { key: TypographyElementKey; label: string }[] = [
  { key: 'headline', label: 'Headline' },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'kicker', label: 'Kicker Tag' },
  { key: 'manifesto', label: 'Manifesto Quote' },
  { key: 'description', label: 'Description Body' },
  { key: 'cycleTagline', label: 'Cycle Tagline' },
  { key: 'speakerName', label: 'Speaker Name' },
  { key: 'speakerDesignation', label: 'Speaker Role' },
  { key: 'tracksTitle', label: 'Track Titles' },
  { key: 'dateTime', label: 'Date & Time' },
  { key: 'venue', label: 'Venue' },
  { key: 'cta', label: 'Call To Action' },
  { key: 'registration', label: 'Registration Header' },
  { key: 'campusInfo', label: 'Campus Subline' },
  { key: 'footer', label: 'Footer Sub-CTA' }
];

export function TypographyStudio({ content, onChange }: TypographyStudioProps) {
  const [targetElement, setTargetElement] = useState<TypographyElementKey>('headline');
  const [fontSearch, setFontSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FontCategory | 'all'>('all');
  const [hindiOnly, setHindiOnly] = useState(false);
  const [customFonts, setCustomFonts] = useState<CustomFontRecord[]>(() => loadStoredCustomFonts());
  const [fontStatus, setFontStatus] = useState<{ loaded: boolean; message: string } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Register any previously uploaded custom fonts on mount
  useEffect(() => {
    customFonts.forEach((rec) => {
      registerCustomFontFace(rec);
    });
  }, []);

  const currentStyle: TextElementStyle = content.typographyMap?.[targetElement] || {};
  const activeElementFont = currentStyle.fontFamily || content.fontFamily || 'Syne';
  const activeHindiFont = content.hindiFontFamily || 'Noto Sans Devanagari';

  const hasHindiCopy = containsDevanagari(
    `${content.headline} ${content.subtitle} ${content.description} ${content.kicker} ${content.venue}`
  );

  // Verify active font availability via document.fonts
  useEffect(() => {
    let active = true;
    verifyAndLoadFont(
      activeElementFont,
      hindiOnly || hasHindiCopy ? 'साइबर सुरक्षा 2026' : 'CYBERSECURITY 2026'
    ).then((res) => {
      if (!active) return;
      setFontStatus({
        loaded: res.loaded,
        message: res.loaded
          ? `Font "${res.family}" verified ready for preview and export.`
          : res.reason || `Loading "${res.family}"...`
      });
    });
    return () => {
      active = false;
    };
  }, [activeElementFont, hindiOnly, hasHindiCopy]);

  const allFontOptions = useMemo(() => {
    const customAsOptions = customFonts.map((c) => ({
      family: c.family,
      category: 'display' as FontCategory,
      categoryLabel: 'Uploaded Custom',
      weights: [400, 600, 700],
      supportsHindi: true,
      sample: 'CUSTOM FONT SPECIMEN · साइबर सुरक्षा',
      description: `Uploaded from ${c.fileName}`,
      isCustom: true
    }));
    return [...customAsOptions, ...GOOGLE_FONT_OPTIONS];
  }, [customFonts]);

  const filteredFonts = useMemo(() => {
    return allFontOptions.filter((f) => {
      if (hindiOnly && !f.supportsHindi) return false;
      if (categoryFilter !== 'all' && f.category !== categoryFilter) return false;
      if (fontSearch.trim()) {
        const q = fontSearch.toLowerCase();
        return (
          f.family.toLowerCase().includes(q) ||
          f.categoryLabel.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allFontOptions, hindiOnly, categoryFilter, fontSearch]);

  const patchTarget = (updates: Partial<TextElementStyle>) => {
    let next = updateElementTypography(content, targetElement, updates);
    if (targetElement === 'headline' && updates.fontFamily) {
      next = { ...next, fontFamily: updates.fontFamily };
    }
    onChange(next);
  };

  const handleUploadFont = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/\.(woff2?|ttf|otf)$/i.test(file.name)) {
      setUploadError('Unsupported file format. Upload .woff2, .woff, .ttf, or .otf font files.');
      return;
    }

    const cleanFamily = file.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9 _-]/g, ' ')
      .trim() || `CustomFont_${Date.now()}`;

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result !== 'string') return;
      const record: CustomFontRecord = {
        id: `font_${Date.now()}`,
        family: cleanFamily,
        fileName: file.name,
        format: file.name.split('.').pop()?.toLowerCase() || 'woff2',
        dataUrl: reader.result,
        uploadedAt: Date.now()
      };
      const ok = await registerCustomFontFace(record);
      if (!ok) {
        setUploadError(`Browser rejected font binary "${file.name}". Ensure it is a valid TTF/OTF/WOFF2 file.`);
        return;
      }
      const nextList = [record, ...customFonts];
      setCustomFonts(nextList);
      saveStoredCustomFonts(nextList);
      patchTarget({ fontFamily: cleanFamily });
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteCustomFont = (id: string) => {
    const nextList = customFonts.filter((f) => f.id !== id);
    setCustomFonts(nextList);
    saveStoredCustomFonts(nextList);
  };

  const insertHindiSample = () => {
    onChange({
      ...content,
      hindiFontFamily: activeHindiFont,
      headline: 'साइबर डिफेंस समिट 2026 // NFSU',
      subtitle: 'एथिकल हैकिंग, डिजिटल फॉरेंसिक और सुरक्षित नेटवर्क निर्माण पर राष्ट्रीय कार्यशाला।',
      typographyMap: {
        ...(content.typographyMap || {}),
        headline: {
          ...(content.typographyMap?.headline || {}),
          fontFamily: activeHindiFont
        },
        subtitle: {
          ...(content.typographyMap?.subtitle || {}),
          fontFamily: activeHindiFont
        }
      }
    });
  };

  return (
    <div className="bg-[#090D15]/95 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-5 text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 uppercase tracking-widest">
            <Type className="w-3.5 h-3.5" /> TYPOGRAPHY STUDIO · EN + हिंदी
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
            Multi-Script Font Pairings &amp; Element Styling
          </h3>
        </div>

        <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-mono flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-sky-400" />
          <span>Upload .WOFF2/.TTF</span>
          <input
            type="file"
            accept=".woff,.woff2,.ttf,.otf"
            className="hidden"
            onChange={handleUploadFont}
          />
        </label>
      </div>

      {uploadError && (
        <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Font Status Verifier */}
      {fontStatus && (
        <div
          className={`px-3 py-2 rounded-lg border text-[11px] font-mono flex items-center gap-2 ${
            fontStatus.loaded
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}
        >
          {fontStatus.loaded ? (
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{fontStatus.message}</span>
        </div>
      )}

      {/* 1. Target Element Selector */}
      <div className="space-y-1.5">
        <label htmlFor="typo-target-element" className="text-[10px] font-mono text-slate-400 uppercase block">
          Editing Independent Text Element
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ELEMENT_TARGETS.map((item) => {
            const active = targetElement === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTargetElement(item.key)}
                className={`px-2.5 py-1 rounded text-[10.5px] font-mono border transition-colors ${
                  active
                    ? 'bg-sky-500 text-black border-sky-400 font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Multilingual Hindi (Devanagari) Bar */}
      <div className="p-3 rounded-lg border border-sky-500/25 bg-[#040711] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-300 font-bold">
            <Languages className="w-4 h-4" />
            <span>Hindi / Devanagari Script Fallback</span>
          </div>
          <button
            type="button"
            onClick={insertHindiSample}
            className="px-2.5 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 text-[10px] font-mono font-bold"
          >
            Test Hindi Sample Copy
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
          <select
            aria-label="Hindi Devanagari Font Family"
            value={activeHindiFont}
            onChange={(e) => onChange({ ...content, hindiFontFamily: e.target.value })}
            className="bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white font-mono focus:outline-none focus:border-sky-400"
          >
            {GOOGLE_FONT_OPTIONS.filter((f) => f.supportsHindi).map((f) => (
              <option key={f.family} value={f.family}>
                {f.family} ({f.categoryLabel})
              </option>
            ))}
          </select>
          <p
            className="text-xs text-slate-200 bg-slate-950/70 px-2.5 py-1.5 rounded border border-slate-800 truncate"
            style={{ fontFamily: `"${activeHindiFont}", "Noto Sans Devanagari", sans-serif` }}
          >
            राष्ट्रीय न्यायालयिक विज्ञान विश्वविद्यालय
          </p>
        </div>
      </div>

      {/* 3. Font Pairing Presets */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>8 Curated Font Pairing Systems</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FONT_PAIRING_PRESETS.map((pairing) => (
            <button
              key={pairing.id}
              type="button"
              onClick={() => onChange(applyFontPairingNonDestructive(content, pairing))}
              className="p-2.5 rounded-lg border border-slate-800 hover:border-sky-500/50 bg-slate-950/70 text-left transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{pairing.name}</span>
                <span className="text-[9px] font-mono text-sky-400">{pairing.headingFont}</span>
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{pairing.tagline}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Searchable Categorized Font Selector */}
      <div className="space-y-2.5 p-3 rounded-xl border border-slate-800 bg-[#040711]">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={fontSearch}
              onChange={(e) => setFontSearch(e.target.value)}
              placeholder="Search 25 Google + custom fonts..."
              className="w-full pl-8 pr-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-sky-400"
            />
          </div>
          <select
            aria-label="Filter fonts by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200 font-mono"
          >
            <option value="all">All Categories</option>
            <option value="display">Display</option>
            <option value="cyber">Cyber / Tech</option>
            <option value="sans">Sans-Serif</option>
            <option value="mono">Monospace</option>
            <option value="editorial">Editorial</option>
            <option value="devanagari">Hindi / Devanagari</option>
          </select>
          <button
            type="button"
            onClick={() => setHindiOnly((v) => !v)}
            className={`px-2.5 py-1.5 rounded border text-xs font-mono shrink-0 ${
              hindiOnly
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                : 'bg-slate-950 border-slate-700 text-slate-300'
            }`}
          >
            हिंदी Supported
          </button>
        </div>

        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
          {filteredFonts.map((font) => {
            const isSelected = activeElementFont === font.family;
            const customRec = customFonts.find((c) => c.family === font.family);
            return (
              <div
                key={font.family}
                className={`flex items-center justify-between gap-2 p-2 rounded-lg border transition-colors ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-400 text-white'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => patchTarget({ fontFamily: font.family })}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-bold truncate"
                      style={{ fontFamily: `"${font.family}", sans-serif` }}
                    >
                      {font.family}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 shrink-0">
                      {font.categoryLabel}
                    </span>
                    {font.supportsHindi && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 shrink-0">
                        हिंदी
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[11px] text-slate-400 truncate mt-0.5"
                    style={{ fontFamily: `"${font.family}", "Noto Sans Devanagari", sans-serif` }}
                  >
                    {font.sample}
                  </p>
                </button>
                {customRec && (
                  <button
                    type="button"
                    aria-label={`Delete uploaded font ${font.family}`}
                    onClick={() => handleDeleteCustomFont(customRec.id)}
                    className="p-1 text-rose-400 hover:text-rose-300 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Fine-Grained Element Styling Controls */}
      <div className="p-3.5 rounded-xl border border-slate-800 bg-[#040711] space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-sky-400 uppercase">
            Styling: {ELEMENT_TARGETS.find((t) => t.key === targetElement)?.label}
          </span>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...content,
                typographyMap: {
                  ...(content.typographyMap || {}),
                  [targetElement]: undefined
                }
              })
            }
            className="text-[10px] font-mono text-slate-400 hover:text-white underline"
          >
            Reset Element Style
          </button>
        </div>

        {/* Format Toggles + Alignment + Transform */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded border border-slate-700 bg-slate-950 overflow-hidden">
            <button
              type="button"
              aria-label="Toggle bold"
              onClick={() => patchTarget({ bold: !currentStyle.bold })}
              className={`p-1.5 ${currentStyle.bold ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              aria-label="Toggle italic"
              onClick={() => patchTarget({ italic: !currentStyle.italic })}
              className={`p-1.5 ${currentStyle.italic ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              aria-label="Toggle underline"
              onClick={() => patchTarget({ underline: !currentStyle.underline })}
              className={`p-1.5 ${currentStyle.underline ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex rounded border border-slate-700 bg-slate-950 overflow-hidden">
            {(['left', 'center', 'right'] as const).map((al) => (
              <button
                key={al}
                type="button"
                aria-label={`Align ${al}`}
                onClick={() => patchTarget({ align: al })}
                className={`p-1.5 ${currentStyle.align === al ? 'bg-sky-600 text-white' : 'text-slate-300'}`}
              >
                {al === 'left' ? (
                  <AlignLeft className="w-3.5 h-3.5" />
                ) : al === 'center' ? (
                  <AlignCenter className="w-3.5 h-3.5" />
                ) : (
                  <AlignRight className="w-3.5 h-3.5" />
                )}
              </button>
            ))}
          </div>

          <select
            aria-label="Text transform"
            value={currentStyle.textTransform || 'none'}
            onChange={(e) => patchTarget({ textTransform: e.target.value as any })}
            className="px-2 py-1.5 rounded bg-slate-950 border border-slate-700 text-[11px] font-mono text-white"
          >
            <option value="none">Case: Default</option>
            <option value="uppercase">UPPERCASE</option>
            <option value="capitalize">Title Case</option>
            <option value="lowercase">lowercase</option>
          </select>

          <select
            aria-label="Font weight"
            value={currentStyle.fontWeight || 700}
            onChange={(e) => patchTarget({ fontWeight: Number(e.target.value) })}
            className="px-2 py-1.5 rounded bg-slate-950 border border-slate-700 text-[11px] font-mono text-white"
          >
            <option value={400}>400 Regular</option>
            <option value={500}>500 Medium</option>
            <option value={600}>600 SemiBold</option>
            <option value={700}>700 Bold</option>
            <option value={800}>800 ExtraBold</option>
            <option value={900}>900 Black</option>
          </select>
        </div>

        {/* Sliders: Scale, Line Height, Letter Spacing, Word Spacing */}
        <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Size Scale</span>
              <span className="text-sky-400">{Math.round((currentStyle.fontScale ?? 1) * 100)}%</span>
            </div>
            <input
              type="range"
              aria-label="Element size scale"
              min={0.65}
              max={1.75}
              step={0.05}
              value={currentStyle.fontScale ?? 1}
              onChange={(e) => patchTarget({ fontScale: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Line Height</span>
              <span className="text-sky-400">{(currentStyle.lineHeight ?? 1.15).toFixed(2)}</span>
            </div>
            <input
              type="range"
              aria-label="Element line height"
              min={0.85}
              max={2.1}
              step={0.05}
              value={currentStyle.lineHeight ?? 1.15}
              onChange={(e) => patchTarget({ lineHeight: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Letter Spacing</span>
              <span className="text-sky-400">{(currentStyle.letterSpacing ?? 0).toFixed(2)}em</span>
            </div>
            <input
              type="range"
              aria-label="Element letter spacing"
              min={-0.06}
              max={0.35}
              step={0.01}
              value={currentStyle.letterSpacing ?? 0}
              onChange={(e) => patchTarget({ letterSpacing: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Word Spacing</span>
              <span className="text-sky-400">{(currentStyle.wordSpacing ?? 0).toFixed(2)}em</span>
            </div>
            <input
              type="range"
              aria-label="Element word spacing"
              min={-0.1}
              max={0.6}
              step={0.02}
              value={currentStyle.wordSpacing ?? 0}
              onChange={(e) => patchTarget({ wordSpacing: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>
        </div>

        {/* Color, Opacity, Stroke, Shadow, Highlight, Rotation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] font-mono pt-1 border-t border-slate-800/80">
          <div>
            <span className="text-slate-400 block mb-1">Text Color</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                aria-label="Element text color"
                value={currentStyle.color || '#FFFFFF'}
                onChange={(e) => patchTarget({ color: e.target.value })}
                className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                aria-label="Element text hex"
                value={currentStyle.color || '#FFFFFF'}
                onChange={(e) => patchTarget({ color: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-white"
              />
            </div>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">Shadow Effect</span>
            <select
              aria-label="Element text shadow"
              value={currentStyle.shadow || 'none'}
              onChange={(e) => patchTarget({ shadow: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white"
            >
              <option value="none">None</option>
              <option value="soft">Soft Drop</option>
              <option value="neon">Cyber Glow</option>
              <option value="hard">Hard Offset</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Opacity</span>
              <span>{currentStyle.opacity ?? 100}%</span>
            </div>
            <input
              type="range"
              aria-label="Element text opacity"
              min={20}
              max={100}
              value={currentStyle.opacity ?? 100}
              onChange={(e) => patchTarget({ opacity: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Stroke</span>
              <span>{currentStyle.strokeWidth ?? 0}px</span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                aria-label="Element stroke width"
                min={0}
                max={3}
                step={0.5}
                value={currentStyle.strokeWidth ?? 0}
                onChange={(e) => patchTarget({ strokeWidth: Number(e.target.value) })}
                className="flex-1 accent-sky-400"
              />
              <input
                type="color"
                aria-label="Element stroke color"
                value={currentStyle.strokeColor || '#000000'}
                onChange={(e) => patchTarget({ strokeColor: e.target.value })}
                className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
            </div>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">Text Backdrop</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                aria-label="Element background highlight color"
                value={currentStyle.backgroundColor || '#050811'}
                onChange={(e) => patchTarget({ backgroundColor: e.target.value })}
                className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <button
                type="button"
                onClick={() => patchTarget({ backgroundColor: undefined })}
                className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-300 text-[10px]"
              >
                Clear
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Rotation</span>
              <span>{currentStyle.rotation ?? 0}°</span>
            </div>
            <input
              type="range"
              aria-label="Element rotation"
              min={-25}
              max={25}
              value={currentStyle.rotation ?? 0}
              onChange={(e) => patchTarget({ rotation: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
