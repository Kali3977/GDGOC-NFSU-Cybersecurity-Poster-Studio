import React, { useState, useRef, useEffect } from 'react';
import { PosterCanvas } from './components/PosterCanvas';
import { MockupView } from './components/MockupView';
import { ComparisonModal } from './components/ComparisonModal';
import { ExportPanel } from './components/ExportPanel';
import { PosterCustomizer } from './components/PosterCustomizer';
import { AICampaignGenerator } from './components/AICampaignGenerator';
import { MultiCampusCampaignView } from './components/MultiCampusCampaignView';
import { TemplatesGallery } from './components/TemplatesGallery';
import { ProjectGalleryView } from './components/ProjectGalleryView';
import { AssetLibraryView } from './components/AssetLibraryView';
import { CampusManagerModal } from './components/CampusManagerModal';
import { SidebarNav, StudioView } from './components/SidebarNav';
import { InteractiveCanvasEditor } from './components/InteractiveCanvasEditor';
import { PreflightAuditPanel } from './components/PreflightAuditPanel';
import { ImageLibraryView } from './components/ImageLibraryView';
import { ThemeStudioView } from './components/ThemeStudioView';
import { BackgroundStudio } from './components/BackgroundStudio';
import { ImageAdjustModal } from './components/ImageAdjustModal';
import { DashboardView, RecentImageEntry } from './components/DashboardView';
import { TypographyStudio } from './components/TypographyStudio';
import { ElementsStudio } from './components/ElementsStudio';
import { HeroImageStudio } from './components/HeroImageStudio';
import { SettingsView } from './components/SettingsView';
import { ImageAsset } from './data/imageLibrary';
import { PosterThemeDefinition } from './data/themesData';
import { loadStoredCustomFonts, registerCustomFontFace } from './data/fonts';
import { GDGBrackets, NFSUUniversityMark } from './components/OfficialLogos';
import {
  PosterFormat,
  PosterContent,
  PosterProject,
  BrandKit,
  ExportHistoryItem,
  StudioSettings,
  DEFAULT_POSTER,
  CYBER_TEMPLATES
} from './types/poster';
import {
  CampusInfo,
  getStoredCampuses,
  saveStoredCampuses
} from './data/campuses';
import {
  applyThemeNonDestructive,
  resolveHeroImageConfig,
  runPreflightChecks,
  setImageRole
} from './utils/posterEngine';
import {
  Sliders,
  Eye,
  ShieldCheck,
  Sparkles,
  Layers,
  Building2,
  Download,
  Type,
  Image as ImageIcon,
  Shapes,
  Palette
} from 'lucide-react';

const STORAGE_ACTIVE_POSTER = 'gdgoc_nfsu_active_poster_v1';
const STORAGE_BRAND_KIT = 'gdgoc_nfsu_brand_kit_v1';
const STORAGE_RECENT_IMAGES = 'gdgoc_nfsu_recent_images_v1';
const STORAGE_STUDIO_SETTINGS = 'gdgoc_nfsu_studio_settings_v1';

const DEFAULT_BRAND_KIT: BrandKit = {
  primaryColor: '#060911',
  secondaryColor: '#0E1626',
  accentColor: 'blue',
  headingFont: 'Syne',
  bodyFont: 'Plus Jakarta Sans',
  socialHandle: '#GDGonNFSU · @gdgnfsu',
  hashtag: '#GDGonNFSU',
  organizerName: 'Google Developer Groups on Campus · NFSU Gandhinagar'
};

const DEFAULT_STUDIO_SETTINGS: StudioSettings = {
  units: 'percent',
  defaultGridSnap: true,
  defaultSafeMargins: true,
  defaultJpegFallbackColor: '#050814',
  preferredHindiFont: 'Noto Sans Devanagari'
};

type CreatePosterSubTab =
  | 'editor'
  | 'layers'
  | 'typography'
  | 'hero'
  | 'elements'
  | 'themes'
  | 'ai';

