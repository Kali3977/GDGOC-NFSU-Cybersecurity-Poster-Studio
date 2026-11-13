import React from 'react';
import {
  Plus,
  Grid,
  Building2,
  Image as ImageIcon,
  FolderHeart,
  ShieldCheck,
  Paintbrush,
  Type,
  Sparkles,
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';
import { PosterContent, PosterFormat, PosterProject, CYBER_CATEGORIES_INFO } from '../types/poster';
import { CampusInfo } from '../data/campuses';
import { PosterCanvas } from './PosterCanvas';
import { StudioView } from './SidebarNav';
import { IMAGE_LIBRARY } from '../data/imageLibrary';
import { resolveBackgroundConfig, resolveHeroImageConfig } from '../utils/posterEngine';

export interface RecentImageEntry {
  url: string;
  title: string;
  usedAt: number;
}

interface DashboardViewProps {
  content: PosterContent;
  format: PosterFormat;
  currentCampus: CampusInfo;
  campuses: CampusInfo[];
  projects: PosterProject[];
  recentImages: RecentImageEntry[];
  preflightIssueCount: number;
  onNavigate: (view: StudioView) => void;
  onCreateNewPoster: () => void;
  onOpenProject: (content: PosterContent) => void;
  onApplyRecentImageRole: (url: string, role: 'hero' | 'background' | 'decoration', title?: string) => void;
  onOpenCampusManager: () => void;
}

export function DashboardView({
  content,
  format,
  currentCampus,
  campuses,
  projects,
  recentImages,
  preflightIssueCount,
  onNavigate,
  onCreateNewPoster,
  onOpenProject,
  onApplyRecentImageRole,
  onOpenCampusManager
}: DashboardViewProps) {
  const verifiedCampuses = campuses.filter((c) => c.isVerified);
  const bg = resolveBackgroundConfig(content);
  const hero = resolveHeroImageConfig(content);

  return (
    <div className="space-y-8 text-left animate-in fade-in">
      {/* Hero Command Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 space-y-5">
          <div className="rounded-xl border border-slate-800 bg-[#070B16] p-6 shadow-xl space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 block">
                  GDG on Campus · National Forensic Sciences University
                </span>
                <h2 className="text-2xl font-black text-white tracking-tight font-display">
                  Cybersecurity Poster Studio
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Multi-layer architectural studio with independent Background, Hero Visual, Typography (English + Hindi), Decorative Vector, and Export pipelines.
                </p>
              </div>
              <button
                type="button"
                onClick={onCreateNewPoster}
                className="px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs font-mono transition-colors flex items-center gap-2 shadow-lg shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create Poster</span>
              </button>
            </div>

            {/* Key Studio Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={onOpenCampusManager}
                className="p-3 rounded-lg bg-[#040711] border border-slate-800 hover:border-sky-500/40 text-left transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono uppercase">Verified Campuses</span>
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-lg font-black text-white font-mono">{verifiedCampuses.length}</span>
                <span className="text-[10px] text-slate-400 block truncate">NFSU Cyber Wings</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('images')}
                className="p-3 rounded-lg bg-[#040711] border border-slate-800 hover:border-sky-500/40 text-left transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono uppercase">Media Library</span>
                  <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <span className="text-lg font-black text-white font-mono">{IMAGE_LIBRARY.length}+</span>
                <span className="text-[10px] text-slate-400 block truncate">10 Verified Topics</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="p-3 rounded-lg bg-[#040711] border border-slate-800 hover:border-sky-500/40 text-left transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono uppercase">Saved Projects</span>
                  <FolderHeart className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-lg font-black text-white font-mono">{projects.length}</span>
                <span className="text-[10px] text-slate-400 block truncate">Browser LocalStorage</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('preflight')}
                className="p-3 rounded-lg bg-[#040711] border border-slate-800 hover:border-sky-500/40 text-left transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono uppercase">Quality Audit</span>
                  <ShieldCheck
                    className={`w-3.5 h-3.5 ${
                      preflightIssueCount > 0 ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  />
                </div>
                <span className="text-lg font-black text-white font-mono">{preflightIssueCount}</span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {preflightIssueCount === 0 ? 'Export Ready' : 'Open Advisories'}
                </span>
              </button>
            </div>

            {/* Quick Start Studios */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Studio Workbenches
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => onNavigate('templates')}
                  className="p-3 rounded-lg bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-left transition-colors group"
                >
                  <Grid className="w-4 h-4 text-sky-400 mb-1.5" />
                  <span className="text-xs font-bold text-white block group-hover:text-sky-300">
                    12 Event Templates
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    CTF, Workshops, Talks, Hackathon
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('backgrounds')}
                  className="p-3 rounded-lg bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-left transition-colors group"
                >
                  <Paintbrush className="w-4 h-4 text-cyan-400 mb-1.5" />
                  <span className="text-xs font-bold text-white block group-hover:text-cyan-300">
                    Background Studio
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Transparent, Solids, 32 Presets
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('campaigns')}
                  className="p-3 rounded-lg bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-left transition-colors group"
                >
                  <Building2 className="w-4 h-4 text-emerald-400 mb-1.5" />
                  <span className="text-xs font-bold text-white block group-hover:text-emerald-300">
                    Campus Campaigns
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Multi-campus synchronized batch
                  </span>
                </button>
              </div>
            </div>

            {/* Active Layer Stack Telemetry */}
            <div className="p-3.5 rounded-lg bg-[#040711] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-3 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  BG: <strong className="text-white uppercase">{bg.mode}</strong>
                </span>
                <span className="text-slate-600">|</span>
                <span>
                  Hero: <strong className="text-white">{hero.enabled ? 'Active' : 'Hidden'}</strong>
                </span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-cyan-400" />
                  <strong className="text-white">{content.fontFamily}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('studio')}
                className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1"
              >
                <span>Open Active Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Recently Used Images Strip */}
          {recentImages.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-[#070B16] p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-200 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  Recently Used Visual Assets ({recentImages.length})
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate('images')}
                  className="text-[11px] font-mono text-sky-400 hover:text-sky-300"
                >
                  Open Full Library →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {recentImages.slice(0, 4).map((item) => (
                  <div
                    key={item.url}
                    className="rounded-lg border border-slate-800 bg-[#040711] overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[16/10] bg-black/50 overflow-hidden">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 space-y-1.5">
                      <p className="text-[10px] font-bold text-white truncate">{item.title}</p>
                      <div className="grid grid-cols-2 gap-1 text-[9px] font-mono">
                        <button
                          type="button"
                          onClick={() => onApplyRecentImageRole(item.url, 'hero', item.title)}
                          className="py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/30"
                        >
                          Hero
                        </button>
                        <button
                          type="button"
                          onClick={() => onApplyRecentImageRole(item.url, 'background', item.title)}
                          className="py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                        >
                          Bg
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Active Poster Card */}
        <div className="xl:col-span-5 rounded-xl border border-slate-800 bg-[#070B16] p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase block">
                ACTIVE WORKSPACE CANVAS
              </span>
              <h3 className="text-sm font-bold text-white truncate max-w-[260px]">
                {content.headline}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('studio')}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-bold transition-colors"
            >
              Edit Poster
            </button>
          </div>

          <div className="max-w-[340px] mx-auto">
            <PosterCanvas content={content} format={format} currentCampus={currentCampus} campuses={campuses} />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <span>{CYBER_CATEGORIES_INFO[content.category]?.label || content.category}</span>
            <span>{currentCampus.city} · {format.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Recent Saved Projects */}
      <div className="rounded-xl border border-slate-800 bg-[#070B16] p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white uppercase font-mono">
              Recent Poster Projects ({projects.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono text-sky-400 hover:text-sky-300"
          >
            Manage All Projects →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="rounded-lg border border-slate-800 bg-[#040711] p-4 flex flex-col justify-between gap-3 hover:border-sky-500/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="uppercase text-sky-400">{proj.content.category}</span>
                  <span>{new Date(proj.lastEdited).toLocaleDateString()}</span>
                </div>
                <h4 className="text-sm font-bold text-white truncate">{proj.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{proj.content.headline}</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenProject(proj.content)}
                className="w-full py-2 rounded bg-slate-900 hover:bg-sky-600 text-slate-200 hover:text-white border border-slate-800 text-xs font-mono font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open in Poster Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
