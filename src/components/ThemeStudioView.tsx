import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Check, 
  Layers, 
  Sliders, 
  Shield, 
  Flame, 
  Zap, 
  Terminal, 
  Globe
} from 'lucide-react';
import { POSTER_THEMES, THEME_GROUPS, PosterThemeDefinition, ThemeGroup } from '../data/themesData';
import { PosterContent } from '../types/poster';

interface ThemeStudioViewProps {
  currentThemeId?: string;
  onApplyTheme: (theme: PosterThemeDefinition) => void;
  onOpenStudio?: () => void;
}

export function ThemeStudioView({
  currentThemeId = 'cyberpunk_neon',
  onApplyTheme,
  onOpenStudio
}: ThemeStudioViewProps) {
  const [selectedGroup, setSelectedGroup] = useState<ThemeGroup | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThemes = useMemo(() => {
    return POSTER_THEMES.filter((theme) => {
      if (selectedGroup !== 'all' && theme.group !== selectedGroup) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = theme.name.toLowerCase().includes(query);
        const matchesTagline = theme.tagline.toLowerCase().includes(query);
        const matchesGroup = theme.groupLabel.toLowerCase().includes(query);
        return matchesName || matchesTagline || matchesGroup;
      }
      return true;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Header Card */}
      <div className="rounded-xl border border-sky-500/30 bg-[#070B16] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" /> 32 Verified Design Themes
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Cybersecurity & Contemporary Editorial Themes
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Each theme introduces a distinct architectural layout, curated typography combinations, tailored telemetry badges, and calibrated contrast palettes.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
              Active: <strong className="text-white capitalize">{currentThemeId.replace(/_/g, ' ')}</strong>
            </span>
            {onOpenStudio && (
              <button
                type="button"
                onClick={onOpenStudio}
                className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black transition-colors"
              >
                Preview on Canvas →
              </button>
            )}
          </div>
        </div>

        {/* Search & Theme Group Filters */}
        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search themes by name or style (e.g. Matrix, Swiss, Zero Trust, Hackathon, Glitch)..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-[#040711] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
            />
          </div>

          {/* Group Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`px-3 py-2 rounded-lg text-xs font-mono shrink-0 transition-colors ${
                selectedGroup === 'all'
                  ? 'bg-cyan-500 text-black font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              All (32)
            </button>
            {THEME_GROUPS.map((g) => {
              const isSelected = selectedGroup === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroup(g.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-mono shrink-0 transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-black font-bold shadow'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  <span>{g.icon}</span>
                  <span>{g.label}</span>
                  <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'}`}>
                    {g.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredThemes.map((theme) => {
          const isCurrent = currentThemeId === theme.id;

          return (
            <div
              key={theme.id}
              onClick={() => onApplyTheme(theme)}
              className={`group relative rounded-xl border p-4 cursor-pointer transition-all flex flex-col justify-between overflow-hidden bg-[#0A1022] hover:shadow-2xl ${
                isCurrent
                  ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400'
                  : 'border-white/10 hover:border-sky-500/40 hover:bg-[#0D152D]'
              }`}
            >
              {/* Top Accent Gradient Bar */}
              <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${theme.previewGradient} mb-3`} />

              <div className="space-y-3">
                {/* Theme Group and Active Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                    {theme.groupLabel}
                  </span>
                  {isCurrent && (
                    <span className="flex items-center gap-1 bg-cyan-400 text-black text-[9px] font-mono font-black px-1.5 py-0.5 rounded uppercase">
                      <Check className="w-2.5 h-2.5" /> Active
                    </span>
                  )}
                </div>

                {/* Theme Name */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {theme.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                    {theme.tagline}
                  </p>
                </div>

                {/* Mini Visual Specimen Preview */}
                <div className={`p-2.5 rounded-lg border ${theme.palette.border} ${theme.palette.bg} space-y-1.5`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-mono px-1 py-0.5 rounded ${theme.decorative.badgeStyle}`}>
                      {theme.decorative.kickerPrefix || 'SPECIMEN //'}
                    </span>
                    <span className="text-[8px] font-mono text-slate-400">
                      {theme.typography.fontFamily}
                    </span>
                  </div>
                  <div className={`text-xs font-bold leading-tight ${theme.palette.text} ${theme.typography.isUppercase ? 'uppercase' : ''}`}>
                    {theme.name}
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.palette.accentHex }} />
                    <span style={{ color: theme.palette.accentHex }}>{theme.palette.accentHex}</span>
                    <span className="text-slate-500">·</span>
                    <span>{theme.cyberStyle}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {theme.decorative.pattern !== 'none' ? `${theme.decorative.pattern}` : 'minimal solid'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onApplyTheme(theme);
                  }}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                    isCurrent
                      ? 'bg-cyan-400 text-black'
                      : 'bg-white/10 text-white hover:bg-sky-500 hover:text-black'
                  }`}
                >
                  {isCurrent ? 'Applied' : 'Apply Theme'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