export default function App() {
  // Campuses state with verified default data
  const [campuses, setCampuses] = useState<CampusInfo[]>(() => getStoredCampuses());
  const [isCampusManagerOpen, setIsCampusManagerOpen] = useState(false);

  // Content state with localStorage restore + undo/redo history
  const [content, setContent] = useState<PosterContent>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_ACTIVE_POSTER);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.headline) {
          return parsed as PosterContent;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_POSTER;
  });
  const [history, setHistory] = useState<PosterContent[]>(() => [content]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Studio configuration
  const [format, setFormat] = useState<PosterFormat>('4:5');
  const [mockupMode, setMockupMode] = useState<'studio' | 'gallery' | 'street' | 'instagram'>('studio');
  const [activeStudioTab, setActiveStudioTab] = useState<CreatePosterSubTab>('editor');
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState<boolean>(false);

  // Navigation views (supports all 11 primary routes cleanly)
  const [activeView, setActiveView] = useState<StudioView>('dashboard');

  // Studio settings with persistence
  const [studioSettings, setStudioSettings] = useState<StudioSettings>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_STUDIO_SETTINGS);
      if (raw) {
        return { ...DEFAULT_STUDIO_SETTINGS, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STUDIO_SETTINGS;
  });

  // Brand Kit state with persistence
  const [brandKit, setBrandKit] = useState<BrandKit>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BRAND_KIT);
      if (raw) {
        return { ...DEFAULT_BRAND_KIT, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_BRAND_KIT;
  });

  // Recently used images log with persistence
  const [recentImages, setRecentImages] = useState<RecentImageEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_RECENT_IMAGES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Register custom uploaded fonts on mount so saved designs render immediately
  useEffect(() => {
    const customFonts = loadStoredCustomFonts();
    customFonts.forEach((cf) => {
      registerCustomFontFace(cf).catch(() => null);
    });
  }, []);

  // Persist active poster safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ACTIVE_POSTER, JSON.stringify(content));
    } catch (e) {
      console.error(e);
    }
  }, [content]);

  const handleUpdateBrandKit = (updatedKit: BrandKit) => {
    setBrandKit(updatedKit);
    try {
      localStorage.setItem(STORAGE_BRAND_KIT, JSON.stringify(updatedKit));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStudioSettings = (next: StudioSettings) => {
    setStudioSettings(next);
    try {
      localStorage.setItem(STORAGE_STUDIO_SETTINGS, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const pushRecentImage = (url: string, title?: string) => {
    if (!url || !url.trim()) return;
    setRecentImages((prev) => {
      const filtered = prev.filter((item) => item.url !== url);
      const next: RecentImageEntry[] = [
        {
          url,
          title: title || 'Custom Visual Asset',
          usedAt: Date.now()
        },
        ...filtered
      ].slice(0, 12);
      try {
        localStorage.setItem(STORAGE_RECENT_IMAGES, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Projects State with persistent storage
  const [projects, setProjects] = useState<PosterProject[]>(() => {
    try {
      const raw = localStorage.getItem('gdgoc_nfsu_poster_projects');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'proj_ctf_1',
        name: 'CyberStrike 2026 CTF Flagship',
        content: CYBER_TEMPLATES.ctf,
        lastEdited: Date.now() - 3600000 * 2,
        tags: ['CTF', 'Gandhinagar']
      },
      {
        id: 'proj_workshop_2',
        name: 'Kernel to Cloud Low-Level Lab',
        content: CYBER_TEMPLATES.workshop,
        lastEdited: Date.now() - 3600000 * 24,
        tags: ['Systems', 'Workshop']
      },
      {
        id: 'proj_redteam_3',
        name: 'Red Team Ops Zero-Day Sprint',
        content: CYBER_TEMPLATES.ethical_hacking,
        lastEdited: Date.now() - 3600000 * 48,
        tags: ['Offensive', 'Exploitation']
      }
    ];
  });

  const saveProjectsToStorage = (updatedProjects: PosterProject[]) => {
    setProjects(updatedProjects);
    try {
      localStorage.setItem('gdgoc_nfsu_poster_projects', JSON.stringify(updatedProjects));
    } catch (e) {
      console.error(e);
    }
  };

  const currentCampus = campuses.find((c) => c.id === content.campusId) || campuses[0];

  const handleSaveCurrentProject = (name: string) => {
    const newProj: PosterProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name,
      content: { ...content },
      lastEdited: Date.now(),
      tags: [content.category, currentCampus.city]
    };
    saveProjectsToStorage([newProj, ...projects]);
  };

  const handleDuplicateProject = (project: PosterProject) => {
    const clone: PosterProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: `${project.name} (Copy)`,
      content: { ...project.content },
      lastEdited: Date.now(),
      tags: [...(project.tags || []), 'Copy']
    };
    saveProjectsToStorage([clone, ...projects]);
  };

  const handleRenameProject = (id: string, newName: string) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, name: newName, lastEdited: Date.now() } : p));
    saveProjectsToStorage(updated);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    saveProjectsToStorage(updated);
  };

  const handleImportProjects = (imported: PosterProject[]) => {
    const merged = [...imported, ...projects];
    const unique = Array.from(new Map(merged.map((p) => [p.id, p])).values());
    saveProjectsToStorage(unique);
  };

  // Export history log
  const [exportHistory, setExportHistory] = useState<ExportHistoryItem[]>(() => {
    try {
      const raw = localStorage.getItem('gdgoc_nfsu_export_history');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const handleClearExportHistory = () => {
    setExportHistory([]);
    try {
      localStorage.removeItem('gdgoc_nfsu_export_history');
    } catch (e) {
      console.error(e);
    }
  };

  const posterRef = useRef<HTMLDivElement>(null);

  // Update content with undo/redo history recording
  const handleContentChange = (newContent: PosterContent) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newContent);
    // Cap history at 60 states so memory stays lean
    const trimmed = updatedHistory.length > 60 ? updatedHistory.slice(updatedHistory.length - 60) : updatedHistory;
    setHistory(trimmed);
    setHistoryIndex(trimmed.length - 1);
    setContent(newContent);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setContent(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setContent(next);
    }
  };

  // Record an export event in local history
  const handleRecordExport = (title: string, campusName: string, expFormat: PosterFormat) => {
    const item: ExportHistoryItem = {
      id: `export_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title,
      campusName,
      category: content.category,
      style: content.style,
      format: expFormat,
      timestamp: Date.now()
    };
    const updated = [item, ...exportHistory];
    setExportHistory(updated);
    try {
      localStorage.setItem('gdgoc_nfsu_export_history', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Select or duplicate a template from Templates view
  const handleSelectTemplate = (template: PosterContent) => {
    handleContentChange({
      ...template,
      campusId: content.campusId
    });
    setActiveStudioTab('editor');
    setActiveView('studio');
  };

  const handleDuplicateTemplate = (template: PosterContent, customName: string) => {
    const newProj: PosterProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: customName,
      content: { ...template, campusId: content.campusId },
      lastEdited: Date.now(),
      tags: [template.category, currentCampus.city, 'Template Clone']
    };
    saveProjectsToStorage([newProj, ...projects]);
    handleContentChange({ ...template, campusId: content.campusId });
    setActiveView('studio');
  };

  // Load a saved design from Projects view
  const handleLoadSavedDesign = (design: PosterContent) => {
    handleContentChange(design);
    setActiveView('studio');
  };

  // Switch to studio with a campus-specific focus
  const handleEditCampusPoster = (campus: CampusInfo) => {
    handleContentChange({
      ...content,
      campusId: campus.id,
      venue: content.venue.includes('NFSU') ? campus.defaultVenue : content.venue
    });
    setActiveView('studio');
  };

  // Non-destructive 32-theme application (preserves user copy, hero photo, and background unless explicitly changed)
  const handleApplyTheme = (theme: PosterThemeDefinition) => {
    handleContentChange(applyThemeNonDestructive(content, theme));
  };

  // Strict 3-role decoupled image assignment handlers
  const handleSelectAsset = (asset: ImageAsset, target: 'hero' | 'background' | 'decoration') => {
    pushRecentImage(asset.url, asset.title);
    handleContentChange(setImageRole(content, asset.url, target, { title: asset.title, category: asset.category }));
    if (target === 'decoration') {
      setActiveStudioTab('layers');
    } else if (target === 'hero') {
      setActiveStudioTab('hero');
    }
    setActiveView(target === 'background' ? 'backgrounds' : 'studio');
  };

  const handleCustomLibraryUpload = (
    url: string,
    target: 'hero' | 'background' | 'decoration',
    title?: string
  ) => {
    pushRecentImage(url, title || 'Uploaded Visual Asset');
    handleContentChange(setImageRole(content, url, target, { title: title || 'Uploaded Visual' }));
    if (target === 'decoration') {
      setActiveStudioTab('layers');
    } else if (target === 'hero') {
      setActiveStudioTab('hero');
    }
    setActiveView(target === 'background' ? 'backgrounds' : 'studio');
  };

  const handleApplyRecentImageRole = (
    url: string,
    role: 'hero' | 'background' | 'decoration',
    title?: string
  ) => {
    pushRecentImage(url, title);
    handleContentChange(setImageRole(content, url, role, { title }));
    if (role === 'background') {
      setActiveView('backgrounds');
    } else {
      setActiveStudioTab(role === 'hero' ? 'hero' : 'layers');
      setActiveView('studio');
    }
  };

  const handleCreateNewPoster = () => {
    handleContentChange({
      ...DEFAULT_POSTER,
      campusId: content.campusId,
      hindiFontFamily: studioSettings.preferredHindiFont
    });
    setActiveStudioTab('editor');
    setActiveView('studio');
  };

  const handleResetAllStorage = () => {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('gdgoc_') || k.startsWith('gdg_'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    setContent(DEFAULT_POSTER);
    setHistory([DEFAULT_POSTER]);
    setHistoryIndex(0);
    setBrandKit(DEFAULT_BRAND_KIT);
    setStudioSettings(DEFAULT_STUDIO_SETTINGS);
    setRecentImages([]);
    setExportHistory([]);
  };

  const handleNavigate = (view: StudioView) => {
    if (view === 'interactive') {
      setActiveView('studio');
      setActiveStudioTab('layers');
      return;
    }
    if (view === 'themes') {
      setActiveView('studio');
      setActiveStudioTab('themes');
      return;
    }
    setActiveView(view);
  };

  const preflightIssuesCount = runPreflightChecks(content, currentCampus).filter(
    (issue) => issue.level !== 'info'
  ).length;

  const resolvedHero = resolveHeroImageConfig(content);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#04070E] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* ========================================================= */}
      {/* TOP HEADER: Universal Branding, Campuses, Quick Export */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-[#070B14]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => handleNavigate('dashboard')}
          className="flex items-center gap-2 sm:gap-3 min-w-0 text-left"
        >
          <GDGBrackets className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="font-display font-black text-xs sm:text-sm tracking-tight text-white uppercase truncate">
              GDG on Campus NFSU
            </span>
            <span className="text-xs text-sky-400 font-mono hidden sm:inline shrink-0">
              / CYBERSECURITY POSTER STUDIO
            </span>
          </div>
        </button>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsCampusManagerOpen(true)}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Campuses:</span>
            <span className="text-white font-bold">
              {campuses.filter((c) => c.isVerified).length} Verified
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsCompareOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Before vs After</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('preflight')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              preflightIssuesCount > 0
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audit</span>
            {preflightIssuesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-amber-500 text-black font-bold text-[9px]">
                {preflightIssuesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('export')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-md shadow-sky-950/40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              Export<span className="hidden sm:inline"> Studio</span>
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE HORIZONTAL NAVIGATION (All 11 Studio Routes) */}
      <nav
        aria-label="Mobile Studio Navigation"
        className="md:hidden flex items-center bg-[#070B14] border-b border-slate-800 px-2 py-2 text-xs font-mono overflow-x-auto gap-1.5"
      >
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'studio', label: 'Create' },
          { id: 'templates', label: 'Templates' },
          { id: 'images', label: 'Images' },
          { id: 'backgrounds', label: 'Backgrounds' },
          { id: 'assets', label: 'Brand Kit' },
          { id: 'campaigns', label: 'Campuses' },
          { id: 'projects', label: 'Projects' },
          { id: 'preflight', label: 'Audit' },
          { id: 'export', label: 'Export' },
          { id: 'settings', label: 'Settings' }
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavigate(item.id as StudioView)}
            className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 ${
              activeView === item.id
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                : 'text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* ========================================================= */}
      {/* MAIN WORKSPACE BODY: Left Sidebar + Dynamic Content Canvas */}
      {/* ========================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Desktop Sidebar Navigation (11 routes) */}
        <SidebarNav
          activeView={activeView}
          onSelectView={handleNavigate}
          savedCount={projects.length}
          verifiedCampusesCount={campuses.filter((c) => c.isVerified).length}
          onOpenCampusDirectory={() => setIsCampusManagerOpen(true)}
          preflightIssueCount={preflightIssuesCount}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Center Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col min-w-0">
          {/* Institutional Context Banner */}
          <div className="border-b border-slate-800/80 bg-gradient-to-b from-[#080D1A] to-[#04070E] py-4 sm:py-5 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-400 flex-wrap">
                  <span className="text-white font-bold">{currentCampus.name}</span>
                  <span>/</span>
                  <span className="text-sky-400 truncate max-w-xs">
                    {currentCampus.confirmedProgrammes?.[0] || currentCampus.programmeDetails || 'Cyber Security'}
                  </span>
                  {currentCampus.isVerified && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      ✓ Verified Cyber Campus
                    </span>
                  )}
                </div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
                  GDG on Campus NFSU — Cyber Studio
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <NFSUUniversityMark
                  campusName={currentCampus.city}
                  customLogoUrl={content.customLogoUrl}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* DYNAMIC VIEW ROUTING */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            {/* 1. DASHBOARD OVERVIEW */}
            {activeView === 'dashboard' && (
              <DashboardView
                content={content}
                format={format}
                currentCampus={currentCampus}
                campuses={campuses}
                projects={projects}
                recentImages={recentImages}
                preflightIssueCount={preflightIssuesCount}
                onNavigate={handleNavigate}
                onCreateNewPoster={handleCreateNewPoster}
                onOpenProject={handleLoadSavedDesign}
                onApplyRecentImageRole={handleApplyRecentImageRole}
                onOpenCampusManager={() => setIsCampusManagerOpen(true)}
              />
            )}

            {/* 2. CREATE POSTER WORKBENCH (7 Integrated Sub-Tabs + Live Preview/Interactive Canvas) */}
            {activeView === 'studio' && (
              <div className="space-y-6">
                {/* Studio Sub-Navigation Bar */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#090D15] p-1.5 rounded-xl border border-slate-800 text-[11px] font-mono">
                  {[
                    { id: 'editor', label: 'Design & Copy', icon: Sliders },
                    { id: 'layers', label: 'Interactive Layers', icon: Layers },
                    { id: 'typography', label: 'Typography Studio', icon: Type },
                    { id: 'hero', label: 'Hero Image', icon: ImageIcon },
                    { id: 'elements', label: 'Elements (24 SVGs)', icon: Shapes },
                    { id: 'themes', label: '32 Themes', icon: Palette },
                    { id: 'ai', label: 'AI Copilot', icon: Sparkles }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = activeStudioTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveStudioTab(tab.id as CreatePosterSubTab)}
                        className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                          active
                            ? 'bg-sky-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* If Interactive Layers sub-tab is active, render full InteractiveCanvasEditor */}
                {activeStudioTab === 'layers' ? (
                  <InteractiveCanvasEditor
                    content={content}
                    onChange={handleContentChange}
                    format={format}
                    campuses={campuses}
                    canUndo={historyIndex > 0}
                    canRedo={historyIndex < history.length - 1}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    onOpenBackgroundStudio={() => handleNavigate('backgrounds')}
                  />
                ) : activeStudioTab === 'themes' ? (
                  <ThemeStudioView
                    currentThemeId={content.themeId}
                    onApplyTheme={handleApplyTheme}
                    onOpenStudio={() => setActiveStudioTab('editor')}
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Live Poster Canvas & Viewport / Format Toolbar */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center gap-4">
                      {/* Viewport & Format Selector Bar */}
                      <div className="w-full flex flex-col gap-2.5 bg-[#090D15] p-3 rounded-xl border border-slate-800 text-xs font-mono shadow-md">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 overflow-x-auto">
                            <span className="text-[10px] text-slate-400 uppercase font-medium">Viewport:</span>
                            {(['studio', 'gallery', 'street', 'instagram'] as const).map((mode) => (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => setMockupMode(mode)}
                                className={`px-2 py-1 rounded transition-colors ${
                                  mockupMode === mode
                                    ? 'bg-sky-600 text-white font-bold'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                {mode === 'studio'
                                  ? 'Raw Poster'
                                  : mode === 'gallery'
                                  ? 'Gallery Wall'
                                  : mode === 'street'
                                  ? 'Street Lightbox'
                                  : 'Instagram Feed'}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-[10px] text-slate-400 uppercase font-medium mr-1">Format:</span>
                            {(['4:5', '1:1', '9:16', 'whatsapp', 'a4', 'custom'] as PosterFormat[]).map((fmt) => (
                              <button
                                key={fmt}
                                type="button"
                                onClick={() => setFormat(fmt)}
                                className={`px-2 py-1 rounded text-[11px] font-bold uppercase transition-colors ${
                                  format === fmt
                                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                {fmt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {format === 'custom' && (
                          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80 text-[11px]">
                            <span className="text-sky-300 font-bold uppercase">Custom Dimensions (px):</span>
                            <label className="flex items-center gap-1.5">
                              <span className="text-slate-400">W:</span>
                              <input
                                type="number"
                                min={400}
                                max={4000}
                                value={content.customWidthPx || 1200}
                                onChange={(e) =>
                                  handleContentChange({
                                    ...content,
                                    customWidthPx: Number(e.target.value) || 1200
                                  })
                                }
                                className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                              />
                            </label>
                            <label className="flex items-center gap-1.5">
                              <span className="text-slate-400">H:</span>
                              <input
                                type="number"
                                min={400}
                                max={4000}
                                value={content.customHeightPx || 1500}
                                onChange={(e) =>
                                  handleContentChange({
                                    ...content,
                                    customHeightPx: Number(e.target.value) || 1500
                                  })
                                }
                                className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Poster Canvas Render */}
                      <div className="w-full flex justify-center">
                        {mockupMode === 'studio' ? (
                          <PosterCanvas
                            ref={posterRef}
                            content={content}
                            format={format}
                            currentCampus={currentCampus}
                            campuses={campuses}
                            showTransparentCheckerboard={true}
                          />
                        ) : (
                          <MockupView mode={mockupMode}>
                            <PosterCanvas
                              ref={posterRef}
                              content={content}
                              format={format}
                              currentCampus={currentCampus}
                              campuses={campuses}
                              showTransparentCheckerboard={true}
                            />
                          </MockupView>
                        )}
                      </div>

                      {/* Quick Mode Shortcuts */}
                      <div className="w-full p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="text-slate-400 text-[11px]">
                          Independent layers active — adjust canvas elements or background separately.
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleNavigate('backgrounds')}
                            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-[11px]"
                          >
                            Background Studio
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveStudioTab('layers')}
                            className="px-3 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Layers className="w-3 h-3" />
                            <span>Interactive Canvas</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Active Workbench Panel + Production Export Engine */}
                    <div className="lg:col-span-6 xl:col-span-5 space-y-6">
                      {activeStudioTab === 'editor' && (
                        <PosterCustomizer
                          content={content}
                          onChange={handleContentChange}
                          campuses={campuses}
                          onOpenCampusManager={() => setIsCampusManagerOpen(true)}
                          canUndo={historyIndex > 0}
                          canRedo={historyIndex < history.length - 1}
                          onUndo={handleUndo}
                          onRedo={handleRedo}
                          onOpenImageLibrary={() => handleNavigate('images')}
                          onOpenThemesStudio={() => setActiveStudioTab('themes')}
                          onOpenBackgroundStudio={() => handleNavigate('backgrounds')}
                          onOpenAdjustModal={() => setIsAdjustModalOpen(true)}
                        />
                      )}

                      {activeStudioTab === 'typography' && (
                        <TypographyStudio
                          content={content}
                          onChange={handleContentChange}
                        />
                      )}

                      {activeStudioTab === 'hero' && (
                        <HeroImageStudio
                          content={content}
                          onChange={handleContentChange}
                          onOpenImageLibrary={() => handleNavigate('images')}
                        />
                      )}

                      {activeStudioTab === 'elements' && (
                        <ElementsStudio
                          content={content}
                          onChange={handleContentChange}
                          onOpenInteractiveCanvas={() => setActiveStudioTab('layers')}
                        />
                      )}

                      {activeStudioTab === 'ai' && (
                        <AICampaignGenerator
                          onApplyCampaign={(data) => {
                            handleContentChange({
                              ...content,
                              ...data.content,
                              category: data.category || content.category,
                              style: data.style || content.style,
                              accentColor: data.accentColor || content.accentColor,
                              imageKey: data.imageKey || content.imageKey
                            });
                          }}
                          currentCampusName={currentCampus.name}
                        />
                      )}

                      <div id="production-export-suite">
                        <ExportPanel
                          content={content}
                          posterRef={posterRef}
                          campusName={currentCampus.name}
                          format={format}
                          onChangeFormat={setFormat}
                          onUpdateCustomDimensions={(widthPx, heightPx) =>
                            handleContentChange({
                              ...content,
                              customWidthPx: widthPx,
                              customHeightPx: heightPx
                            })
                          }
                          defaultJpegFallbackColor={studioSettings.defaultJpegFallbackColor}
                          onRecordExport={handleRecordExport}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. TEMPLATE LIBRARY (12+ Categorized Layouts + Favorites & Duplicate) */}
            {activeView === 'templates' && (
              <TemplatesGallery
                onSelectTemplate={handleSelectTemplate}
                onDuplicateTemplate={handleDuplicateTemplate}
                campuses={campuses}
              />
            )}

            {/* 4. IMAGE LIBRARY (100+ Verified Images + Live Search + 3-Role Actions + Recently Used) */}
            {activeView === 'images' && (
              <ImageLibraryView
                onSelectImage={handleSelectAsset}
                onCustomUpload={handleCustomLibraryUpload}
                currentHeroUrl={resolvedHero.src}
                recentImages={recentImages}
                onOpenAdjustModal={() => setIsAdjustModalOpen(true)}
              />
            )}

            {/* 5. BACKGROUND STUDIO (7 Independent Modes + 32 Background Presets + Live Canvas) */}
            {activeView === 'backgrounds' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 bg-[#070B16] border border-slate-800 rounded-xl p-5 shadow-xl">
                  <BackgroundStudio
                    content={content}
                    onUpdateContent={(updates) => handleContentChange({ ...content, ...updates })}
                    onOpenImageLibrary={() => handleNavigate('images')}
                  />
                </div>
                <div className="lg:col-span-5 flex flex-col items-center gap-3">
                  <div className="w-full flex items-center justify-between px-1 text-xs font-mono text-slate-400">
                    <span>LIVE BACKGROUND PREVIEW ({format})</span>
                    <button
                      type="button"
                      onClick={() => handleNavigate('studio')}
                      className="text-sky-400 hover:text-sky-300 font-bold"
                    >
                      Back to Create Poster →
                    </button>
                  </div>
                  <PosterCanvas
                    ref={posterRef}
                    content={content}
                    format={format}
                    currentCampus={currentCampus}
                    campuses={campuses}
                    showTransparentCheckerboard={true}
                  />
                </div>
              </div>
            )}

            {/* 6. BRAND KIT & LOGO SLOTS */}
            {activeView === 'assets' && (
              <AssetLibraryView
                content={content}
                onChange={handleContentChange}
                campuses={campuses}
                brandKit={brandKit}
                onUpdateBrandKit={handleUpdateBrandKit}
              />
            )}

            {/* 7. CAMPUS CAMPAIGNS */}
            {activeView === 'campaigns' && (
              <MultiCampusCampaignView
                baseContent={content}
                campuses={campuses}
                format={format}
                onEditCampusPoster={handleEditCampusPoster}
                onRecordExport={handleRecordExport}
              />
            )}

            {/* 8. PROJECT GALLERY & EXPORT ARCHIVES */}
            {activeView === 'projects' && (
              <ProjectGalleryView
                currentPoster={content}
                projects={projects}
                onSaveCurrentProject={handleSaveCurrentProject}
                onOpenProject={handleLoadSavedDesign}
                onDuplicateProject={handleDuplicateProject}
                onRenameProject={handleRenameProject}
                onDeleteProject={handleDeleteProject}
                onImportProjects={handleImportProjects}
                exportHistory={exportHistory}
                onClearExportHistory={handleClearExportHistory}
                campuses={campuses}
              />
            )}

            {/* 9. QUALITY ASSISTANT (PRE-FLIGHT AUDIT) */}
            {activeView === 'preflight' && (
              <PreflightAuditPanel
                content={content}
                onChange={handleContentChange}
                campus={currentCampus}
              />
            )}

            {/* 10. EXPORT STUDIO */}
            {activeView === 'export' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 flex flex-col items-center gap-4">
                  <div className="w-full p-4 rounded-xl bg-[#090D15] border border-slate-800 text-left">
                    <h3 className="text-base font-bold text-white font-mono uppercase">
                      Production Export Studio
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Preview matches your exported PNG, Transparent PNG (alpha channel), JPEG, 300 DPI print, or SVG with embedded fonts.
                    </p>
                  </div>
                  <div className="w-full max-w-md flex justify-center">
                    <PosterCanvas
                      ref={posterRef}
                      content={content}
                      format={format}
                      currentCampus={currentCampus}
                      campuses={campuses}
                      showTransparentCheckerboard={true}
                    />
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <ExportPanel
                    content={content}
                    posterRef={posterRef}
                    campusName={currentCampus.name}
                    format={format}
                    onChangeFormat={setFormat}
                    onUpdateCustomDimensions={(widthPx, heightPx) =>
                      handleContentChange({
                        ...content,
                        customWidthPx: widthPx,
                        customHeightPx: heightPx
                      })
                    }
                    defaultJpegFallbackColor={studioSettings.defaultJpegFallbackColor}
                    onRecordExport={handleRecordExport}
                  />
                </div>
              </div>
            )}

            {/* 11. STUDIO SETTINGS */}
            {activeView === 'settings' && (
              <SettingsView
                settings={studioSettings}
                onUpdateSettings={handleUpdateStudioSettings}
                onResetAllStorage={handleResetAllStorage}
                projectsCount={projects.length}
              />
            )}
          </main>

          {/* FOOTER */}
          <footer className="border-t border-slate-800/80 bg-[#070B14] py-4 px-6 text-center text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GDGBrackets className="w-4 h-4 shrink-0" />
              <span>GDG on Campus NFSU — Cybersecurity Poster Creation Studio</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span>FORMATS: 4:5 · 1:1 · 9:16 · WHATSAPP · A4 · CUSTOM</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => setIsCampusManagerOpen(true)}
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
              >
                Verified Campuses Directory
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Campus Manager Directory Modal */}
      {isCampusManagerOpen && (
        <CampusManagerModal
          isOpen={isCampusManagerOpen}
          campuses={campuses}
          onUpdateCampuses={(updated) => {
            setCampuses(updated);
            saveStoredCampuses(updated);
          }}
          onClose={() => setIsCampusManagerOpen(false)}
        />
      )}

      {/* Before vs After Comparison Modal */}
      {isCompareOpen && (
        <ComparisonModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
        />
      )}

      {/* Advanced Image Crop, Zoom & Filter Modal */}
      {isAdjustModalOpen && (
        <ImageAdjustModal
          isOpen={isAdjustModalOpen}
          onClose={() => setIsAdjustModalOpen(false)}
          content={content}
          onUpdateContent={(updates) => handleContentChange({ ...content, ...updates })}
          onOpenLibrary={() => {
            setIsAdjustModalOpen(false);
            handleNavigate('images');
          }}
        />
      )}
    </div>
  );
}
