import React, { useState } from 'react';
import { 
  PosterContent, 
  CyberCategory, 
  CyberStyle, 
  PosterImageKey, 
  AccentColor, 
  PosterFont,
  CYBER_CATEGORIES_INFO,
  CYBER_STYLES_INFO,
  CYBER_TEMPLATES
} from '../types/poster';
import { CampusInfo } from '../data/campuses';
import { 
  Sliders, 
  Sparkles, 
  Image as ImageIcon, 
  Type, 
  MapPin, 
  Calendar, 
  User, 
  ListChecks, 
  QrCode, 
  Undo, 
  Redo, 
  Upload, 
  Check, 
  ShieldCheck,
  Building2,
  Palette
} from 'lucide-react';

import { QRCodeUtilityPanel } from './QRCodeUtilityPanel';
import { validateImageUrl } from '../utils/imageValidation';
import { IMAGE_KEY_TO_LOCAL_PATH, resolveHeroImageConfig, setImageRole } from '../utils/posterEngine';

interface PosterCustomizerProps {
  content: PosterContent;
  onChange: (updated: PosterContent) => void;
  campuses: CampusInfo[];
  onOpenCampusManager: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenImageLibrary?: () => void;
  onOpenThemesStudio?: () => void;
  onOpenBackgroundStudio?: () => void;
  onOpenAdjustModal?: () => void;
}

