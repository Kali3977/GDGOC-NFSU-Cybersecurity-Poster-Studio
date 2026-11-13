import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Heart,
  ExternalLink,
  Upload,
  Check,
  Eye,
  Layers,
  Image as ImageIcon,
  Shield,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { IMAGE_LIBRARY, IMAGE_CATEGORIES, ImageAsset } from '../data/imageLibrary';

import { RecentImageEntry } from './DashboardView';

interface ProviderStatus {
  id: string;
  label: string;
  configured: boolean;
  requiresKey: boolean;
  status: string;
}

interface ImageLibraryViewProps {
  onSelectImage: (asset: ImageAsset, target: 'hero' | 'background' | 'decoration') => void;
  onCustomUpload: (url: string, target: 'hero' | 'background' | 'decoration', title?: string) => void;
  currentHeroUrl?: string;
  recentImages?: RecentImageEntry[];
  onOpenAdjustModal?: () => void;
}

export function ImageLibraryView({
  onSelectImage,
  onCustomUpload,
  currentHeroUrl,
  recentImages = [],
  onOpenAdjustModal
}: ImageLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAspect, setSelectedAspect] = useState<'all' | 'landscape' | 'portrait' | 'square'>('all');
  const [selectedTone, setSelectedTone] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('gdg_poster_fav_images') || '[]');
    } catch {
      return [];
    }
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 16;

  // Preview Modal
  const [previewAsset, setPreviewAsset] = useState<ImageAsset | null>(null);

  // Live online search state
  const [showLivePanel, setShowLivePanel] = useState(false);
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [liveQuery, setLiveQuery] = useState('');
  const [liveSourceFilter, setLiveSourceFilter] = useState<'all' | 'Wikimedia' | 'Unsplash' | 'Pexels' | 'Pixabay'>('all');
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [liveResults, setLiveResults] = useState<ImageAsset[]>([]);
  const [liveNotes, setLiveNotes] = useState<string[]>([]);
  const [hasSearchedLive, setHasSearchedLive] = useState(false);

  // Load provider capability metadata on mount
  useEffect(() => {
    let active = true;
    fetch('/api/images/sources')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.providers)) {
          setProviders(data.providers);
        }
      })
      .catch(() => {
        // Ignore silent status error when backend route unavailable
      });
    return () => {
      active = false;
    };
  }, []);

  const handleLiveSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = (liveQuery || searchQuery).trim();
    if (!q) {
      setLiveError('Enter a search term (e.g., cybersecurity, microchip, server room, forensics) to query live sources.');
      return;
    }
    setLiveLoading(true);
    setLiveError(null);
    setHasSearchedLive(true);
    try {
      const res = await fetch(
        `/api/images/search?q=${encodeURIComponent(q)}&source=${encodeURIComponent(liveSourceFilter)}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Live image search failed.');
      }
      setLiveResults(Array.isArray(data.results) ? data.results : []);
      setLiveNotes(Array.isArray(data.notes) ? data.notes : []);
    } catch (err: any) {
      setLiveError(err?.message || 'Unable to query live image sources.');
      setLiveResults([]);
    } finally {
      setLiveLoading(false);
    }
  };

  // Toggle favorite
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('gdg_poster_fav_images', JSON.stringify(next));
      return next;
    });
  };

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return IMAGE_LIBRARY.filter((asset) => {
      if (favoritesOnly && !favoriteIds.includes(asset.id)) return false;
      if (selectedCategory !== 'all' && asset.category !== selectedCategory) return false;
      if (selectedAspect !== 'all' && asset.aspect !== selectedAspect) return false;
      if (selectedTone !== 'all' && asset.colorTone !== selectedTone) return false;
      if (selectedSource !== 'all' && asset.source !== selectedSource) return false;

      if (selectedLicense !== 'all') {
        const lic = asset.license.toLowerCase();
        if (selectedLicense === 'commercial' && !lic.includes('unsplash') && !lic.includes('free') && !lic.includes('cc0') && !lic.includes('public domain')) {
          return false;
        }
        if (selectedLicense === 'cc' && !lic.includes('cc')) {
          return false;
        }
        if (selectedLicense === 'institutional' && !lic.includes('institutional') && !lic.includes('nfsu')) {
          return false;
        }
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = asset.title.toLowerCase().includes(query);
        const matchesCategory = asset.categoryLabel.toLowerCase().includes(query);
        const matchesAuthor = asset.author.toLowerCase().includes(query);
        const matchesSource = asset.source.toLowerCase().includes(query);
        const matchesTags = asset.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesCategory || matchesAuthor || matchesSource || matchesTags;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedAspect, selectedTone, selectedSource, selectedLicense, favoritesOnly, favoriteIds]);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedAspect, selectedTone, selectedSource, selectedLicense, favoritesOnly]);

  // Paginated Assets
  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE) || 1;
  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAssets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAssets, currentPage]);

  const [uploadTarget, setUploadTarget] = useState<'hero' | 'background' | 'decoration'>('hero');

  // Upload handler
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onCustomUpload(base64, uploadTarget, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-in fade-in text-left">
      {/* Top Header Card */}
      <div className="rounded-xl border border-sky-500/30 bg-[#070B16] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Shield className="w-4 h-4" /> {IMAGE_LIBRARY.length} Verified Assets Archive
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Cybersecurity &amp; High-Tech Visual Library
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {IMAGE_LIBRARY.length} verified unique assets across 10 curated categories (Unsplash, Wikimedia Commons, and NFSU Institutional Archive), plus live Wikimedia Commons online search.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowLivePanel((v) => !v)}
              className={`px-3.5 py-2 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                showLivePanel
                  ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200 font-bold'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" /> Live Online Search
            </button>

            <div className="flex items-center gap-1 rounded-lg border border-white/15 bg-[#040711] p-1">
              <select
                aria-label="Upload target role"
                value={uploadTarget}
                onChange={(e) => setUploadTarget(e.target.value as any)}
                className="bg-transparent text-[11px] font-mono text-slate-200 px-2 py-1 focus:outline-none"
              >
                <option value="hero" className="bg-[#070B16]">Upload as: Hero Image</option>
                <option value="background" className="bg-[#070B16]">Upload as: Background</option>
                <option value="decoration" className="bg-[#070B16]">Upload as: Decoration</option>
              </select>
              <label className="cursor-pointer px-3 py-1.5 rounded bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs font-mono transition-colors flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={handleUploadFile} />
              </label>
            </div>

            {onOpenAdjustModal && (
              <button
                type="button"
                onClick={onOpenAdjustModal}
                className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Crop &amp; Adjust Active
              </button>
            )}
          </div>
        </div>

        {/* Live Online Search Drawer */}
        {showLivePanel && (
          <div className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-[#040711] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Live External Image Search
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Queries Wikimedia Commons in real time (no API key required). Unsplash, Pexels &amp; Pixabay live endpoints activate automatically when server keys exist.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {providers.map((p) => (
                  <span
                    key={p.id}
                    title={p.status}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      p.configured
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-700'
                    }`}
                  >
                    {p.label}: {p.configured ? 'Live' : 'Bundled / Key Optional'}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleLiveSearch} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={liveQuery}
                onChange={(e) => setLiveQuery(e.target.value)}
                placeholder="Search Wikimedia Commons / configured APIs (e.g. circuit board, fiber optic, mainframe, cryptography)..."
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#070B16] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
              <select
                aria-label="Live search provider"
                value={liveSourceFilter}
                onChange={(e) => setLiveSourceFilter(e.target.value as any)}
                className="px-3 py-2 rounded-lg bg-[#070B16] border border-white/15 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-400"
              >
                <option value="all">All Active Sources</option>
                <option value="Wikimedia">Wikimedia Commons (Live)</option>
                <option value="Unsplash">Unsplash API</option>
                <option value="Pexels">Pexels API</option>
                <option value="Pixabay">Pixabay API</option>
              </select>
              <button
                type="submit"
                disabled={liveLoading}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-xs font-mono flex items-center justify-center gap-1.5 shrink-0"
              >
                {liveLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>{liveLoading ? 'Searching...' : 'Search Online'}</span>
              </button>
            </form>

            {liveError && (
              <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{liveError}</span>
              </div>
            )}

            {liveNotes.length > 0 && (
              <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
                {liveNotes.map((note, idx) => (
                  <p key={idx}>• {note}</p>
                ))}
              </div>
            )}

            {hasSearchedLive && !liveLoading && liveResults.length === 0 && !liveError && (
              <p className="text-xs font-mono text-slate-400 py-2">
                No external images returned for &ldquo;{liveQuery || searchQuery}&rdquo;. Try a broader technical keyword.
              </p>
            )}

            {liveResults.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {liveResults.map((asset) => (
                  <div
                    key={asset.id}
                    className="rounded-lg border border-white/10 bg-[#0A1022] overflow-hidden flex flex-col justify-between"
                  >
                    <div
                      className={`relative aspect-[16/10] overflow-hidden cursor-pointer ${
                        asset.url.toLowerCase().endsWith('.png') ? 'bg-slate-200' : 'bg-slate-900'
                      }`}
                      onClick={() => setPreviewAsset(asset)}
                    >
                      <img
                        src={asset.thumbUrl || asset.url}
                        alt={asset.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 border border-white/15 text-[9px] font-mono text-emerald-300">
                        {asset.source}
                      </span>
                    </div>
                    <div className="p-2 space-y-1.5">
                      <p className="text-[11px] font-bold text-white line-clamp-1" title={asset.title}>
                        {asset.title}
                      </p>
                      <p className="text-[9px] font-mono text-slate-400 truncate">
                        {asset.author} · {asset.license}
                      </p>
                      <div className="grid grid-cols-3 gap-1 pt-1">
                        <button
                          type="button"
                          onClick={() => onSelectImage(asset, 'hero')}
                          className="py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 text-[9px] font-mono"
                        >
                          Hero
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectImage(asset, 'background')}
                          className="py-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 border border-white/15 text-[9px] font-mono"
                        >
                          BG
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectImage(asset, 'decoration')}
                          className="py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 text-[9px] font-mono"
                        >
                          Decor
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search Bar & Primary Filters */}
        <div className="mt-4 flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${IMAGE_LIBRARY.length} curated assets (e.g., CTF, zero-day, microchip, terminal, neural, server)...`}
              className="w-full pl-10 pr-8 py-2 text-xs rounded-lg bg-[#040711] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Source Filter */}
            <select
              aria-label="Filter by image source"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="px-2.5 py-2 rounded-lg bg-[#040711] border border-white/15 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">Source: All</option>
              <option value="Unsplash">Unsplash</option>
              <option value="Wikimedia">Wikimedia Commons</option>
              <option value="NFSU Archive">NFSU Archive</option>
              <option value="Pexels">Pexels</option>
              <option value="Pixabay">Pixabay</option>
            </select>

            {/* License Filter */}
            <select
              aria-label="Filter by image license"
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="px-2.5 py-2 rounded-lg bg-[#040711] border border-white/15 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">License: All</option>
              <option value="commercial">Commercial / Free</option>
              <option value="cc">Creative Commons (CC)</option>
              <option value="institutional">Institutional Archive</option>
            </select>

            {/* Orientation Filter */}
            <select
              aria-label="Filter by orientation"
              value={selectedAspect}
              onChange={(e) => setSelectedAspect(e.target.value as any)}
              className="px-2.5 py-2 rounded-lg bg-[#040711] border border-white/15 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">Orientation: All</option>
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
              <option value="square">Square</option>
            </select>

            {/* Color Tone Filter */}
            <select
              aria-label="Filter by color tone"
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="px-2.5 py-2 rounded-lg bg-[#040711] border border-white/15 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">Tone: All</option>
              <option value="cyan">Electric Cyan</option>
              <option value="blue">Cobalt Blue</option>
              <option value="green">Matrix Green</option>
              <option value="amber">Warm Amber</option>
              <option value="purple">Quantum Purple</option>
              <option value="red">Red Alert</option>
              <option value="dark">Monochrome Noir</option>
            </select>

            {/* Favorites Toggle */}
            <button
              type="button"
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`px-3 py-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                favoritesOnly
                  ? 'border-rose-500 bg-rose-500/20 text-rose-300'
                  : 'border-white/15 bg-[#040711] text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-rose-400' : ''}`} />
              <span>Favs ({favoriteIds.length})</span>
            </button>
          </div>
        </div>

        {/* 10 Category Filter Buttons */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono shrink-0 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            All {IMAGE_LIBRARY.length} Assets
          </button>
          {IMAGE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-mono shrink-0 transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-black font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recently Used Images Strip */}
      {recentImages.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-[#070B16] p-4 space-y-2.5">
          <span className="text-xs font-mono font-bold text-sky-300 uppercase block">
            Recently Used Images ({recentImages.length})
          </span>
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {recentImages.slice(0, 8).map((rec) => (
              <div
                key={rec.url}
                className="w-44 shrink-0 rounded-lg border border-white/10 bg-[#040711] overflow-hidden"
              >
                <div className="h-20 bg-black/50">
                  <img src={rec.url} alt={rec.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-2 space-y-1.5">
                  <span className="text-[10px] font-bold text-white block truncate">{rec.title}</span>
                  <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
                    <button
                      type="button"
                      onClick={() => onCustomUpload(rec.url, 'hero', rec.title)}
                      className="py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-400/30"
                    >
                      Hero
                    </button>
                    <button
                      type="button"
                      onClick={() => onCustomUpload(rec.url, 'background', rec.title)}
                      className="py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                    >
                      BG
                    </button>
                    <button
                      type="button"
                      onClick={() => onCustomUpload(rec.url, 'decoration', rec.title)}
                      className="py-0.5 rounded bg-emerald-500/15 text-emerald-200 border border-emerald-400/30"
                    >
                      Decor
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredAssets.length}</strong> visual assets
            {selectedCategory !== 'all' && ` in ${IMAGE_CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
          </span>
          <span>
            Page <strong className="text-cyan-400">{currentPage}</strong> of {totalPages}
          </span>
        </div>

        {paginatedAssets.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-white/10 bg-[#070B16]">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-500 mb-2" />
            <p className="text-sm font-bold text-white">No images match your filter.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the filters or search live external sources above.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedAspect('all');
                setSelectedTone('all');
                setSelectedSource('all');
                setSelectedLicense('all');
                setFavoritesOnly(false);
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-mono"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {paginatedAssets.map((asset) => {
              const isFav = favoriteIds.includes(asset.id);
              const isCurrent = currentHeroUrl === asset.url;

              return (
                <div
                  key={asset.id}
                  className={`group relative rounded-xl border overflow-hidden bg-[#0A1022] transition-all hover:shadow-xl flex flex-col justify-between ${
                    isCurrent ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]' : 'border-white/10 hover:border-sky-500/40'
                  }`}
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[16/10] bg-black/60 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setPreviewAsset(asset)}
                      aria-label={`Preview ${asset.title}`}
                      className="w-full h-full block cursor-pointer"
                    >
                      <img
                        src={asset.thumbUrl}
                        alt={asset.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          if (asset.fallbackLocal && (e.target as HTMLImageElement).src !== asset.fallbackLocal) {
                            (e.target as HTMLImageElement).src = asset.fallbackLocal;
                          }
                        }}
                      />
                    </button>

                    {/* Gradient Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2 pointer-events-none">
                      <span className="text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Preview
                      </span>
                      <span className="text-[9px] font-mono text-slate-300 bg-black/60 px-1.5 py-0.5 rounded">
                        {asset.source}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(asset.id, e)}
                      aria-label={isFav ? `Remove ${asset.title} from favorites` : `Add ${asset.title} to favorites`}
                      className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                        isFav ? 'bg-rose-500 text-white' : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
                      }`}
                      title={isFav ? 'Remove favorite' : 'Add to favorites'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* Active Marker */}
                    {isCurrent && (
                      <div className="absolute top-2 left-2 bg-cyan-400 text-black px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                        <Check className="w-2.5 h-2.5" /> On Poster
                      </div>
                    )}
                  </div>

                  {/* Metadata & Actions */}
                  <div className="p-3 flex flex-col justify-between flex-1 space-y-2">
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors" title={asset.title}>
                        {asset.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                        <span className="truncate max-w-[120px]">{asset.author}</span>
                        <span className="uppercase text-[9px] px-1 py-0.2 rounded bg-white/5 border border-white/10">
                          {asset.aspect}
                        </span>
                      </div>
                    </div>

                    {/* Direct 3-Role Independent Insertion Buttons */}
                    <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => onSelectImage(asset, 'hero')}
                        className="py-1 px-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 text-[9.5px] font-mono transition-colors text-center"
                      >
                        Hero Image
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectImage(asset, 'background')}
                        className="py-1 px-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 border border-white/15 text-[9.5px] font-mono transition-colors text-center"
                      >
                        Background
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectImage(asset, 'decoration')}
                        className="py-1 px-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 text-[9.5px] font-mono transition-colors text-center"
                      >
                        Decoration
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-white/15 bg-[#070B16] text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                type="button"
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-mono transition-colors ${
                  currentPage === page
                    ? 'bg-cyan-500 text-black font-bold shadow'
                    : 'bg-[#070B16] border border-white/15 text-slate-300 hover:border-white/30'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-white/15 bg-[#070B16] text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Asset Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-xl border border-sky-500/40 bg-[#070B16] text-white shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3.5 bg-[#0A1022]">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Shield className="w-4 h-4" /> Asset Verification &amp; Attribution
              </div>
              <button
                type="button"
                aria-label="Close asset preview"
                onClick={() => setPreviewAsset(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/20 bg-black/60 shadow-inner">
                <img
                  src={previewAsset.url}
                  alt={previewAsset.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (previewAsset.fallbackLocal) {
                      (e.target as HTMLImageElement).src = previewAsset.fallbackLocal;
                    }
                  }}
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{previewAsset.title}</h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{previewAsset.categoryLabel}</p>
              </div>

              {/* Attribution and License Info */}
              <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Photographer / Creator:</span>
                  <a
                    href={previewAsset.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    {previewAsset.author} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Source Platform:</span>
                  <span className="text-white font-semibold">{previewAsset.source}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>License:</span>
                  <span className="text-emerald-400">{previewAsset.license}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectImage(previewAsset, 'hero');
                    setPreviewAsset(null);
                  }}
                  className="py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs font-mono transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <Check className="w-4 h-4" /> Use as Hero Image
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectImage(previewAsset, 'background');
                    setPreviewAsset(null);
                  }}
                  className="py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs font-mono border border-white/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-4 h-4" /> Use as Background
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectImage(previewAsset, 'decoration');
                    setPreviewAsset(null);
                  }}
                  className="py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-bold text-xs font-mono border border-emerald-400/40 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ImageIcon className="w-4 h-4" /> Add as Decoration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

