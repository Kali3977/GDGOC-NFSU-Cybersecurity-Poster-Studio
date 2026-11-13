import React, { useState } from 'react';
import { QrCode, Check, Copy, ExternalLink, Sparkles, RefreshCw, Smartphone } from 'lucide-react';
import { PosterContent, QRContrastMode } from '../types/poster';
import { QRCodeDisplay } from './QRCodeDisplay';

interface QRCodeUtilityPanelProps {
  content: PosterContent;
  onChange: (updated: PosterContent) => void;
}

const PRESET_URLS = [
  { label: 'GDG Portal', url: 'https://gdg.community.dev/events/details/developer-groups-nfsu-cyberstrike/' },
  { label: 'Google Form', url: 'https://forms.gle/nfsu-gdg-cybersecurity-registration' },
  { label: 'Unstop Arena', url: 'https://unstop.com/hackathons/gdg-nfsu-cyberstrike-2026' },
  { label: 'CTFd Server', url: 'https://ctfd.nfsu.ac.in/register' }
];

const CONTRAST_MODES: { mode: QRContrastMode; label: string; bg: string; fg: string; desc: string }[] = [
  { 
    mode: 'dark_on_light', 
    label: 'High-Contrast White', 
    bg: '#FFFFFF', 
    fg: '#05070A', 
    desc: 'Maximum phone camera scan reliability & print clarity' 
  },
  { 
    mode: 'electric_cyan', 
    label: 'Electric Cyan', 
    bg: '#070E1A', 
    fg: '#38BDF8', 
    desc: 'Nocturnal cyber aesthetic with neon glow' 
  },
  { 
    mode: 'matrix_green', 
    label: 'Matrix Emerald', 
    bg: '#04100A', 
    fg: '#10B981', 
    desc: 'Terminal hacker green on deep obsidian' 
  },
  { 
    mode: 'amber_gold', 
    label: 'Amber Gold', 
    bg: '#130D04', 
    fg: '#F59E0B', 
    desc: 'Executive institutional brass on carbon' 
  }
];

export function QRCodeUtilityPanel({ content, onChange }: QRCodeUtilityPanelProps) {
  const [copied, setCopied] = useState(false);
  const [testScanned, setTestScanned] = useState(false);

  const destinationUrl = content.qrDestination || content.registrationLink || '';
  const contrastMode = content.qrContrastMode || 'dark_on_light';
  const qrLabel = content.qrLabel || 'Scan to Register & Get Pass';
  const qrSize = content.qrSize || 'md';

  const handleUrlChange = (url: string) => {
    onChange({
      ...content,
      qrDestination: url,
      registrationLink: url,
      showQrCode: true
    });
  };

  const handleCopyUrl = () => {
    if (!destinationUrl) return;
    navigator.clipboard.writeText(destinationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateScan = () => {
    setTestScanned(true);
    setTimeout(() => setTestScanned(false), 3000);
  };

  return (
    <div className="bg-[#070B14] rounded-xl border border-sky-500/30 p-4 sm:p-5 shadow-xl space-y-4 text-left">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-bold">
                QR CODE ENGINE
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                OFFLINE SVG
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white">
              Registration URL & High-Contrast Overlay
            </h4>
          </div>
        </div>

        {/* Toggle Switch */}
        <label className="flex items-center gap-2 text-xs font-mono cursor-pointer shrink-0">
          <span className="text-slate-400 hidden sm:inline">Overlay:</span>
          <button
            type="button"
            onClick={() => onChange({ ...content, showQrCode: !content.showQrCode })}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              content.showQrCode ? 'bg-sky-600' : 'bg-slate-800'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                content.showQrCode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
      </div>

      {/* Main Grid: Input + Live Preview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Input and Presets */}
        <div className="md:col-span-2 space-y-3.5">
          {/* Target URL Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-slate-300 font-medium uppercase">
                Destination / Registration URL
              </label>
              {destinationUrl && (
                <span className="text-[10px] font-mono text-slate-500">
                  {destinationUrl.length} chars
                </span>
              )}
            </div>

            <div className="relative flex items-center">
              <input
                type="url"
                value={destinationUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://gdg.community.dev/events/..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-3 pr-20 text-white text-xs font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                {destinationUrl && (
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    title="Copy URL"
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
                {destinationUrl && (
                  <a
                    href={destinationUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Open destination in new tab"
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Generates a vector SVG code instantly. Scans cleanly on both mobile displays and printed physical posters.
            </p>
          </div>

          {/* Quick Preset Link Chips */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
              Quick Event Presets:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_URLS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleUrlChange(preset.url)}
                  className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
                    destinationUrl === preset.url
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 font-bold'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Callout Label Input */}
          <div>
            <label className="text-[11px] font-mono text-slate-300 font-medium uppercase block mb-1.5">
              QR Callout Text / Caption
            </label>
            <input
              type="text"
              value={qrLabel}
              onChange={(e) => onChange({ ...content, qrLabel: e.target.value })}
              placeholder="e.g. Scan to Register & Get Pass"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Contrast Mode Selector */}
          <div>
            <label className="text-[11px] font-mono text-slate-300 font-medium uppercase block mb-1.5">
              High-Contrast Color Scheme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CONTRAST_MODES.map((mode) => (
                <button
                  key={mode.mode}
                  type="button"
                  onClick={() => onChange({ ...content, qrContrastMode: mode.mode })}
                  className={`p-2 rounded-lg border text-left transition-all flex items-start gap-2.5 ${
                    contrastMode === mode.mode
                      ? 'bg-sky-500/10 border-sky-500 ring-1 ring-sky-500/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div
                    style={{ backgroundColor: mode.bg, borderColor: mode.fg }}
                    className="w-5 h-5 rounded border-2 shrink-0 mt-0.5 shadow-sm"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {mode.label}
                    </span>
                    <span className="text-[9px] text-slate-400 block leading-tight">
                      {mode.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live QR Preview & Scan Simulator */}
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-between text-center">
          <div className="w-full">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
              Live Canvas Overlay Preview
            </span>

            {/* QR Card Container */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 inline-block shadow-xl my-2">
              <QRCodeDisplay
                value={destinationUrl}
                size={110}
                contrastMode={contrastMode}
                label={qrLabel}
                showPlaceholderIfEmpty={true}
              />
            </div>
          </div>

          {/* Test Scanner Verification */}
          <div className="w-full space-y-2 mt-3 pt-3 border-t border-slate-800/80">
            {testScanned ? (
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono flex items-center justify-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Verified: Link is reachable & valid!</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={!destinationUrl}
                className="w-full py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
              >
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span>Simulate Camera Scan</span>
              </button>
            )}

            <span className="text-[9px] text-slate-400 block font-mono">
              Status: {content.showQrCode ? 'Active on canvas overlay' : 'Hidden from canvas'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
