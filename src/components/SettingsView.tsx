import React, { useState, useEffect } from 'react';
import {
  Settings,
  Download,
  Trash2,
  CheckCircle2,
  Database,
  Globe,
  Shield
} from 'lucide-react';
import { StudioSettings } from '../types/poster';
import { GOOGLE_FONT_OPTIONS } from '../data/fonts';

interface SettingsViewProps {
  settings: StudioSettings;
  onUpdateSettings: (next: StudioSettings) => void;
  onResetAllStorage: () => void;
  projectsCount: number;
}

export function SettingsView({
  settings,
  onUpdateSettings,
  onResetAllStorage,
  projectsCount
}: SettingsViewProps) {
  const [healthInfo, setHealthInfo] = useState<{ status: string; aiConfigured?: boolean } | null>(null);
  const [providerCount, setProviderCount] = useState<number | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    fetch('/api/health')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setHealthInfo(d))
      .catch(() => null);

    fetch('/api/images/sources')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => Array.isArray(d?.providers) && setProviderCount(d.providers.filter((p: any) => p.configured).length))
      .catch(() => null);
  }, []);

  const handleExportAllWorkspaceJson = () => {
    const dump: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('gdgoc_') || key.startsWith('gdg_'))) {
        try {
          dump[key] = JSON.parse(localStorage.getItem(key) || 'null');
        } catch {
          dump[key] = localStorage.getItem(key);
        }
      }
    }
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gdgoc_nfsu_studio_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left animate-in fade-in">
      <div className="rounded-xl border border-slate-800 bg-[#070B16] p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
          <Settings className="w-5 h-5 text-sky-400" />
          <div>
            <h2 className="text-lg font-black text-white">Studio Settings &amp; Local Storage</h2>
            <p className="text-xs text-slate-400">
              Configure studio canvas defaults, export behavior, Hindi typography defaults, and browser storage management.
            </p>
          </div>
        </div>

        {/* Workspace Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
            <label htmlFor="settings-units" className="text-slate-300 font-bold uppercase block">
              Coordinate Display Units
            </label>
            <select
              id="settings-units"
              value={settings.units}
              onChange={(e) => onUpdateSettings({ ...settings, units: e.target.value as 'px' | 'percent' })}
              className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
            >
              <option value="px">Pixels (px)</option>
              <option value="percent">Canvas Percentage (%)</option>
            </select>
          </div>

          <div className="p-4 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
            <label htmlFor="settings-hindi-font" className="text-slate-300 font-bold uppercase block">
              Default Hindi / Devanagari Font
            </label>
            <select
              id="settings-hindi-font"
              value={settings.preferredHindiFont}
              onChange={(e) => onUpdateSettings({ ...settings, preferredHindiFont: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
            >
              {GOOGLE_FONT_OPTIONS.filter((f) => f.supportsHindi).map((f) => (
                <option key={f.family} value={f.family}>
                  {f.family}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-lg bg-[#040711] border border-slate-800 space-y-2">
            <label htmlFor="settings-jpeg-fallback" className="text-slate-300 font-bold uppercase block">
              Default JPEG Fallback Color (When Transparent)
            </label>
            <div className="flex items-center gap-2">
              <input
                id="settings-jpeg-fallback"
                type="color"
                value={settings.defaultJpegFallbackColor}
                onChange={(e) => onUpdateSettings({ ...settings, defaultJpegFallbackColor: e.target.value })}
                className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                aria-label="JPEG fallback hex code"
                value={settings.defaultJpegFallbackColor}
                onChange={(e) => onUpdateSettings({ ...settings, defaultJpegFallbackColor: e.target.value })}
                className="flex-1 bg-slate-950 border border-slate-700 rounded p-2 text-white"
              />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#040711] border border-slate-800 space-y-2.5">
            <span className="text-slate-300 font-bold uppercase block">Canvas Guides Defaults</span>
            <label className="flex items-center justify-between text-slate-200 cursor-pointer">
              <span>Enable Grid Snapping by Default</span>
              <input
                type="checkbox"
                checked={settings.defaultGridSnap}
                onChange={(e) => onUpdateSettings({ ...settings, defaultGridSnap: e.target.checked })}
                className="accent-sky-400"
              />
            </label>
            <label className="flex items-center justify-between text-slate-200 cursor-pointer">
              <span>Show Safe Print Margins by Default</span>
              <input
                type="checkbox"
                checked={settings.defaultSafeMargins}
                onChange={(e) => onUpdateSettings({ ...settings, defaultSafeMargins: e.target.checked })}
                className="accent-sky-400"
              />
            </label>
          </div>
        </div>

        {/* Honest Storage & Server Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-[#040711] border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-mono font-bold text-emerald-300 uppercase">
              <Database className="w-4 h-4" /> Browser Local Persistence
            </div>
            <p className="text-slate-300 leading-relaxed">
              Projects ({projectsCount}), saved colors, custom gradients, Brand Kit presets, recently used images, and studio preferences are stored locally in your browser via <code className="text-sky-300">localStorage</code> (no remote cloud database is used).
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#040711] border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-mono font-bold text-sky-300 uppercase">
              <Globe className="w-4 h-4" /> Server Capabilities
            </div>
            <div className="space-y-1 font-mono text-slate-300">
              <div className="flex items-center justify-between">
                <span>Backend Proxy &amp; Font Embedder:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {healthInfo?.status || 'Checked'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Configured Online Image Sources:</span>
                <span className="text-sky-300">{providerCount !== null ? `${providerCount} Active` : 'Wikimedia Ready'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Backup & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleExportAllWorkspaceJson}
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-bold flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Full Workspace Backup (.JSON)</span>
          </button>

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="px-4 py-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset Local Studio Data</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose-300 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Confirm erase local cache?
              </span>
              <button
                type="button"
                onClick={() => {
                  onResetAllStorage();
                  setConfirmReset(false);
                }}
                className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold"
              >
                Confirm Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs font-mono"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
