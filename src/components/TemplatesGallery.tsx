import React, { useState } from 'react';
import {
  PosterContent,
  CyberCategory,
  CyberStyle,
  CYBER_CATEGORIES_INFO,
  CYBER_STYLES_INFO,
  CYBER_TEMPLATES
} from '../types/poster';
import { PosterCanvas } from './PosterCanvas';
import { Sparkles, ArrowRight, Search, Heart, Copy } from 'lucide-react';
import { CampusInfo } from '../data/campuses';

interface TemplatesGalleryProps {
  onSelectTemplate: (template: PosterContent) => void;
  onDuplicateTemplate?: (template: PosterContent, customName: string) => void;
  campuses: CampusInfo[];
}

export function TemplatesGallery({
  onSelectTemplate,
  onDuplicateTemplate,
  campuses
}: TemplatesGalleryProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('gdgoc_nfsu_fav_templates_v1') || '[]');
    } catch {
      return [];
    }
  });

  const toggleFav = (cat: string) => {
    setFavoriteCategories((prev) => {
      const next = prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat];
      localStorage.setItem('gdgoc_nfsu_fav_templates_v1', JSON.stringify(next));
      return next;
    });
  };

  const templatesList: PosterContent[] = Object.values(CYBER_TEMPLATES);

  const filteredTemplates = templatesList.filter((tpl) => {
    if (favoritesOnly && !favoriteCategories.includes(tpl.category)) return false;
    if (filterCategory !== 'all' && tpl.category !== filterCategory) return false;
    if (filterStyle !== 'all' && tpl.style !== filterStyle) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchHeadline = tpl.headline.toLowerCase().includes(q);
      const matchKicker = tpl.kicker.toLowerCase().includes(q);
      const matchDesc = tpl.description.toLowerCase().includes(q);
      const matchCategory = CYBER_CATEGORIES_INFO[tpl.category]?.label.toLowerCase().includes(q);
      const matchTracks = tpl.tracks?.some((t) => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
      if (!matchHeadline && !matchKicker && !matchDesc && !matchCategory && !matchTracks) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="p-4 sm:p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Curated Cybersecurity Poster Templates ({templatesList.length})
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              12+ distinct architectural layouts tailored for GDG on Campus NFSU with specialized typography and tracks.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFavoritesOnly((v) => !v)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 ${
              favoritesOnly
                ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-rose-400' : ''}`} />
            <span>Favorites ({favoriteCategories.length})</span>
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates by keyword (e.g. CTF, Rust, Zero-Day, Keynote, Recruitment)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0">Category:</span>
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono shrink-0 transition-colors ${
                filterCategory === 'all'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              All Events
            </button>
            {(Object.keys(CYBER_CATEGORIES_INFO) as CyberCategory[]).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono shrink-0 transition-colors ${
                  filterCategory === cat
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {CYBER_CATEGORIES_INFO[cat].label.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Style:</span>
            <select
              aria-label="Filter templates by style"
              value={filterStyle}
              onChange={(e) => setFilterStyle(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-white text-xs font-mono focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Visual Styles</option>
              {(Object.keys(CYBER_STYLES_INFO) as CyberStyle[]).map((st) => (
                <option key={st} value={st}>
                  {CYBER_STYLES_INFO[st].label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const catInfo = CYBER_CATEGORIES_INFO[template.category];
          const styleInfo = CYBER_STYLES_INFO[template.style];
          const isFav = favoriteCategories.includes(template.category);

          return (
            <div
              key={template.category}
              className="bg-[#090D15] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between space-y-3 group hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-base">{catInfo.icon}</span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-xs truncate">{catInfo.label}</h4>
                    <span className="text-[9.5px] font-mono text-sky-400 block truncate">
                      {styleInfo.label}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    aria-label={isFav ? `Unfavorite ${catInfo.label}` : `Favorite ${catInfo.label}`}
                    onClick={() => toggleFav(template.category)}
                    className={`p-1 rounded border ${
                      isFav
                        ? 'bg-rose-500/20 border-rose-400/50 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-400' : ''}`} />
                  </button>
                  <span className="text-[9px] font-mono text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded">
                    {styleInfo.tag}
                  </span>
                </div>
              </div>

              <div className="w-full flex items-center justify-center overflow-hidden py-1">
                <div className="w-full transform scale-90 sm:scale-95 origin-top transition-transform group-hover:scale-100 duration-200">
                  <PosterCanvas content={template} format="4:5" campuses={campuses} />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onSelectTemplate(template)}
                  className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {onDuplicateTemplate && (
                  <button
                    type="button"
                    onClick={() => onDuplicateTemplate(template, `${catInfo.label} Draft`)}
                    title="Duplicate template as saved project"
                    aria-label={`Duplicate ${catInfo.label}`}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
