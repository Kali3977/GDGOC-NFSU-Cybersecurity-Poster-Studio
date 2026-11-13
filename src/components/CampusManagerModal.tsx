import React, { useState } from 'react';
import { CampusInfo, saveStoredCampuses } from '../data/campuses';
import { ShieldCheck, Plus, Trash2, ExternalLink, X, AlertCircle } from 'lucide-react';

interface CampusManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  campuses: CampusInfo[];
  onUpdateCampuses: (updated: CampusInfo[]) => void;
}

export function CampusManagerModal({
  isOpen,
  onClose,
  campuses,
  onUpdateCampuses
}: CampusManagerModalProps) {
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newProgrammes, setNewProgrammes] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddCustomCampus = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newCity.trim() || !newState.trim()) {
      setError('City and State are required.');
      return;
    }

    const id = `custom_${newCity.trim().toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
    const name = `NFSU ${newCity.trim()} Campus`;

    const customCampus: CampusInfo = {
      id,
      name,
      city: newCity.trim(),
      state: newState.trim(),
      isVerified: false, // Explicitly marked unverified as required
      verificationSource: 'User-defined Custom Campus (Unverified)',
      programmeDetails: newProgrammes.trim() || 'Custom / Unverified Cybersecurity Programme',
      confirmedProgrammes: newProgrammes
        ? newProgrammes.split(',').map((p) => p.trim())
        : ['Custom Cybersecurity Curriculum'],
      defaultVenue: newVenue.trim() || `Auditorium, NFSU ${newCity.trim()} Campus`,
      chapterStatus: 'unverified_pending',
      isCustom: true
    };

    const updated = [...campuses, customCampus];
    onUpdateCampuses(updated);
    saveStoredCampuses(updated);

    // Reset inputs
    setNewCity('');
    setNewState('');
    setNewVenue('');
    setNewProgrammes('');
  };

  const handleRemoveCampus = (id: string) => {
    const updated = campuses.filter((c) => c.id !== id);
    onUpdateCampuses(updated);
    saveStoredCampuses(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090D14] border border-slate-700/80 rounded-xl shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="text-base font-bold text-white">NFSU Cybersecurity Campus Directory</h3>
              <p className="text-xs text-slate-400">
                Verified against official NFSU CSAS & About Campuses portals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Reference Banner */}
        <div className="mt-3 p-3 bg-sky-950/30 border border-sky-800/40 rounded-lg flex items-start gap-2.5 text-xs text-slate-300">
          <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>
              Only NFSU campuses with confirmed academic cyber security or digital forensics programmes are marked as <strong className="text-emerald-400">Verified</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-sky-400 font-mono">
              <a
                href="https://www.nfsu.ac.in/CSAS"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                School of Cyber Security & Digital Forensics <ExternalLink className="w-3 h-3" />
              </a>
              <span>·</span>
              <a
                href="https://www.nfsu.ac.in/about_campuses"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                NFSU About Campuses <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Campus List Scrollable */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
          {campuses.map((campus) => (
            <div
              key={campus.id}
              className={`p-3 rounded-lg border transition-colors ${
                campus.isVerified
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-amber-950/20 border-amber-800/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{campus.name}</span>
                    {campus.isVerified ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        ✓ Verified Cyber Campus
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        Unverified Custom Campus
                      </span>
                    )}
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Location: {campus.city}, {campus.state} · Default Venue: {campus.defaultVenue}
                  </div>
                  <div className="text-slate-400 text-[10.5px] mt-1 font-mono">
                    <strong className="text-slate-300">Programmes:</strong> {campus.programmeDetails}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 italic">
                    Source: {campus.verificationSource}
                  </div>
                </div>

                {campus.isCustom && (
                  <button
                    onClick={() => handleRemoveCampus(campus.id)}
                    title="Remove custom campus"
                    className="p-1.5 rounded text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Custom Campus Form */}
        <form onSubmit={handleAddCustomCampus} className="mt-4 pt-3 border-t border-slate-800 space-y-2.5">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-sky-400" /> Add Custom Campus (Will be marked "Unverified")
          </div>

          {error && <div className="text-[11px] text-rose-400">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              placeholder="City (e.g. Pune)"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              placeholder="State (e.g. Maharashtra)"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              placeholder="Default Venue (optional)"
              value={newVenue}
              onChange={(e) => setNewVenue(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              placeholder="Cyber Programmes / Notes"
              value={newProgrammes}
              onChange={(e) => setNewProgrammes(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-xs text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Campus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
