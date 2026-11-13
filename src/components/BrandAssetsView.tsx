import React, { useState } from 'react';
import { GDGBrackets, NFSUUniversityMark } from './OfficialLogos';
import { Upload, Check, Image as ImageIcon, ShieldCheck, ArrowRight, User } from 'lucide-react';

interface BrandAssetsViewProps {
  onApplyAssetAsBackground: (imageUrl: string) => void;
  onApplyAssetAsLogo: (logoUrl: string) => void;
  onApplyAssetAsSpeaker: (photoUrl: string) => void;
}

export function BrandAssetsView({
  onApplyAssetAsBackground,
  onApplyAssetAsLogo,
  onApplyAssetAsSpeaker
}: BrandAssetsViewProps) {
  const [customUploads, setCustomUploads] = useState<string[]>([]);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomUploads((prev) => [reader.result as string, ...prev]);
        setAppliedNotice('Asset uploaded and added to library!');
        setTimeout(() => setAppliedNotice(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const notifyApplied = (msg: string) => {
    setAppliedNotice(msg);
    setTimeout(() => setAppliedNotice(null), 3000);
  };

  const officialCampusPhotos = [
    {
      id: 'night',
      title: 'Grand Entrance Portico (Night)',
      url: '/assets/aistudio/OIP_72f641f4.webp',
      desc: 'Architectural illuminated portico and campus security checkpoint lighting'
    },
    {
      id: 'day',
      title: 'Main Academic Facade (Day)',
      url: '/assets/aistudio/OIP_5b55c84a.webp',
      desc: 'National headquarters building with national flagpole promenade'
    },
    {
      id: 'aerial',
      title: 'Campus Aerial Panorama (Drone)',
      url: '/assets/aistudio/OIP_8b72b508.webp',
      desc: 'Lush green Gandhinagar university campus and academic wings'
    }
  ];

  const cyberForensicAssets = [
    {
      id: 'forensics',
      title: 'Silicon Forensics & Microchip Telemetry',
      url: '/assets/images/signal_silicon_forensics_1794419167984.jpg',
      desc: 'Hardware security die, microscopic traces and cryptographic coprocessor'
    },
    {
      id: 'monolith',
      title: 'Brutalist Monolith Column',
      url: '/assets/images/signal_brutalist_monolith_1794418292586.jpg',
      desc: 'Textured concrete architectural forms representing defense pillars'
    },
    {
      id: 'obsidian',
      title: 'Obsidian Refraction Plinth',
      url: '/assets/images/signal_tactile_prism_1794418294380.jpg',
      desc: 'Dark crystalline refraction reflecting cyber stealth and sovereign shields'
    }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header and Upload Strip */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Official Brand Marks & Media Asset Archive
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified identity assets for National Forensic Sciences University and Google Developer Groups on Campus.
            </p>
          </div>

          {/* Upload Button */}
          <div>
            <input
              type="file"
              accept="image/*"
              id="asset-archive-upload"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="asset-archive-upload"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs cursor-pointer flex items-center gap-2 transition-colors shadow-md"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Custom Asset</span>
            </label>
          </div>
        </div>

        {appliedNotice && (
          <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded text-xs text-emerald-300 font-mono animate-in fade-in">
            {appliedNotice}
          </div>
        )}
      </div>

      {/* SECTION 1: VERIFIED INSTITUTIONAL BRAND MARKS */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          1. Verified Institutional Identity Marks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NFSU CREST CARD */}
          <div className="p-4 rounded-xl bg-[#090D15] border border-slate-800 flex items-start gap-3.5">
            <div className="w-14 h-16 rounded bg-white p-1 border border-amber-500/50 flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/National-Forensic-Sciences-University_Logo_70e28e60.jpg"
                alt="NFSU Official Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">NFSU Official Heraldic Crest</h4>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded border border-emerald-500/30">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Authentic gold heraldic shield, computer forensics, fingerprint biometric, forensic microscope, DNA helix, and motto *विद्यया अमृतं अश्नुते*.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={() => {
                    onApplyAssetAsLogo('/assets/aistudio/National-Forensic-Sciences-University_Logo_70e28e60.jpg');
                    notifyApplied('Applied NFSU Crest as primary logo in Studio!');
                  }}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-sky-400 hover:text-sky-300 border border-slate-800 text-xs font-mono transition-colors"
                >
                  Use as Canvas Logo
                </button>
              </div>
            </div>
          </div>

          {/* GDG ON CAMPUS BRAND MARK */}
          <div className="p-4 rounded-xl bg-[#090D15] border border-slate-800 flex items-start gap-3.5">
            <div className="w-14 h-16 rounded bg-slate-950 p-2 border border-slate-800 flex items-center justify-center shrink-0">
              <GDGBrackets className="w-10 h-10" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">Google Developer Groups on Campus</h4>
                <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 px-1 rounded border border-sky-500/30">
                  Official
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Official vector angle brackets rendered in authentic 4-color palette (`#EA4335`, `#4285F4`, `#34A853`, `#FBBC04`).
              </p>
              <div className="mt-2.5 text-[11px] font-mono text-slate-500">
                Vector Scalable · Embedded in All Layouts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: VERIFIED NFSU CAMPUS PHOTOGRAPHY */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          2. Verified NFSU Campus Architectural Photography
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {officialCampusPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-[#090D15] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{photo.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {photo.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onApplyAssetAsBackground(photo.url);
                    notifyApplied(`Applied ${photo.title} as poster background!`);
                  }}
                  className="w-full py-1.5 rounded bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Apply as Background</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: SPECIALIZED CYBER FORENSIC & HARDWARE IMAGERY */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          3. Specialized Cybersecurity & Forensic Silicon Assets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cyberForensicAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#090D15] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={asset.url}
                  alt={asset.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{asset.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {asset.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onApplyAssetAsBackground(asset.url);
                    notifyApplied(`Applied ${asset.title} as poster background!`);
                  }}
                  className="w-full py-1.5 rounded bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Apply as Background</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: USER UPLOADED MEDIA POOL */}
      {customUploads.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
            4. Your Uploaded Media Pool ({customUploads.length})
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {customUploads.map((uploadUrl, idx) => (
              <div
                key={idx}
                className="bg-[#090D15] border border-slate-800 rounded-xl overflow-hidden p-2 space-y-2"
              >
                <div className="aspect-square rounded bg-slate-950 overflow-hidden">
                  <img src={uploadUrl} alt="Uploaded asset" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                  <button
                    onClick={() => {
                      onApplyAssetAsBackground(uploadUrl);
                      notifyApplied('Applied custom asset as background!');
                    }}
                    className="py-1 rounded bg-slate-900 hover:bg-slate-800 text-sky-300 text-center"
                  >
                    BG
                  </button>
                  <button
                    onClick={() => {
                      onApplyAssetAsSpeaker(uploadUrl);
                      notifyApplied('Applied custom asset as speaker photo!');
                    }}
                    className="py-1 rounded bg-slate-900 hover:bg-slate-800 text-emerald-300 text-center"
                  >
                    Speaker
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
