import React, { useState } from 'react';
import { PosterContent, PosterFormat, ExportHistoryItem } from '../types/poster';
import { CampusInfo } from '../data/campuses';
import { PosterCanvas } from './PosterCanvas';
import { FolderHeart, History, Edit, Copy, Trash2, Clock, Download, ArrowRight } from 'lucide-react';

interface MyDesignsViewProps {
  currentPoster: PosterContent;
  onLoadDesign: (design: PosterContent) => void;
  savedDesigns: PosterContent[];
  onUpdateSavedDesigns: (designs: PosterContent[]) => void;
  exportHistory: ExportHistoryItem[];
  campuses: CampusInfo[];
}

export function MyDesignsView({
  currentPoster,
  onLoadDesign,
  savedDesigns,
  onUpdateSavedDesigns,
  exportHistory,
  campuses
}: MyDesignsViewProps) {
  const [activeTab, setActiveTab] = useState<'saved' | 'history'>('saved');
  const [saveName, setSaveName] = useState('');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const handleSaveCurrent = () => {
    const title = saveName.trim() || currentPoster.headline.slice(0, 28);
    const newDesign: PosterContent = {
      ...currentPoster,
      id: `design_${Date.now()}`,
      title
    };

    const updated = [newDesign, ...savedDesigns];
    onUpdateSavedDesigns(updated);
    try {
      localStorage.setItem('gdgoc_nfsu_saved_designs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setSaveName('');
    setSaveNotice(`Saved "${title}" to My Designs!`);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    const updated = savedDesigns.filter((d) => d.id !== id);
    onUpdateSavedDesigns(updated);
    try {
      localStorage.setItem('gdgoc_nfsu_saved_designs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDuplicate = (design: PosterContent) => {
    const duplicated: PosterContent = {
      ...design,
      id: `design_${Date.now()}`,
      title: `${design.title || design.headline.slice(0, 20)} (Copy)`
    };
    const updated = [duplicated, ...savedDesigns];
    onUpdateSavedDesigns(updated);
    try {
      localStorage.setItem('gdgoc_nfsu_saved_designs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner and Navigation Tabs */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FolderHeart className="w-5 h-5 text-sky-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                My Designs & Export Archives
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Access previously crafted cybersecurity posters, load them back into the editor, or check past export logs.
            </p>
          </div>

          {/* Sub-tab Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'saved'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderHeart className="w-3.5 h-3.5" />
              <span>Saved Designs ({savedDesigns.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Export History ({exportHistory.length})</span>
            </button>
          </div>
        </div>

        {/* Quick Save Current Poster Widget */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-2 text-xs">
          <input
            type="text"
            placeholder="Save current poster as... (e.g. CyberStrike CTF Final Draft)"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 w-full sm:w-auto"
          />
          <button
            onClick={handleSaveCurrent}
            className="px-4 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors shrink-0 flex items-center gap-1.5"
          >
            <FolderHeart className="w-3.5 h-3.5" />
            <span>Save to My Designs</span>
          </button>
          {saveNotice && (
            <span className="text-[11px] font-mono text-emerald-400 animate-in fade-in">
              {saveNotice}
            </span>
          )}
        </div>
      </div>

      {/* VIEW 1: SAVED DESIGNS */}
      {activeTab === 'saved' && (
        <div>
          {savedDesigns.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/40 text-slate-400 space-y-2">
              <FolderHeart className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">No Saved Designs Yet</h4>
              <p className="text-xs max-w-sm mx-auto">
                Use the box above to save your current poster design, or customize any template in the Studio.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDesigns.map((design) => {
                const targetCampus = campuses.find((c) => c.id === design.campusId) || campuses[0];
                return (
                  <div
                    key={design.id}
                    className="bg-[#090D15] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div>
                        <h4 className="font-bold text-white text-xs truncate max-w-[180px]">
                          {design.title || design.headline}
                        </h4>
                        <span className="text-[9.5px] font-mono text-sky-400 block">
                          {targetCampus.name} · {design.category.toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(design.id)}
                        title="Delete design"
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Miniature Preview Frame */}
                    <div className="w-full flex items-center justify-center overflow-hidden py-1">
                      <div className="w-full transform scale-90 sm:scale-95 origin-top">
                        <PosterCanvas
                          content={design}
                          format="4:5"
                          selectedCampusOverride={targetCampus}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <button
                        onClick={() => onLoadDesign(design)}
                        className="flex-1 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Open & Edit</span>
                      </button>
                      <button
                        onClick={() => handleDuplicate(design)}
                        title="Duplicate design"
                        className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: EXPORT HISTORY LOG */}
      {activeTab === 'history' && (
        <div className="bg-[#090D15] border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-white">Recent Poster Exports</span>
            <span className="text-[10px] font-mono text-slate-400">Total: {exportHistory.length}</span>
          </div>

          {exportHistory.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs font-mono">
              No exports recorded yet. Download posters from Studio or Multi-Campus manager to see them here.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80 text-xs">
              {exportHistory.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-xs">{item.title}</div>
                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="text-sky-400">{item.campusName}</span>
                      <span>·</span>
                      <span>Format: {item.format.toUpperCase()}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Exported
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
