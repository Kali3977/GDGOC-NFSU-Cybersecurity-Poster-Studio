import React, { useState } from 'react';
import { PosterContent, PosterFormat } from '../types/poster';
import { CampusInfo, INITIAL_VERIFIED_CAMPUSES } from '../data/campuses';
import { PosterCanvas } from './PosterCanvas';
import { ShieldCheck, Download, CheckSquare, Square, Eye, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';

interface MultiCampusCampaignViewProps {
  baseContent: PosterContent;
  campuses: CampusInfo[];
  format: PosterFormat;
  onEditCampusPoster: (campus: CampusInfo) => void;
  onRecordExport: (title: string, campusName: string, format: PosterFormat) => void;
}

export function MultiCampusCampaignView({
  baseContent,
  campuses,
  format,
  onEditCampusPoster,
  onRecordExport
}: MultiCampusCampaignViewProps) {
  // Mode: single, multi, all_verified
  const [campaignMode, setCampaignMode] = useState<'single' | 'multi' | 'all_verified'>('multi');
  
  // Selected campus IDs
  const [selectedCampusIds, setSelectedCampusIds] = useState<string[]>(
    campuses.filter((c) => c.isVerified).slice(0, 4).map((c) => c.id)
  );

  const [isExportingAll, setIsExportingAll] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ current: number; total: number } | null>(null);

  // Compute active target campuses based on mode
  const activeCampuses = 
    campaignMode === 'single'
      ? campuses.filter((c) => c.id === baseContent.campusId)
      : campaignMode === 'all_verified'
      ? campuses.filter((c) => c.isVerified)
      : campuses.filter((c) => selectedCampusIds.includes(c.id));

  const toggleCampus = (id: string) => {
    setSelectedCampusIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllVerified = () => {
    setSelectedCampusIds(campuses.filter((c) => c.isVerified).map((c) => c.id));
    setCampaignMode('multi');
  };

  const handleExportSingleCard = async (campus: CampusInfo) => {
    const el = document.getElementById(`campus-poster-preview-${campus.id}`);
    if (!el) return;

    try {
      const dataUrl = await toPng(el, {
        cacheBust: false,
        skipFonts: true,
        pixelRatio: 2
      });

      const cleanTitle = baseContent.headline.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `GDG_NFSU_${campus.city.toUpperCase()}_${cleanTitle}_${format}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      onRecordExport(baseContent.headline, campus.name, format);
    } catch (err) {
      console.error('Failed to export campus poster', err);
    }
  };

  const handleExportAllBatch = async () => {
    if (activeCampuses.length === 0) return;

    setIsExportingAll(true);
    setExportProgress({ current: 0, total: activeCampuses.length });

    for (let i = 0; i < activeCampuses.length; i++) {
      const campus = activeCampuses[i];
      setExportProgress({ current: i + 1, total: activeCampuses.length });

      const el = document.getElementById(`campus-poster-preview-${campus.id}`);
      if (el) {
        try {
          const dataUrl = await toPng(el, {
            cacheBust: false,
            skipFonts: true,
            pixelRatio: 2
          });

          const cleanTitle = baseContent.headline.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_');
          const filename = `GDG_NFSU_${campus.city.toUpperCase()}_${cleanTitle}_${format}.png`;

          const link = document.createElement('a');
          link.download = filename;
          link.href = dataUrl;
          link.click();

          onRecordExport(baseContent.headline, campus.name, format);

          // Small delay to prevent browser download throttling
          await new Promise((r) => setTimeout(r, 600));
        } catch (err) {
          console.error(`Failed to export for campus ${campus.name}`, err);
        }
      }
    }

    setIsExportingAll(false);
    setExportProgress(null);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner & Mode Switcher */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Multi-Campus Campaign Manager
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Deploy one shared cybersecurity campaign across all verified NFSU cyber campuses with automatic localized branding.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setCampaignMode('single')}
              className={`px-3 py-1.5 rounded transition-colors ${
                campaignMode === 'single'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Single Campus
            </button>
            <button
              onClick={() => setCampaignMode('multi')}
              className={`px-3 py-1.5 rounded transition-colors ${
                campaignMode === 'multi'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Selected Campuses
            </button>
            <button
              onClick={() => setCampaignMode('all_verified')}
              className={`px-3 py-1.5 rounded transition-colors ${
                campaignMode === 'all_verified'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. All Verified ({campuses.filter((c) => c.isVerified).length})
            </button>
          </div>
        </div>

        {/* Campuses Selector Grid (Only shown in 'multi' mode) */}
        {campaignMode === 'multi' && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">
                Select Target Campuses ({selectedCampusIds.length} selected):
              </span>
              <button
                onClick={selectAllVerified}
                className="text-sky-400 hover:text-sky-300 font-mono text-[11px] underline"
              >
                Select All Verified Cyber Campuses
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {campuses.map((campus) => {
                const isChecked = selectedCampusIds.includes(campus.id);
                return (
                  <button
                    key={campus.id}
                    onClick={() => toggleCampus(campus.id)}
                    className={`p-2 rounded border text-left flex items-center gap-2 transition-colors ${
                      isChecked
                        ? 'bg-sky-950/40 border-sky-500/50 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    )}
                    <div className="truncate">
                      <span className="block truncate font-semibold">{campus.city}</span>
                      <span className="text-[9px] text-slate-500 truncate block">
                        {campus.isVerified ? 'Verified' : 'Custom'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Batch Export Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="text-xs text-slate-400">
            Generating <strong className="text-white">{activeCampuses.length} distinct posters</strong> with identical theme & localized venue/chapter text.
          </div>

          <button
            onClick={handleExportAllBatch}
            disabled={isExportingAll || activeCampuses.length === 0}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            <span>
              {isExportingAll && exportProgress
                ? `Exporting Campus ${exportProgress.current}/${exportProgress.total}...`
                : `Batch Export All (${activeCampuses.length} Posters)`}
            </span>
          </button>
        </div>
      </div>

      {/* Grid of All Campus Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCampuses.map((campus) => {
          // Construct campus localized copy for venue
          const campusSpecificContent: PosterContent = {
            ...baseContent,
            campusId: campus.id,
            venue: baseContent.venue.includes('NFSU')
              ? campus.defaultVenue
              : baseContent.venue
          };

          return (
            <div
              key={campus.id}
              className="bg-[#090D15] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between space-y-3"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm">{campus.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    {campus.city}, {campus.state}
                  </span>
                </div>

                {campus.isVerified ? (
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                    Unverified
                  </span>
                )}
              </div>

              {/* Poster Preview Frame */}
              <div className="w-full flex items-center justify-center overflow-hidden py-1">
                <div
                  id={`campus-poster-preview-${campus.id}`}
                  className="w-full transform scale-90 sm:scale-100 origin-top"
                >
                  <PosterCanvas
                    content={campusSpecificContent}
                    format={format}
                    selectedCampusOverride={campus}
                  />
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onEditCampusPoster(campus)}
                  className="flex-1 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  <span>Open in Studio</span>
                </button>

                <button
                  onClick={() => handleExportSingleCard(campus)}
                  className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
