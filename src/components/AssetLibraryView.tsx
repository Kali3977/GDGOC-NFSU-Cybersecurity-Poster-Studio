import React, { useState } from 'react';
import {
  PosterContent,
  BrandKit,
  BrandPreset,
  SavedBrandLogo,
  PosterFont,
  AccentColor
} from '../types/poster';
import { CampusInfo } from '../data/campuses';
import { NFSUUniversityMark, GDGBrackets } from './OfficialLogos';
import { setImageRole } from '../utils/posterEngine';
import { GOOGLE_FONT_OPTIONS } from '../data/fonts';
import {
  Upload,
  Trash2,
  ExternalLink,
  Palette,
  Info,
  Plus,
  Check
} from 'lucide-react';

interface AssetLibraryViewProps {
  content: PosterContent;
  onChange: (updated: PosterContent) => void;
  campuses: CampusInfo[];
  brandKit: BrandKit;
  onUpdateBrandKit: (updatedKit: BrandKit) => void;
}

interface UserUploadedAsset {
  id: string;
  name: string;
  url: string;
  timestamp: number;
}

export function AssetLibraryView({
  content,
  onChange,
  campuses,
  brandKit,
  onUpdateBrandKit
}: AssetLibraryViewProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'branding' | 'external'>('library');

  // Local storage for uploaded assets
  const [uploadedAssets, setUploadedAssets] = useState<UserUploadedAsset[]>(() => {
    try {
      const raw = localStorage.getItem('gdgoc_nfsu_user_assets');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [newPresetName, setNewPresetName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const newAsset: UserUploadedAsset = {
          id: `asset_${Date.now()}`,
          name: file.name.slice(0, 30),
          url: reader.result,
          timestamp: Date.now()
        };
        const updated = [newAsset, ...uploadedAssets];
        setUploadedAssets(updated);
        try {
          localStorage.setItem('gdgoc_nfsu_user_assets', JSON.stringify(updated));
        } catch (err) {
          console.error(err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAsset = (id: string) => {
    const updated = uploadedAssets.filter((a) => a.id !== id);
    setUploadedAssets(updated);
    try {
      localStorage.setItem('gdgoc_nfsu_user_assets', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const applyAsHero = (url: string) => {
    onChange(setImageRole(content, url, 'hero'));
  };

  const applyAsBackground = (url: string) => {
    onChange(setImageRole(content, url, 'background'));
  };

  const applyAsLogo = (url: string) => {
    onChange({
      ...content,
      customLogoUrl: url,
      brandSlots: {
        gdgEnabled: content.brandSlots?.gdgEnabled ?? true,
        gdgVariant: content.brandSlots?.gdgVariant || 'color',
        nfsuEnabled: true,
        nfsuLogoUrl: url,
        campusBadgeEnabled: content.brandSlots?.campusBadgeEnabled ?? true,
        eventLogoUrl: content.brandSlots?.eventLogoUrl
      }
    });
  };

  const applyAsEventLogo = (url: string) => {
    onChange({
      ...content,
      brandSlots: {
        gdgEnabled: content.brandSlots?.gdgEnabled ?? true,
        gdgVariant: content.brandSlots?.gdgVariant || 'color',
        nfsuEnabled: content.brandSlots?.nfsuEnabled ?? true,
        nfsuLogoUrl: content.brandSlots?.nfsuLogoUrl,
        campusBadgeEnabled: content.brandSlots?.campusBadgeEnabled ?? true,
        eventLogoUrl: url
      }
    });
  };

  const applyAsSpeaker = (url: string) => {
    onChange({
      ...content,
      speakerPhotoUrl: url,
      showSpeaker: true
    });
  };

  const saveReusableLogo = (name: string, role: SavedBrandLogo['role'], url: string) => {
    const entry: SavedBrandLogo = {
      id: `logo_${Date.now()}`,
      name,
      role,
      url
    };
    onUpdateBrandKit({
      ...brandKit,
      savedLogos: [entry, ...(brandKit.savedLogos || [])].slice(0, 12)
    });
  };

  const saveBrandPreset = () => {
    const preset: BrandPreset = {
      id: `bpreset_${Date.now()}`,
      name: newPresetName.trim() || `${content.accentColor.toUpperCase()} · ${content.fontFamily}`,
      primaryColor: brandKit.primaryColor,
      secondaryColor: brandKit.secondaryColor,
      accentColor: content.accentColor,
      headingFont: content.fontFamily,
      bodyFont: brandKit.bodyFont,
      socialHandle: content.socialHandle || brandKit.socialHandle,
      hashtag: content.hashtag || brandKit.hashtag
    };
    onUpdateBrandKit({
      ...brandKit,
      savedPresets: [preset, ...(brandKit.savedPresets || [])].slice(0, 10)
    });
    setNewPresetName('');
  };

  const applyBrandPreset = (p: BrandPreset) => {
    onUpdateBrandKit({
      ...brandKit,
      primaryColor: p.primaryColor,
      secondaryColor: p.secondaryColor,
      accentColor: p.accentColor,
      headingFont: p.headingFont,
      bodyFont: p.bodyFont,
      socialHandle: p.socialHandle,
      hashtag: p.hashtag
    });
    onChange({
      ...content,
      accentColor: p.accentColor,
      fontFamily: p.headingFont,
      socialHandle: p.socialHandle,
      hashtag: p.hashtag
    });
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner and Navigation Tabs */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-sky-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Media Asset Archive & Brand Kit
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified institutional identity marks, campus architectural photography, user media library, and customizable brand kit.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'library' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Asset Library ({uploadedAssets.length + 6})
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'branding' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Configurable Brand Kit
            </button>
            <button
              onClick={() => setActiveTab('external')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'external' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              External Sources (Unsplash/Pexels)
            </button>
          </div>
        </div>

        {/* Upload Custom Asset Form */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="text-slate-400">Supported Formats:</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">PNG</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">JPEG</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">WEBP</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">SVG</span>
          </div>

          <label className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md shadow-sky-950/40">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Asset</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: ASSET LIBRARY */}
      {/* ========================================================= */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          {/* User Uploaded Assets */}
          {uploadedAssets.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                My Uploaded Media Assets ({uploadedAssets.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-3 rounded-xl bg-[#090D15] border border-slate-800 space-y-2.5 shadow-lg flex flex-col justify-between"
                  >
                    <div className="h-32 rounded-lg overflow-hidden bg-black/60 relative group">
                      <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeleteAsset(asset.id)}
                        title="Delete asset"
                        className="absolute top-2 right-2 p-1.5 rounded bg-red-950/80 text-red-300 hover:bg-red-800 border border-red-700/60 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white truncate max-w-[140px]">{asset.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(asset.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => applyAsHero(asset.url)}
                        className="py-1 rounded bg-sky-500/20 border border-sky-500/40 text-sky-200 hover:bg-sky-500/30 transition-colors"
                      >
                        Hero
                      </button>
                      <button
                        type="button"
                        onClick={() => applyAsBackground(asset.url)}
                        className="py-1 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-sky-300 transition-colors"
                      >
                        Set Bg
                      </button>
                      <button
                        type="button"
                        onClick={() => applyAsEventLogo(asset.url)}
                        className="py-1 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-sky-300 transition-colors"
                      >
                        Event Logo
                      </button>
                      <button
                        type="button"
                        onClick={() => applyAsSpeaker(asset.url)}
                        className="py-1 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-sky-300 transition-colors"
                      >
                        Speaker
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curated Institutional Marks */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Official Institutional Brand Marks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#090D15] border border-slate-800 flex items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <img
                      src="/assets/aistudio/National-Forensic-Sciences-University_Logo_70e28e60.jpg"
                      alt="NFSU Crest"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">NFSU Official Heraldic Crest</h4>
                    <span className="text-[10px] font-mono text-emerald-400 block">
                      Authentic Heraldry · विद्यया अमृतं अश्नुते
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Microscope, DNA double-helix, fingerprint biometric & computer forensics.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => applyAsLogo('/assets/aistudio/National-Forensic-Sciences-University_Logo_70e28e60.jpg')}
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-white text-xs font-mono shrink-0 transition-colors"
                >
                  Use on Poster
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#090D15] border border-slate-800 flex items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <GDGBrackets className="w-12 h-12" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Google Developer Groups on Campus</h4>
                    <span className="text-[10px] font-mono text-sky-400 block">
                      Official 4-Color Angle Brackets
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Vector scalable angle glyphs embedded across all layout styles.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 shrink-0">
                  Built-in Vector
                </span>
              </div>
            </div>
          </div>

          {/* NFSU Campus Architectural Photography */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Verified NFSU Gandhinagar Campus Photography
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Grand Portico (Night)', src: '/assets/aistudio/OIP_72f641f4.webp', desc: 'Illuminated architectural facade' },
                { title: 'Main Headquarters (Day)', src: '/assets/aistudio/OIP_5b55c84a.webp', desc: 'National university promenade' },
                { title: 'Campus Aerial Drone', src: '/assets/aistudio/OIP_8b72b508.webp', desc: 'Lush green academic complex' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#090D15] border border-slate-800 space-y-2.5 shadow-lg flex flex-col justify-between"
                >
                  <div className="h-32 rounded-lg overflow-hidden bg-black/60">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">{item.title}</h5>
                    <span className="text-[10px] text-slate-400 block font-mono">{item.desc}</span>
                  </div>
                  <button
                    onClick={() => applyAsBackground(item.src)}
                    className="w-full py-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-sky-950/50 hover:border-sky-500 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                  >
                    Apply as Background
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: CONFIGURABLE BRAND KIT */}
      {/* ========================================================= */}
      {activeTab === 'branding' && (
        <div className="space-y-5">
          {/* Independent Brand Logo Slots */}
          <div className="p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                Poster Brand Logo Slots (Header Identity)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure institutional header marks independently without altering event copy or background visuals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
                <label className="flex items-center justify-between text-white font-bold cursor-pointer">
                  <span>GDG Brackets Slot</span>
                  <input
                    type="checkbox"
                    checked={content.brandSlots?.gdgEnabled ?? true}
                    onChange={(e) =>
                      onChange({
                        ...content,
                        brandSlots: {
                          gdgEnabled: e.target.checked,
                          gdgVariant: content.brandSlots?.gdgVariant || 'color',
                          nfsuEnabled: content.brandSlots?.nfsuEnabled ?? true,
                          nfsuLogoUrl: content.brandSlots?.nfsuLogoUrl,
                          campusBadgeEnabled: content.brandSlots?.campusBadgeEnabled ?? true,
                          eventLogoUrl: content.brandSlots?.eventLogoUrl
                        }
                      })
                    }
                    className="accent-sky-400"
                  />
                </label>
                <div className="flex gap-1.5">
                  {(['color', 'white'] as const).map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      onClick={() =>
                        onChange({
                          ...content,
                          brandSlots: {
                            gdgEnabled: content.brandSlots?.gdgEnabled ?? true,
                            gdgVariant: variant,
                            nfsuEnabled: content.brandSlots?.nfsuEnabled ?? true,
                            nfsuLogoUrl: content.brandSlots?.nfsuLogoUrl,
                            campusBadgeEnabled: content.brandSlots?.campusBadgeEnabled ?? true,
                            eventLogoUrl: content.brandSlots?.eventLogoUrl
                          }
                        })
                      }
                      className={`flex-1 py-1 rounded border capitalize ${
                        (content.brandSlots?.gdgVariant || 'color') === variant
                          ? 'bg-sky-500 text-black border-sky-400 font-bold'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
                <label className="flex items-center justify-between text-white font-bold cursor-pointer">
                  <span>NFSU Crest Slot</span>
                  <input
                    type="checkbox"
                    checked={content.brandSlots?.nfsuEnabled ?? true}
                    onChange={(e) =>
                      onChange({
                        ...content,
                        brandSlots: {
                          gdgEnabled: content.brandSlots?.gdgEnabled ?? true,
                          gdgVariant: content.brandSlots?.gdgVariant || 'color',
                          nfsuEnabled: e.target.checked,
                          nfsuLogoUrl: content.brandSlots?.nfsuLogoUrl,
                          campusBadgeEnabled: content.brandSlots?.campusBadgeEnabled ?? true,
                          eventLogoUrl: content.brandSlots?.eventLogoUrl
                        }
                      })
                    }
                    className="accent-sky-400"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => applyAsLogo('/assets/aistudio/National-Forensic-Sciences-University_Logo_70e28e60.jpg')}
                  className="w-full py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 hover:border-sky-400 text-[10px]"
                >
                  Restore Verified Crest
                </button>
              </div>

              <div className="p-3 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
                <label className="flex items-center justify-between text-white font-bold cursor-pointer">
                  <span>Campus Subline</span>
                  <input
                    type="checkbox"
                    checked={content.brandSlots?.campusBadgeEnabled ?? true}
                    onChange={(e) =>
                      onChange({
                        ...content,
                        brandSlots: {
                          gdgEnabled: content.brandSlots?.gdgEnabled ?? true,
                          gdgVariant: content.brandSlots?.gdgVariant || 'color',
                          nfsuEnabled: content.brandSlots?.nfsuEnabled ?? true,
                          nfsuLogoUrl: content.brandSlots?.nfsuLogoUrl,
                          campusBadgeEnabled: e.target.checked,
                          eventLogoUrl: content.brandSlots?.eventLogoUrl
                        }
                      })
                    }
                    className="accent-sky-400"
                  />
                </label>
                <span className="text-[10px] text-slate-400 block">
                  Displays campus city &amp; verification tag below organizer header.
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
                <span className="text-white font-bold block">Event / Partner Logo</span>
                <div className="flex gap-1.5">
                  <label className="flex-1 text-center cursor-pointer py-1 rounded bg-sky-500/20 border border-sky-400/40 text-sky-200 text-[10px]">
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const r = new FileReader();
                        r.onload = () => {
                          if (typeof r.result === 'string') {
                            applyAsEventLogo(r.result);
                            saveReusableLogo(file.name.slice(0, 20), 'event', r.result);
                          }
                        };
                        r.readAsDataURL(file);
                      }}
                    />
                  </label>
                  {content.brandSlots?.eventLogoUrl && (
                    <button
                      type="button"
                      onClick={() => applyAsEventLogo('')}
                      className="px-2 py-1 rounded bg-rose-950/50 border border-rose-500/40 text-rose-300 text-[10px]"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                Configure Chapter Brand Identity &amp; Presets
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize fonts, palette accents, and official social identifiers. Save reusable Brand Kit presets locally.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-800 text-xs">
              <div className="space-y-3">
                <label className="text-[11px] font-mono text-slate-300 uppercase block font-bold">
                  Chapter Accent Color
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['blue', 'green', 'amber', 'red', 'purple', 'titanium'] as AccentColor[]).map((acc) => (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => {
                        onUpdateBrandKit({ ...brandKit, accentColor: acc });
                        onChange({ ...content, accentColor: acc });
                      }}
                      className={`p-2 rounded-lg border text-left flex items-center gap-2 ${
                        content.accentColor === acc
                          ? 'bg-sky-950/50 border-sky-500 text-white font-bold ring-1 ring-sky-500/40'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${
                          acc === 'blue'
                            ? 'bg-sky-400'
                            : acc === 'green'
                            ? 'bg-emerald-400'
                            : acc === 'amber'
                            ? 'bg-amber-400'
                            : acc === 'red'
                            ? 'bg-red-400'
                            : acc === 'purple'
                            ? 'bg-purple-400'
                            : 'bg-slate-400'
                        }`}
                      />
                      <span className="capitalize text-[11px] font-mono">{acc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-mono text-slate-300 uppercase block font-bold">
                  Primary Display &amp; Heading Font
                </label>
                <select
                  aria-label="Primary display heading font"
                  value={content.fontFamily}
                  onChange={(e) => {
                    const val = e.target.value as PosterFont;
                    onUpdateBrandKit({ ...brandKit, headingFont: val });
                    onChange({ ...content, fontFamily: val });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                >
                  {GOOGLE_FONT_OPTIONS.map((f) => (
                    <option key={f.family} value={f.family}>
                      {f.family} ({f.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 uppercase block font-bold">
                  Official Social Media Handle / Tags
                </label>
                <input
                  type="text"
                  value={content.socialHandle || ''}
                  onChange={(e) => {
                    onUpdateBrandKit({ ...brandKit, socialHandle: e.target.value });
                    onChange({ ...content, socialHandle: e.target.value });
                  }}
                  placeholder="#GDGonNFSU · @gdgnfsu"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 uppercase block font-bold">
                  Official Community Hashtag
                </label>
                <input
                  type="text"
                  value={content.hashtag || ''}
                  onChange={(e) => {
                    onUpdateBrandKit({ ...brandKit, hashtag: e.target.value });
                    onChange({ ...content, hashtag: e.target.value });
                  }}
                  placeholder="#GDGonNFSU"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Save & Apply Brand Kit Presets */}
            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs font-mono">
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="Preset name (e.g. NFSU CTF Blue Kit)..."
                  className="flex-1 min-w-[200px] bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
                <button
                  type="button"
                  onClick={saveBrandPreset}
                  className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Save Brand Preset
                </button>
              </div>

              {(brandKit.savedPresets || []).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(brandKit.savedPresets || []).map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyBrandPreset(preset)}
                      className="p-2.5 rounded-lg bg-[#040711] border border-slate-800 hover:border-sky-400 text-left flex items-center justify-between"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-white block truncate">{preset.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {preset.accentColor} · {preset.headingFont}
                        </span>
                      </div>
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: EXTERNAL IMAGE SOURCES (UNSPLASH / PEXELS) */}
      {/* ========================================================= */}
      {activeTab === 'external' && (
        <div className="p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              External High-Resolution Photography Resources
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Curated resource links to search for authentic cybersecurity hardware, semiconductor dies, and editorial imagery.
            </p>
          </div>

          {/* Licensing Advisory Notice */}
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5 font-mono">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-white">Licensing & Attribution Compliance:</span>
              <span>
                Do not scrape or assume that every external image can be used without checking its licence. Always verify Unsplash / Pexels terms, ensure attribution where required, and use images strictly as backgrounds or visual elements—not as replacements for editable typography.
              </span>
            </div>
          </div>

          {/* Curated External Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <a
              href="https://unsplash.com/s/photos/cybersecurity-hardware"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-xs text-white group-hover:text-sky-400 transition-colors">
                  Unsplash // Cybersecurity & Hardware Silicon
                </h4>
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                  Search high-resolution microchips, circuit traces & servers
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
            </a>

            <a
              href="https://www.pexels.com/search/computer%20forensics/"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-xs text-white group-hover:text-sky-400 transition-colors">
                  Pexels // Computer Forensics & SOC Operations
                </h4>
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                  Search network monitors, server rooms & digital forensics labs
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