export function PosterCustomizer({
  content,
  onChange,
  campuses,
  onOpenCampusManager,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenImageLibrary,
  onOpenThemesStudio,
  onOpenBackgroundStudio,
  onOpenAdjustModal
}: PosterCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'category' | 'campus' | 'content' | 'details' | 'speaker' | 'tracks' | 'qrcode' | 'style'>('category');
  const urlValidation = content.customImageUrl ? validateImageUrl(content.customImageUrl) : null;

  // Helper to patch content
  const updateField = <K extends keyof PosterContent>(field: K, value: PosterContent[K]) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  // Helper for applying preset template
  const handleApplyCategoryTemplate = (cat: CyberCategory) => {
    const template = CYBER_TEMPLATES[cat];
    if (template) {
      // Preserve current campus selection
      onChange({
        ...template,
        campusId: content.campusId
      });
    }
  };

  // Handle custom image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'customImageUrl' | 'customLogoUrl' | 'speakerPhotoUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (target === 'customImageUrl') {
          onChange(setImageRole(content, reader.result, 'hero', { title: file.name }));
        } else {
          updateField(target, reader.result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const selectedCampus = campuses.find((c) => c.id === content.campusId) || campuses[0];

  return (
    <div className="bg-[#090D15]/95 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-4 text-left">
      {/* Top Header with Undo/Redo */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-400" />
          <div>
            <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase block">
              STUDIO CONTROLS
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Cybersecurity Poster Editor
            </h3>
          </div>
        </div>

        {/* Undo / Redo Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo recent edit"
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo recent edit"
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Sub-Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10.5px] font-mono border-b border-slate-800 pb-2.5">
        <button
          onClick={() => setActiveTab('category')}
          className={`py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'category'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <span>1. Event</span>
        </button>

        <button
          onClick={() => setActiveTab('campus')}
          className={`py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'campus'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Building2 className="w-3 h-3 text-emerald-400" />
          <span>2. Campus</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'content'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Type className="w-3 h-3" />
          <span>3. Copy</span>
        </button>

        <button
          onClick={() => setActiveTab('details')}
          className={`py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'details'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Calendar className="w-3 h-3" />
          <span>4. Logistics</span>
        </button>

        <button
          onClick={() => setActiveTab('speaker')}
          className={`py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'speaker'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <User className="w-3 h-3" />
          <span>5. Speaker</span>
        </button>

        <button
          onClick={() => setActiveTab('tracks')}
          className={`py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'tracks'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ListChecks className="w-3 h-3" />
          <span>6. Tracks</span>
        </button>

        <button
          onClick={() => setActiveTab('qrcode')}
          className={`py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'qrcode'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <QrCode className="w-3 h-3 text-sky-400" />
          <span>7. QR Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('style')}
          className={`py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'style'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>8. Style</span>
        </button>
      </div>

      {/* TAB 1: EVENT CATEGORY SELECTION */}
      {activeTab === 'category' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <p className="text-[11px] text-slate-300">
            Select the cybersecurity event category. Each category loads specialized technical copy, track outlines, and design presets:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(Object.keys(CYBER_CATEGORIES_INFO) as CyberCategory[]).map((cat) => {
              const info = CYBER_CATEGORIES_INFO[cat];
              const isSelected = content.category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleApplyCategoryTemplate(cat)}
                  className={`p-2.5 rounded-lg border text-left transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-sky-950/40 border-sky-400 ring-1 ring-sky-400/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span className="text-lg shrink-0 mt-0.5">{info.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{info.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">
                      {info.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CAMPUS SELECTION (CYBERSECURITY CAMPUSES ONLY) */}
      {activeTab === 'campus' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Select NFSU Cybersecurity Campus
              </h4>
              <p className="text-[11px] text-slate-400">
                Only campuses with verified academic cyber programmes or custom additions are listed.
              </p>
            </div>
            <button
              onClick={onOpenCampusManager}
              className="text-[10.5px] font-mono text-sky-400 hover:text-sky-300 underline shrink-0"
            >
              Manage Campuses
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            {campuses.map((campus) => {
              const isSelected = content.campusId === campus.id;
              return (
                <button
                  key={campus.id}
                  onClick={() => {
                    updateField('campusId', campus.id);
                    if (!content.venue || content.venue.includes('NFSU')) {
                      updateField('venue', campus.defaultVenue);
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-sky-950/40 border-sky-400 ring-1 ring-sky-400/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{campus.name}</span>
                    {campus.isVerified ? (
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded border border-emerald-500/30">
                        ✓ Verified
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1 rounded border border-amber-500/30">
                        Unverified
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {campus.city}, {campus.state}
                  </div>
                  <div className="text-[9.5px] text-slate-300 mt-1 truncate font-mono">
                    {campus.programmeDetails}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Campus Information Card */}
          {selectedCampus && (
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-slate-400">ACTIVE CHAPTER VENUE:</span>
                <span className="text-sky-300">{selectedCampus.defaultVenue}</span>
              </div>
              <div className="text-[10.5px] text-slate-400">
                <strong className="text-slate-200">Verified Programmes:</strong> {selectedCampus.confirmedProgrammes.join(' · ')}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONTENT & COPY */}
      {activeTab === 'content' && (
        <div className="space-y-3 animate-in fade-in duration-200 text-xs">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Event Title (Headline)
            </label>
            <input
              type="text"
              value={content.headline}
              onChange={(e) => updateField('headline', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-bold text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Event Subtitle
            </label>
            <input
              type="text"
              value={content.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Category Kicker Tag
            </label>
            <input
              type="text"
              value={content.kicker}
              onChange={(e) => updateField('kicker', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Founding Philosophy / Quote
            </label>
            <input
              type="text"
              value={content.foundingManifesto}
              onChange={(e) => updateField('foundingManifesto', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs font-serif italic focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Operational Cycle Tagline (Verbs separated by dots)
            </label>
            <input
              type="text"
              value={content.cycleTagline}
              onChange={(e) => updateField('cycleTagline', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Primary Call to Action
              </label>
              <input
                type="text"
                value={content.ctaText}
                onChange={(e) => updateField('ctaText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Secondary Call to Action
              </label>
              <input
                type="text"
                value={content.subCtaText}
                onChange={(e) => updateField('subCtaText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EVENT LOGISTICS & REGISTRATION */}
      {activeTab === 'details' && (
        <div className="space-y-3 animate-in fade-in duration-200 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Event Date
              </label>
              <input
                type="text"
                value={content.date}
                onChange={(e) => updateField('date', e.target.value)}
                placeholder="e.g. OCTOBER 24–26, 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Event Time / Duration
              </label>
              <input
                type="text"
                value={content.time}
                onChange={(e) => updateField('time', e.target.value)}
                placeholder="e.g. 10:00 – 17:00 IST"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Venue (Campus Location / Lab)
            </label>
            <input
              type="text"
              value={content.venue}
              onChange={(e) => updateField('venue', e.target.value)}
              placeholder="e.g. Cyber Defense Lab, NFSU Gandhinagar"
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Registration Link (Optional)
              </label>
              <input
                type="text"
                value={content.registrationLink || ''}
                onChange={(e) => updateField('registrationLink', e.target.value)}
                placeholder="e.g. https://gdg.community.dev/..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Registration Deadline (Optional)
              </label>
              <input
                type="text"
                value={content.registrationDeadline || ''}
                onChange={(e) => updateField('registrationDeadline', e.target.value)}
                placeholder="e.g. Oct 20 · 23:59 IST"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Contact Details (Optional)
              </label>
              <input
                type="text"
                value={content.contactDetails || ''}
                onChange={(e) => updateField('contactDetails', e.target.value)}
                placeholder="e.g. cyber@nfsu.ac.in"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Social Handle / Tag (Optional)
              </label>
              <input
                type="text"
                value={content.socialHandle || ''}
                onChange={(e) => updateField('socialHandle', e.target.value)}
                placeholder="e.g. #GDGonNFSU · @gdgnfsu"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              QR Code Destination URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={content.qrDestination || ''}
                onChange={(e) => updateField('qrDestination', e.target.value)}
                placeholder="e.g. https://gdg.community.dev/events/..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500 font-mono"
              />
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={content.showQrCode}
                  onChange={(e) => updateField('showQrCode', e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900"
                />
                <span>Render QR</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KEYNOTE SPEAKER DETAILS */}
      {activeTab === 'speaker' && (
        <div className="space-y-3 animate-in fade-in duration-200 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white">Speaker Highlight Card</span>
            <label className="flex items-center gap-1.5 text-xs text-sky-400 cursor-pointer">
              <input
                type="checkbox"
                checked={content.showSpeaker}
                onChange={(e) => updateField('showSpeaker', e.target.checked)}
                className="rounded border-slate-700 bg-slate-900"
              />
              <span>Display Speaker on Poster</span>
            </label>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Speaker Name
            </label>
            <input
              type="text"
              value={content.speakerName || ''}
              onChange={(e) => updateField('speakerName', e.target.value)}
              placeholder="e.g. Dr. Vikramaditya Rawat"
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Speaker Title / Designation
            </label>
            <input
              type="text"
              value={content.speakerDesignation || ''}
              onChange={(e) => updateField('speakerDesignation', e.target.value)}
              placeholder="e.g. Chief Cyber Intelligence Advisor & Ex-CERT Researcher"
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Speaker Avatar / Photo (Upload)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                id="speaker-photo-upload"
                onChange={(e) => handleImageUpload(e, 'speakerPhotoUrl')}
                className="hidden"
              />
              <label
                htmlFor="speaker-photo-upload"
                className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sky-400 hover:text-sky-300 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Speaker Image
              </label>
              {content.speakerPhotoUrl && (
                <button
                  onClick={() => updateField('speakerPhotoUrl', undefined)}
                  className="text-rose-400 hover:underline text-[11px]"
                >
                  Clear Photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TRACKS & MODULES */}
      {activeTab === 'tracks' && (
        <div className="space-y-3 animate-in fade-in duration-200 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white">4 Technical Tracks / Modules</span>
            <label className="flex items-center gap-1.5 text-xs text-sky-400 cursor-pointer">
              <input
                type="checkbox"
                checked={content.showTracks}
                onChange={(e) => updateField('showTracks', e.target.checked)}
                className="rounded border-slate-700 bg-slate-900"
              />
              <span>Display Tracks</span>
            </label>
          </div>

          <div className="space-y-2">
            {content.tracks.map((track, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400">
                    Track 0{idx + 1} Title
                  </label>
                  <input
                    type="text"
                    value={track.title}
                    onChange={(e) => {
                      const updated = [...content.tracks];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      updateField('tracks', updated);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400">
                    Track 0{idx + 1} Description
                  </label>
                  <input
                    type="text"
                    value={track.desc}
                    onChange={(e) => {
                      const updated = [...content.tracks];
                      updated[idx] = { ...updated[idx], desc: e.target.value };
                      updateField('tracks', updated);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: QR CODE ENGINE UTILITY */}
      {activeTab === 'qrcode' && (
        <div className="animate-in fade-in duration-200">
          <QRCodeUtilityPanel content={content} onChange={onChange} />
        </div>
      )}

      {/* TAB 8: STYLES, ARTWORK & BRANDING */}
      {activeTab === 'style' && (
        <div className="space-y-4 animate-in fade-in duration-200 text-xs">
          {/* Creative Visual Style & 32-Theme Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-mono text-slate-400 uppercase">
                Creative Visual Style
              </label>
              {onOpenThemesStudio && (
                <button
                  type="button"
                  onClick={onOpenThemesStudio}
                  className="text-[11px] font-mono text-sky-400 hover:text-sky-300 underline"
                >
                  Browse All 32 Themes →
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(CYBER_STYLES_INFO) as CyberStyle[]).map((st) => {
                const info = CYBER_STYLES_INFO[st];
                const isSelected = content.style === st;
                return (
                  <button
                    key={st}
                    onClick={() => updateField('style', st)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-sky-950/40 border-sky-400 ring-1 ring-sky-400/30'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{info.label}</span>
                      <span className="text-[9px] font-mono text-sky-400">{info.tag}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                      {info.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color Selection */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
              Accent Color
            </label>
            <div className="flex flex-wrap gap-2">
              {(['blue', 'green', 'amber', 'red', 'purple', 'titanium'] as AccentColor[]).map((col) => (
                <button
                  key={col}
                  onClick={() => updateField('accentColor', col)}
                  className={`px-3 py-1 rounded text-xs font-mono uppercase transition-colors flex items-center gap-1.5 ${
                    content.accentColor === col
                      ? 'bg-slate-800 text-white border border-sky-400 font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    col === 'blue' ? 'bg-sky-400' :
                    col === 'green' ? 'bg-emerald-400' :
                    col === 'amber' ? 'bg-amber-400' :
                    col === 'red' ? 'bg-rose-400' :
                    col === 'purple' ? 'bg-purple-400' : 'bg-slate-200'
                  }`} />
                  <span>{col}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Family & Text Alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Headline Typography
              </label>
              <select
                value={content.fontFamily}
                onChange={(e) => updateField('fontFamily', e.target.value as PosterFont)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-sky-500 font-mono"
              >
                <option value="Syne">Syne (Geometric Modern)</option>
                <option value="Bricolage Grotesque">Bricolage Grotesque (High Impact)</option>
                <option value="JetBrains Mono">JetBrains Mono (Developer CLI)</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans (Clean Tech)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Text Alignment
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateField('textAlign', 'left')}
                  className={`flex-1 py-1.5 rounded text-xs font-mono transition-colors ${
                    content.textAlign === 'left'
                      ? 'bg-sky-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  Left Align
                </button>
                <button
                  onClick={() => updateField('textAlign', 'center')}
                  className={`flex-1 py-1.5 rounded text-xs font-mono transition-colors ${
                    content.textAlign === 'center'
                      ? 'bg-sky-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  Center Align
                </button>
              </div>
            </div>
          </div>

          {/* Central Artwork Background Selection */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
              Central Visual Metaphor / Photography
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'forensics', label: 'Cyber Silicon / Forensics' },
                { id: 'campus_night', label: 'NFSU Portico (Night)' },
                { id: 'campus_day', label: 'NFSU Promenade (Day)' },
                { id: 'campus_aerial', label: 'NFSU Aerial Drone' },
                { id: 'monolith', label: 'Monolith Column' },
                { id: 'obsidian', label: 'Tactile Prism' },
                { id: 'waveform', label: 'Abstract Telemetry Wave' }
              ].map((img) => (
                <button
                  key={img.id}
                  onClick={() => {
                    const key = img.id as Exclude<PosterImageKey, 'custom'>;
                    const localPath = IMAGE_KEY_TO_LOCAL_PATH[key];
                    const curHero = resolveHeroImageConfig(content);
                    onChange({
                      ...content,
                      imageKey: key,
                      customImageUrl: undefined,
                      heroImage: {
                        ...curHero,
                        enabled: true,
                        imageKey: key,
                        src: localPath
                      }
                    });
                  }}
                  className={`p-2 rounded text-left border text-[11px] transition-colors ${
                    content.imageKey === img.id && !content.customImageUrl
                      ? 'bg-sky-950 border-sky-400 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>

            {/* Image Studio Quick Actions */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {onOpenImageLibrary && (
                <button
                  type="button"
                  onClick={onOpenImageLibrary}
                  className="px-3 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Browse 100+ Library
                </button>
              )}
              {onOpenAdjustModal && (
                <button
                  type="button"
                  onClick={onOpenAdjustModal}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Crop, Zoom & Filter
                </button>
              )}
              {onOpenBackgroundStudio && (
                <button
                  type="button"
                  onClick={onOpenBackgroundStudio}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                >
                  <Palette className="w-3.5 h-3.5 text-cyan-400" /> Background Studio
                </button>
              )}
            </div>

            {/* Custom Photo Upload & Direct URL Input */}
            <div className="mt-2.5 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="file"
                  accept="image/*"
                  id="poster-bg-upload"
                  onChange={(e) => handleImageUpload(e, 'customImageUrl')}
                  className="hidden"
                />
                <label
                  htmlFor="poster-bg-upload"
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sky-400 hover:text-sky-300 cursor-pointer flex items-center gap-1.5 transition-colors text-xs"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload Custom Image
                </label>
                {content.customImageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const curHero = resolveHeroImageConfig(content);
                      onChange({
                        ...content,
                        imageKey: 'forensics',
                        customImageUrl: undefined,
                        heroImage: {
                          ...curHero,
                          imageKey: 'forensics',
                          src: IMAGE_KEY_TO_LOCAL_PATH.forensics
                        }
                      });
                    }}
                    className="text-rose-400 hover:underline text-[11px] font-mono"
                  >
                    Clear Custom Image
                  </button>
                )}
              </div>

              <div>
                <label htmlFor="custom-image-url-input" className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                  Direct Image URL (HTTPS or /assets/)
                </label>
                <input
                  id="custom-image-url-input"
                  type="url"
                  value={content.customImageUrl || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      const curHero = resolveHeroImageConfig(content);
                      onChange({
                        ...content,
                        imageKey: 'forensics',
                        customImageUrl: undefined,
                        heroImage: {
                          ...curHero,
                          imageKey: 'forensics',
                          src: IMAGE_KEY_TO_LOCAL_PATH.forensics
                        }
                      });
                    } else {
                      const curHero = resolveHeroImageConfig(content);
                      onChange({
                        ...content,
                        imageKey: 'custom',
                        customImageUrl: val,
                        heroImage: {
                          ...curHero,
                          enabled: true,
                          imageKey: 'custom',
                          src: val
                        }
                      });
                    }
                  }}
                  placeholder="https://... or /assets/aistudio/OIP_72f641f4.webp"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                />
                {urlValidation && !urlValidation.valid && (
                  <p className="text-[10px] font-mono text-rose-400 mt-1">
                    {urlValidation.reason}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Custom Logo Upload */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Custom Chapter / Sponsor Logo Upload
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                id="custom-logo-upload"
                onChange={(e) => handleImageUpload(e, 'customLogoUrl')}
                className="hidden"
              />
              <label
                htmlFor="custom-logo-upload"
                className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sky-400 hover:text-sky-300 cursor-pointer flex items-center gap-1.5 transition-colors text-xs"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Custom Logo
              </label>
              {content.customLogoUrl && (
                <button
                  onClick={() => updateField('customLogoUrl', undefined)}
                  className="text-rose-400 hover:underline text-[11px]"
                >
                  Clear Custom Logo
                </button>
              )}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-300">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={content.showCropMarks}
                onChange={(e) => updateField('showCropMarks', e.target.checked)}
                className="rounded border-slate-700 bg-slate-900"
              />
              <span>Swiss Crop Marks</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={content.showFilmGrain}
                onChange={(e) => updateField('showFilmGrain', e.target.checked)}
                className="rounded border-slate-700 bg-slate-900"
              />
              <span>35mm Film Grain</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
